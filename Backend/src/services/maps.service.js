const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;

    try {
        const response = await axios.get(url, {
            params: {
                access_token: process.env.MAP_BOX_API
            }
        });

        if (response.data.features && response.data.features.length > 0) {
            // Mapbox API returns coordinates as [longitude, latitude]
            const [longitude, latitude] = response.data.features[0].center;
            return {
                ltd: latitude,
                lang: longitude
            };
        } else {
            throw new Error('Unable to fetch coordinates for the given address');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getDistanceAndTime = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    
    // The Mapbox Directions API requires coordinates (longitude,latitude), not text addresses!
    // So we first need to convert the pickup and destination string addresses into coordinates using our existing function.
    let pickupCoords, destCoords;
    try {
        pickupCoords = await module.exports.getAddressCoordinate(pickup);
        destCoords = await module.exports.getAddressCoordinate(destination);
    } catch (error) {
        throw new Error('Unable to fetch coordinates for the provided addresses');
    }

    // Now format the coordinates precisely as longitude,latitude
    const formattedPickup = `${pickupCoords.lang},${pickupCoords.ltd}`;
    const formattedDest = `${destCoords.lang},${destCoords.ltd}`;

    // Pass the formatted coordinates to the directions API
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${formattedPickup};${formattedDest}`;

    try {
        const response = await axios.get(url, {
            params: {
                access_token: process.env.MAP_BOX_API
            }
        });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            
            // Mapbox route distance is returned in meters
            // Mapbox route duration is returned in seconds
            
            return {
                distance: {
                    text: (route.distance / 1000).toFixed(1) + ' km',
                    value: route.distance
                },
                duration: {
                    text: Math.round(route.duration / 60) + ' mins',
                    value: route.duration
                }
            };
        } else {
            throw new Error('Unable to fetch distance and time for the given coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};