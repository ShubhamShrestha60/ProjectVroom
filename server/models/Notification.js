const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for cancellation notification
const notificationSchema = new Schema({
    bookingID: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export Notification model based on schema
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
