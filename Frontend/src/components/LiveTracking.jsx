import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { SocketDataContext } from "../context/SocketContext";

const rideRouteLayer = {
  id: "ride-route",
  type: "line",
  paint: {
    "line-color": "#06b6d4",
    "line-width": 4,
    "line-opacity": 0.9,
  },
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

const liveTrackingLayer = {
  id: "live-tracking-route",
  type: "line",
  paint: {
    "line-color": "#8b5cf6",
    "line-width": 3,
    "line-opacity": 0.6,
  },
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

const LiveTracking = ({ ride, role = "user" }) => {
  const { socket } = useContext(SocketDataContext);
  const [userLocation, setUserLocation] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [rideRouteGeoJSON, setRideRouteGeoJSON] = useState(null);
  const [liveTrackingRouteGeoJSON, setLiveTrackingRouteGeoJSON] = useState(null);
  const [error, setError] = useState(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      return "Geolocation is not available in this browser.";
    }
    return null;
  });
  const [viewState, setViewState] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 12,
  });

  const mapboxToken = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const userId = localStorage.getItem("userId");
  const captainId = ride?.captainId?._id || ride?.captainId;
  const passengerId = ride?.userId?._id || ride?.userId;
  const pickup = ride?.pickup;
  const destination = ride?.destination;

  const targetCaptainId = role === "user" ? captainId : undefined;
  const targetPassengerId = role === "captain" ? passengerId : undefined;

  const geocodeAddress = useCallback(async (address) => {
    if (!address || !mapboxToken) return null;
    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      if (data.features?.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
        return { lng, ltd: lat };
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
    return null;
  }, [mapboxToken]);

  const getRideRoute = useMemo(() => {
    if (!pickup || !destination || !mapboxToken) {
      return null;
    }

    return async () => {
      try {
        const pickupCoordResult = await geocodeAddress(pickup);
        const destCoordResult = await geocodeAddress(destination);

        if (!pickupCoordResult || !destCoordResult) {
          console.warn("Could not geocode pickup or destination addresses");
          return;
        }

        setPickupCoords(pickupCoordResult);
        setDestinationCoords(destCoordResult);

        const coordinates = `${pickupCoordResult.lng},${pickupCoordResult.ltd};${destCoordResult.lng},${destCoordResult.ltd}`;
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&overview=full&access_token=${mapboxToken}`;
        const response = await fetch(directionsUrl);
        const data = await response.json();

        if (!data.routes?.length) {
          console.warn("Mapbox Directions API returned no routes for ride.");
          return;
        }

        setRideRouteGeoJSON({
          type: "Feature",
          geometry: data.routes[0].geometry,
        });
      } catch (fetchError) {
        console.error("Failed to fetch ride route:", fetchError);
      }
    };
  }, [pickup, destination, mapboxToken, geocodeAddress]);

  useEffect(() => {
    if (!getRideRoute) {
      return;
    }

    getRideRoute();
  }, [getRideRoute]);

  const getLiveTrackingRoute = useMemo(() => {
    if (!userLocation || !captainLocation || !mapboxToken) {
      return null;
    }

    return async () => {
      const coordinates = `${userLocation.lng},${userLocation.ltd};${captainLocation.lng},${captainLocation.ltd}`;
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&overview=full&access_token=${mapboxToken}`;
      try {
        const response = await fetch(directionsUrl);
        const data = await response.json();
        if (!data.routes?.length) {
          return;
        }
        setLiveTrackingRouteGeoJSON({
          type: "Feature",
          geometry: data.routes[0].geometry,
        });
      } catch (fetchError) {
        console.error("Failed to fetch live tracking route:", fetchError);
      }
    };
  }, [userLocation, captainLocation, mapboxToken]);

  useEffect(() => {
    if (!getLiveTrackingRoute) {
      return;
    }

    getLiveTrackingRoute();
  }, [getLiveTrackingRoute]);

  const setLocationAndRecenter = (primaryLocation, secondaryLocation) => {
    setViewState((prev) => {
      if (primaryLocation && secondaryLocation) {
        return {
          ...prev,
          latitude: (primaryLocation.ltd + secondaryLocation.ltd) / 2,
          longitude: (primaryLocation.lng + secondaryLocation.lng) / 2,
          zoom: 12,
        };
      }

      if (primaryLocation) {
        return {
          ...prev,
          latitude: primaryLocation.ltd,
          longitude: primaryLocation.lng,
          zoom: 12,
        };
      }

      return prev;
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleCaptainLocation = (payload) => {
      if (!payload?.location) return;
      setCaptainLocation(payload.location);
      setLocationAndRecenter(userLocation, payload.location);
    };

    const handleUserLocation = (payload) => {
      if (!payload?.location) return;
      setUserLocation(payload.location);
      setLocationAndRecenter(payload.location, captainLocation);
    };

    if (role === "user") {
      socket.on("captain-location-update", handleCaptainLocation);
    } else if (role === "captain") {
      socket.on("user-location-update", handleUserLocation);
    }

    return () => {
      socket.off("captain-location-update", handleCaptainLocation);
      socket.off("user-location-update", handleUserLocation);
    };
  }, [socket, role, userLocation, captainLocation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const emitLocationUpdate = (location) => {
      if (!socket) return;

      if (role === "user" && targetCaptainId) {
        socket.emit("update-location-user", {
          userId,
          captainId: targetCaptainId,
          location,
        });
      }

      if (role === "captain" && targetPassengerId) {
        socket.emit("update-location-captain", {
          captainId: userId,
          passengerId: targetPassengerId,
          location,
        });
      }
    };

    const success = (position) => {
      const location = {
        ltd: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setUserLocation(location);
      setLocationAndRecenter(location, captainLocation);
      emitLocationUpdate(location);
    };

    const errorHandler = (geoError) => {
      console.error("Geolocation error:", geoError);
      setError(geoError.message || "Unable to retrieve location.");
    };

    const watcherId = navigator.geolocation.watchPosition(success, errorHandler, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000,
    });

    return () => {
      navigator.geolocation.clearWatch(watcherId);
    };
  }, [socket, role, userId, targetCaptainId, targetPassengerId, captainLocation]);

  return (
    <div className="h-full w-full">
      {!mapboxToken ? (
        <div className="h-full w-full flex items-center justify-center bg-slate-900 text-white">
          Mapbox token is not configured.
        </div>
      ) : (
        <Map
          initialViewState={viewState}
          viewState={viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={mapboxToken}
          className="h-full w-full"
          style={{ touchAction: "none" }}
        >
          <NavigationControl position="top-right" />
          <GeolocateControl position="top-right" trackUserLocation />

          {userLocation && (
            <Marker longitude={userLocation.lng} latitude={userLocation.ltd} anchor="bottom">
              <div className="flex flex-col items-center text-xs text-white">
                <span className="mb-1 rounded-full bg-green-500 p-1 shadow-lg" />
                <div className="bg-black/70 px-2 py-1 rounded-md">You</div>
              </div>
            </Marker>
          )}

          {captainLocation && (
            <Marker longitude={captainLocation.lng} latitude={captainLocation.ltd} anchor="bottom">
              <div className="flex flex-col items-center text-xs text-white">
                <span className="mb-1 rounded-full bg-blue-500 p-1 shadow-lg" />
                <div className="bg-black/70 px-2 py-1 rounded-md">Captain</div>
              </div>
            </Marker>
          )}

          {pickupCoords && (
            <Marker longitude={pickupCoords.lng} latitude={pickupCoords.ltd} anchor="bottom">
              <div className="flex flex-col items-center text-xs text-white">
                <span className="mb-1 rounded-full bg-yellow-400 p-1.5 shadow-lg" />
                <div className="bg-black/70 px-2 py-1 rounded-md">Pickup</div>
              </div>
            </Marker>
          )}

          {destinationCoords && (
            <Marker longitude={destinationCoords.lng} latitude={destinationCoords.ltd} anchor="bottom">
              <div className="flex flex-col items-center text-xs text-white">
                <span className="mb-1 rounded-full bg-red-500 p-1.5 shadow-lg" />
                <div className="bg-black/70 px-2 py-1 rounded-md">Destination</div>
              </div>
            </Marker>
          )}

          {rideRouteGeoJSON && (
            <Source id="ride-route" type="geojson" data={rideRouteGeoJSON}>
              <Layer {...rideRouteLayer} />
            </Source>
          )}

          {liveTrackingRouteGeoJSON && (
            <Source id="live-tracking-route" type="geojson" data={liveTrackingRouteGeoJSON}>
              <Layer {...liveTrackingLayer} />
            </Source>
          )}
        </Map>
      )}

      {error && (
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-red-600/90 p-3 text-sm text-white shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default LiveTracking;
