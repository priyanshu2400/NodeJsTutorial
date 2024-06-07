const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    ingredients:{
        type:[String],
        default:[]
    },
    price:{
        type:Number,
        required:true,
    }
})

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;