const express = require("express");
const multer = require('multer');
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const userModel = require('./models/user');
const upload = multer({ dest: 'uploads/' });
const Car = require ('./models/carModel');
const app = express();

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
        const { make, model, year, color, licensePlate } = req.body;
        const imageUrl = req.file ? req.file.path : null;
        
        const newCar = new Car({ make, model, year, color, licensePlate, imageUrl });
        await newCar.save();

        res.status(201).json({ message: 'Car added Successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ error: 'internal server error' });
    }
});


app.listen(3001, () => {
    console.log("server is running");
});
