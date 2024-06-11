const express = require('express');
const router = express.Router();
const Person = require('../models/person');
require('dotenv').config();
const {jwtAuthMiddleware,generateToken} = require('../jwt');
router.post("/signup", async (req,res) => {  
try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    const payload = {
        username : response.username,
        id : response.id,
    }
    console.log(payload);
    const token = generateToken(payload);
    console.log("data saved");
    res.status(200).json({
        response : response,
        token : token
    });
}
catch(err) {
    console.log(err);
    res.status(500).json({error : "internal server error 1"});
}
})

router.post("/signin", async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await Person.findOne({username : username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error : "invalid username and password"});
        }

        const payload = {
            username: user.username,
            id : user.id
        }

        const Token = generateToken(payload);

        return res.status(200).json({Token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "internal server error 1"});
    }
})

router.get("/",jwtAuthMiddleware,async (req,res) => {
try {
    const data = await Person.find();
    res.status(200).json(data);
    console.log("got the data successfully")
}
catch(err) {
    res.status(500).json({error : "internal server error"});
    console.log(err)
}
})

router.get("/profile", jwtAuthMiddleware, async (req,res) => {
    try{
        const userData = req.user;
        const user_id = userData.id;
        const user= await Person.findById(user_id)

        if(!user){
            return res.status(401).json({error : "User Not Found"})
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error : "internal server error"});
    }
})

router.get("/:workType",async (req,res) => {
    try {
        const workType = req.params.workType;
        const data = await Person.find({work : workType});
        res.status(200).json(data);
        console.log("got the data successfully")
    }
    catch(err) {
        res.status(500).json({error : "internal server error"});
        console.log(err)
    }
})

router.put("/:id", async (req,res) => {
    try{
        const person_id = req.params.id;
        const updated_person = req.body;
        const response = await Person.findByIdAndUpdate(person_id,updated_person,{
            new:true,
            runValidators: true,
        });
        if(!response){
            res.status(404).json({error: "Person not found"})
        }
        res.status(200).json(response);
        console.log("person data updated successfully")
    }
    catch(err){
        res.status(500).json({error : "internal server error"});
        console.log(err)
    }
})

router.delete("/:id", async (req,res) => {
    try{
        const person_id = req.params.id;
        const response = await Person.findByIdAndDelete(person_id);
        if(!response){
            res.status(404).json({error : "Person not found"})
        }
        res.status(200).json(response);
        console.log("person data Deleted successfully")
    }
    catch(err){
        res.status(500).json({error : "internal server error"});
        console.log(err)
    }
})


module.exports = router;