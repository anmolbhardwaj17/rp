const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({   //schema DTO/DBO
    userName:{
        type:String,
    },
    email:{
        type:String,
        //required:true
    },
    password:{
        type:String,
        //required:true
    },
})

const User = mongoose.model('USER', userSchema);
module.exports = User;