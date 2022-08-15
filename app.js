const express = require("express");
const app = express();
const  {connectDb} = require("./config/config")
 require("dotenv").config();

 app.use(express.json());
 app.use(express.urlencoded({
    extended: true
 }));
 const mongoose = require("mongoose");
 userRoutes = require("./router/router");

connectDb();
app.use(userRoutes);

 //setup server to listen on port 5000
const port = 5000
app.listen(port,()=>{
    console.log("server is live on port "+port);
})



