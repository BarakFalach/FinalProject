const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id : Number, 
    userName : String,
    // password : String,
    // position : Number,
    // email : String,
    // credentials : {
    //     _id : mongoose.Schema.Types.ObjectId,
    //     firstName : String,
    //     lastName : String,
    //     age : Number,
    //     hight : Number,
    //     BMI : Number,
    // }
    
});

module.exports = mongoose.model('User',userSchema);