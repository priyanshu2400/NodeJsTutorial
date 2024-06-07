const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
router.post("/",async(request,res) => {
    try{
      const data = request.body;
      const newMenu = new Menu(data);
      const response = await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).json({error : "internal server error"});
    }
  })
  
  router.get("/",async (req,res) => {
    try {
      const data = await Menu.find();
      res.status(200).json(data);
      console.log("got the data successfully")
    }
    catch(err) {
      res.status(500).json({error : "internal server error"});
      console.log(err)
    }
  })

module.exports = router;