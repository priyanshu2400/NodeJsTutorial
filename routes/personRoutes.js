const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post("/", async (req,res) => {  
try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
}
catch(err) {
    console.log(err);
    res.status(500).json({error : "internal server error"});
}
})
  
router.get("/",async (req,res) => {
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