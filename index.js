const express=require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const  {auth}  = require("./middlewares/auth.middleware");
const { flightRoutes } = require("./routes/flight.Routes");
require("dotenv").config()
const app =express()
app.use(express.json());
app.use("/user",userRouter);
app.use("/flight",auth,flightRoutes)
app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connected to db");
        
    } catch (error) {
        console.log({message:error.message});
    }
    console.log("server has started")
})