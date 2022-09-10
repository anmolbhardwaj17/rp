const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({   //schema DTO/DBO
    sessionId:{
        type:String,
    },
    userId:{
        type:String,
        //required:true
    }
})

const Session = mongoose.model('SESSION', sessionSchema);
module.exports = Session;