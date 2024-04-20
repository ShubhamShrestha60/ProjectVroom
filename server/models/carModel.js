const mongoose = require('mongoose');

// Define the car schema
const carSchema = new mongoose.Schema({
    carID: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel'],
        required: true
    },
    transmissionType: {
        type: String,
        enum: ['Manual', 'Automatic'],
        required: true
    },
    segment: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
