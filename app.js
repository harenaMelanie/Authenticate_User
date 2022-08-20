const express = require("express");
const cors = require('cors')
const app = express();
const morgan = require('morgan'); 
const  {connectDb} = require("./config/config")
require("dotenv").config();
 
app.use(morgan(':user'))

morgan.token('user', function(req,res){
   return req.hostname
})
app.use(cors({
    origin:'*'
 }));

app.use(express.json()); 
 app.use(express.urlencoded({
    extended: true
 }));
 const mongoose = require("mongoose");
userRoutes = require("./router/router");

connectDb();
app.use(userRoutes);

//setup server to listen on port 5000
const port = 3000

app.listen(port,()=>{
    console.log("server is live on port "+port);
})



