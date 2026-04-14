const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.handleGetAddressCoordinate = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errors.array()
            });
        }

        const { address } = req.query;
        const coordinate = await mapService.getAddressCoordinate(address);
        res.status(200).json({
            success: true,
            message: "Address coordinate fetched successfully",
            data: coordinate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch address coordinate",
            error: error.message
        });
    }
}

module.exports.handleGetDistanceAndTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errors.array()
            });
        }
        
        const { pickup, destination } = req.query;
        const distance = await mapService.getDistanceAndTime(pickup, destination);
        res.status(200).json({
            success: true,
            message: "Distance fetched successfully",
            data: distance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch distance",
            error: error.message
        });
    }
}

module.exports.handleGetSuggestion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errors.array()
            });
        }
        
        const { address } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(address);
        res.status(200).json({
            success: true,
            message: "Suggestions fetched successfully",
            data: suggestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch suggestions",
            error: error.message
        });
    }
}