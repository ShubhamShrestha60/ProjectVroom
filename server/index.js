
/*global require*/
const express = require("express");
const multer = require('multer');
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require('./models/user');
const upload = multer({ dest: 'uploads/' });
const Car = require('./models/carModel');
const admModel = require('./models/admin');
const bookingModel = require('./models/booking');
const app = express();
const bodyParser = require('body-parser');

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/User");

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");

                } else {
                    res.json("the password is incorrect");
                }
            } else {
                req.json("No record existed");
            }
        })
        .catch(error => {
            res.status(500).json("Internal server error");
        });
});

app.post('/register', (req, res) => {
    userModel.create(req.body)
        .then(Client => res.json(Client))
        .catch(err => res.json(err));
});

app.post('/addCar', upload.single('image'), async (req, res) => {
    try {
        const { carID, brand, fuelType, transitionType, segment, price, location, availability, condition } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        const newCar = new Car({ carID, brand, fuelType, transitionType, segment, price, location, availability, condition, imageUrl });
        await newCar.save();

        res.status(201).json({ message: 'Car added Successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ error: 'internal server error' });
    }
});






app.post("/adminLogin", (req, res) => {
    const { email, password } = req.body;
    admModel.findOne({ email: email })
        .then(admin => {
            if (admin) {
                if (admin.password === password) {
                    res.json("Success");

                } else {
                    res.json("Incorrect password");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(error => {
            res.status(500).json("Internal server error");
        });
});

app.post('/signup', (req, res) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json("Passwords do not match");
    }

    userModel.create(req.body)
        .then(admin => res.json(admin))
        .catch(err => res.status(500).json(err));
});
app.use(bodyParser.json());

app.delete('/deleteCar/:carID', async (req, res) => {
    try {
        const carID = req.params.carID;
        const deletedCar = await Car.findOneAndDelete({ carID: carID });

        if (!deletedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.json({ message: 'Car deleted successfully', deletedCar });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error: error.message });
    }
});


// Endpoint to search for available vehicles based on pickup location
app.post("/home", async (req, res) => {
    try {
        const { location } = req.body;

        // Query the database to find available vehicles based on the pickup location and availability
        const availableVehicles = await Car.find({
            location: location,
            availability: true
        });

        if (availableVehicles.length > 0) {
            // If vehicles are found, log their information in the console
            console.log("Available vehicles for location:", location);
            console.log(availableVehicles);
            res.json(availableVehicles); // Send the list of available vehicles as response
        } else {
            // If no vehicles are found, send a message indicating 0 cars found

            res.json({ message: "0 cars found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/carDetails', async (req, res) => {
    try {
        const { carID } = req.body;
        const carDetail = await Car.findOne({
            carID: carID,
            // availability: true
        });
        if (!carDetail) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(carDetail);
    } catch (error) {
        console.error('Error fetching car details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/booking', upload.single('image'), async (req, res) => {
    try {
        const { email, carID, pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, LicenseNumber, ExpiryDate } = req.body;
        const LicensePhoto = req.file ? req.file.path : null;

        const newBooking = new bookingModel({ email, carID, pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, LicenseNumber, ExpiryDate, LicensePhoto });
        await newBooking.save();

        res.status(201).json({ message: 'Booking Successfull', booking: newBooking });

    } catch (error) {
        res.status(500).json({ error: 'internal server error' });
    }
});

app.post('/bookingDetails', async (req, res) => {
    try {
        const { email } = req.body;
        const bookingDetail = await bookingModel.find({
            email: email,

        });
        if (!bookingDetail) {
            return res.status(404).json({ error: 'No such booking found' });
        }
        res.json(bookingDetail);
    } catch (error) {
        console.error('Error fetching booking details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/bookedcarDetails', async (req, res) => {
    try {
        const { carID } = req.body;
        const bookedcarDetail = await Car.findOne({
            carID: carID,
            // availability: true
        });
        if (!bookedcarDetail) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(bookedcarDetail);
    } catch (error) {
        console.error('Error fetching car details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.listen(3002, () => {
    console.log("server is running");
});

