
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
const nodemailer = require('nodemailer');
const crypto = require('crypto');

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/User");

// Login endpoint only allowing verified users to log in
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.json("No record existed");
        }

        if (!user.isVerified) {
            return res.json("Please verify your email to login.");
        }

        if (user.password === password) {
            res.json("Success");
        } else {
            res.json("Incorrect password");
        }
    } catch (error) {
        res.status(500).json("Internal server error");
    }
});



// Nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    logger:true,
    dubug:true,
    secureConnection:false,
    auth: {
        user: "pratikpanthi100@gmail.com", // <-- Your email address
        pass: "kxio tjem dbet eeba" // <-- Your email password
    },
    tls:{
        rejectUnauthorized: true
    }
});

// Function to send verification email
const sendVerifyMail = async (name, email, verificationToken) => {
    try {
        const mailOptions = {
            from: "pratikpanthi100@gmail.com", // <-- Your email address
            to: email,
            subject: "Verification mail",
            html: `<p>Hi ${name}, please click <a href="http://localhost:3002/verify?id=${verificationToken}">here</a> to verify your email.</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email has been sent.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// User registration endpoint with email verification
app.post('/register', async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        const verificationToken = crypto.randomBytes(20).toString('hex'); // Generate a random token
        user.verificationToken = verificationToken;
        await user.save();

        // Send verification email
        await sendVerifyMail(user.firstName, user.email, verificationToken);

        res.json({ message: "Your registration is successful. Please verify your email" });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Your registration has failed" });
    }
});

// User email verification endpoint
app.get('/verify', async (req, res) => {
    try {
        const { id } = req.query;
        const user = await userModel.findOne({ verificationToken: id });

        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }

        user.isVerified = true;
        user.verificationToken = null; // Remove verification token after verification
        await user.save();

        res.json({ message: "Email verified successfully. You can now login." });
    } catch (err) {
        console.error("Error verifying email:", err);
        res.status(500).json({ message: "Internal server error" });
    }
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


const sendBookingSuccessEmail = async (email, bookingID) => {
    try {
        const mailOptions = {
            from: "pratikpanthi100@gmail.com",
            to: email,
            subject: "Booking Successful",
            html: `<p>Your booking was successful. Your booking ID is ${bookingID}.</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Booking success email has been sent.");
    } catch (error) {
        console.error("Error sending booking success email:", error);
    }
};

app.post('/booking', upload.single('image'), async (req, res) => {
    try {
        const { email, carID, pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, LicenseNumber, ExpiryDate } = req.body;
        const LicensePhoto = req.file ? req.file.path : null;

        // Create a new booking record
        const newBooking = new Booking({ email, carID, pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, LicenseNumber, ExpiryDate, LicensePhoto });
        await newBooking.save();

        // Update car availability to false
        const updatedCar = await Car.findOneAndUpdate(
            { carID: carID, availability: true }, // Find the car by carID and ensure it's currently available
            { availability: false }, // Update availability to false
            { new: true } // Return the updated document
        );

        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not available for booking' });
        }

        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        console.error('Error booking car:', error);
        res.status(500).json({ error: 'Internal server error' });
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

