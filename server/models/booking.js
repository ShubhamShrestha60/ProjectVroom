/*global require, module*/
const mongoose = require ('mongoose')

const bookingSchema = new mongoose.Schema({
    
    email: String,
    carID: Number,
    bookingID: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString() // Generate a new ObjectId as the default value
    },
    pickupLocation: String,
    dropoffLocation: String,
    pickupDate: String,
    pickupTime: String,
    dropoffDate: String,
    dropoffTime: String,
    LicenseNumber: String,
    ExpiryDate: String,
    LicensePhoto: String

})

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;