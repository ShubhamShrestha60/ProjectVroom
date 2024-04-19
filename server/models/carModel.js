const mongoose = require('mongoose');

// Define the car schema
const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    licensePlate: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
});


const Car = mongoose.model('Car', carSchema);
module.exports = Car;
