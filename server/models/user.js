const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
})

const userModel = mongoose.model('Client', userSchema);

module.exports = userModel;