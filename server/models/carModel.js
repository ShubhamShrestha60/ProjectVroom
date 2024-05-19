const mongoose = require('mongoose');
const Counter = require('./counter'); // Import the Counter model

const carSchema = new mongoose.Schema({
  carID: { type: Number, unique: true },
  brand: {type: String},
  fuelType: {type:String},
  transitionType: {type:String},
  segment: {type: String},
  price: {type:Number},
  location: {type:String},
  availability: {type:Boolean},
  condition: {type:String},
  imageUrl: {type:String}
});

// Middleware to auto-increment carID before saving
carSchema.pre('save', async function(next) {
      const doc = this;
      if (!doc.carID) {
        try {
          const counter = await Counter.findByIdAndUpdate(
            { _id: 'carID' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
          );
          doc.carID = counter.seq;
          next();
        } catch (error) {
          next(error);
        }
      } else {
        next();
      }
    });
    

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
