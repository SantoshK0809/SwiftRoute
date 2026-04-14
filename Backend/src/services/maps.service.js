const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAP_BOX_API,
      },
    });

    if (response.data.features && response.data.features.length > 0) {
      // Mapbox API returns coordinates as [longitude, latitude]
      const [longitude, latitude] = response.data.features[0].center;
      return {
        ltd: latitude,
        lang: longitude,
      };
    } else {
      throw new Error("Unable to fetch coordinates for the given address");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // The Mapbox Directions API requires coordinates (longitude,latitude), not text addresses!
  // So we first need to convert the pickup and destination string addresses into coordinates using our existing function.
  let pickupCoords, destCoords;
  try {
    pickupCoords = await module.exports.getAddressCoordinate(pickup);
    destCoords = await module.exports.getAddressCoordinate(destination);
  } catch (error) {
    throw new Error("Unable to fetch coordinates for the provided addresses");
  }

  // Now format the coordinates precisely as longitude,latitude
  const formattedPickup = `${pickupCoords.lang},${pickupCoords.ltd}`;
  const formattedDest = `${destCoords.lang},${destCoords.ltd}`;

  // Pass the formatted coordinates to the directions API
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${formattedPickup};${formattedDest}`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAP_BOX_API,
      },
    });

    if (response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];

      // Mapbox route distance is returned in meters
      // Mapbox route duration is returned in seconds

      const totalMinutes = Math.round(route.duration / 60);
      const days = Math.floor(totalMinutes / (24 * 60));
      const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
      const minutes = totalMinutes % 60;

      let durationText = "";
      if (days > 0) {
        durationText = `${days} day${days !== 1 ? "s" : ""} ${hours} hour${hours !== 1 ? "s" : ""}`;
      } else if (hours > 0) {
        durationText = `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} min${minutes !== 1 ? "s" : ""}`;
      } else {
        durationText = `${minutes} min${minutes !== 1 ? "s" : ""}`;
      }

      return {
        distance: {
          text: (route.distance / 1000).toFixed(1) + " km",
          value: route.distance,
        },
        duration: {
          text: durationText,
          value: route.duration,
        },
      };
    } else {
      throw new Error(
        "Unable to fetch distance and time for the given coordinates",
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports.getAutoCompleteSuggestions = async (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;

  try {
    if (!address) {
      throw new Error("Query is required");
    }

    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAP_BOX_API,
        limit: 5,
        types: "place,address,postcode,neighborhood",
      },
    });

    if (response.data.features) {
      return response.data.features.map((feature) => {
        const description = feature.place_name;
        const main_text = feature.text;

        // Find where main_text ends to extract the secondary_text properly
        const mainTextIndex = description.indexOf(main_text);
        let secondary_text = "";

        if (mainTextIndex !== -1) {
          // Extract everything after the main text, removing leading commas/spaces
          secondary_text = description
            .substring(mainTextIndex + main_text.length)
            .replace(/^[\s,،]+/, "");
        } else {
          secondary_text = description;
        }

        return {
          description,
          structured_formatting: {
            main_text,
            secondary_text,
          },
          terms: description.split(",").map((term) => ({
            value: term.trim(),
          })),
          location: {
            ltd: feature.center[1],
            lang: feature.center[0],
          },
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
