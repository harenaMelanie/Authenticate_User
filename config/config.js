const express = require("express");
const mongoose = require('mongoose');

//connect to database

function connectDb(){
    try{
        mongoose.connect("mongodb://localhost:27017/")
        console.log('connect to a database mydatabase')
    }
     catch (error){
    handleError(error);
    }
    
    process.on('unhandledRejection', error =>{
        console.log('unhandledRejection', error.message);
    });
    
}

function deconnectDb(){

}

module.exports = {connectDb,deconnectDb}