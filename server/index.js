const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userModel = require('./models/user')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/User");

app.post("/login",(req,res)=>{
    const {email, password}=req.body;
    userModel.findOne({email: email})
    .then(user=>{
        if(user){
           if(user.password === password){
            res.json("Success");
           } else {
            res.json("the password is incorrect");
           }
        }else{
            req.json("No record existed");
        }
    })
    .catch(error=>{
        res.status(500).json("Internal server error");
    })
})

app.post('/register',(req, res)=>{
    userModel.create(req.body)
    .then(Client =>res.json(Client))
    .catch(err => res.json(err))

})

app.listen(3001, () =>{
    console.log("server is running")
})

