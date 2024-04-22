// const express = require("express");
// const multer = require('multer');
// const mongoose = require("mongoose");
// const cors = require("cors");
// const router = express.Router();
// const userModel = require('./models/user');
// const upload = multer({ dest: 'uploads/' });
// const Car = require ('./models/carModel');
// const app = express();

// app.use('/uploads', express.static('uploads'));
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://localhost:27017/User");

// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     userModel.findOne({ email: email })
//     .then(user => {
//         if (user) {
//             if (user.password === password) {
//                 res.json("Success");
//             } else {
//                 res.json("the password is incorrect");
//             }
//         } else {
//             req.json("No record existed");
//         }
//     })
//     .catch(error => {
//         res.status(500).json("Internal server error");
//     });
// });

// app.post('/register', (req, res) => {
//     userModel.create(req.body)
//     .then(Client => res.json(Client))
//     .catch(err => res.json(err));
// });

// app.post('/addCar', upload.single('image'), async (req, res) => {
//     try {
//         const { make, model, year, color, licensePlate } = req.body;
//         const imageUrl = req.file ? req.file.path : null;
        
//         const newCar = new Car({ make, model, year, color, licensePlate, imageUrl });
//         await newCar.save();

//         res.status(201).json({ message: 'Car added Successfully', car: newCar });
//     } catch (error) {
//         res.status(500).json({ error: 'internal server error' });
//     }
// });


// app.listen(3001, () => {
//     console.log("server is running");
// });


//PRatik wala part

/*global require*/
const express = require("express");
const multer = require('multer');
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require('./models/user');
const upload = multer({ dest: 'uploads/' });
const Car = require ('./models/carModel');
const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Vroom");

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
        const { carID, brand, fuelType, transmissionType, segment, price, location, availability, condition } = req.body;
        const imageUrl = req.file ? req.file.path : null;
        
        const newCar = new Car({ carID, brand, fuelType, transmissionType, segment, price, location, availability, condition, imageUrl });
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

    admModel.create(req.body)
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
        const { carID, brand, fuelType, transmissionType, segment, price, location, availability, condition } = req.body;
        const imageUrl = req.file ? req.file.path : null;
        
        const newCar = new Car({ carID, brand, fuelType, transmissionType, segment, price, location, availability, condition, imageUrl });
        await newCar.save();

        // Query the database to find available vehicles based on the pickup location and availability
        const availableVehicles = await Vehicle.find({
            Location: Location,
            Availability: true
        });

        if (availableVehicles.length > 0) {
            // If vehicles are found, log their information in the console
            console.log("Available vehicles for location:", Location);
            console.log(availableVehicles);
            res.json(availableVehicles); // Send the list of available vehicles as response
        } else {
            // If no vehicles are found, send a message indicating 0 cars found
            console.log("0 cars found for location:", Location);
            res.json({ message: "0 cars found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3001, () => {
    console.log("server is running");
});

