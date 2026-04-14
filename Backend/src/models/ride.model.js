const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    rideType: {
        type: String,
        // required: true
    },
    fare: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,       //In meters
        // required: true
    },
    duration: {
        type: Number,     //In seconds
        // required: true
    },
    eta: {
        type: Number,
        // required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        // required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'upi'],
        // required: true
    },
    orderId: {
        type: String,
        // required: true
    },
    signature: {
        type: String,
        // required: true
    },
    otp: {
        type: String,
        select: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;