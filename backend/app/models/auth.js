const mongoose = require('mongoose');
const { type } = require('../utils/productValidate');
const Schema =mongoose.Schema;

const authSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type:String,
        enun: ['user', 'admin'],
        default: 'user'
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},
{
        timestamps: true,
        versionKey: false
    }
);

const Auth = mongoose.model("auth", authSchema)
module.exports = Auth