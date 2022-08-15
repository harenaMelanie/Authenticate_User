var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName :{
        type: String,
        required: [true, "fullname not provided"],
    },
    email:{
        type: String,
        unique: [true, "email already exists in database!"]
    },
    role:{
        type: String,
        enum:["normal", "admin"],
        required: [true, "Please specify user role"]
    },
    password:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', userSchema);