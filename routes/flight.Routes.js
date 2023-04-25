const express=require("express");
const mongoose=require("mongoose");
const { Flightmodel } = require("../models/flight.model");
const app=express();
const flightRoutes=express.Router();
app.use(express.json());
/// all flights
flightRoutes.get("/flights",async(req,res)=>{
    try {
        let data = await Flightmodel.find();
        res.send({All_flights:data});
    } catch (error) {
        res.status(200).send({error:error.message})
    }
})

flightRoutes.get("/flights/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data = await Flightmodel.find({_id:id});
        if(data.length>0){
            res.status(200).send({flight_data:data});
        }else{
            res.send({message:"no id found"})
        }
      
    } catch (error) {
        res.send({error:error.message})
    }
})

// add flights api

flightRoutes.post("/flights",async(req,res)=>{
    try {
    //    let {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body
    let flight_data=await new Flightmodel(req.body);
    await flight_data.save();
    res.status(201).send({message:"new flight has added to the system"})
    } catch (error) {
        res.send({error:error.message});
    }
})
flightRoutes.patch("/flights/:id",async(req,res)=>{
    try {
        let id= req.params.id;
        let data=await Flightmodel.findOne({_id:id});
        let user_id=req.body.userID;
        let flight_user_id=data.userID;
        if(user_id==flight_user_id){
            await Flightmodel.findByIdAndUpdate({_id:id},req.body)
            res.send({message:"data has been updated"})
        }else{
            res.send({message:"user cannot update other's flight data"})
        }
        
    } catch (error) {
        res.send({error:error.message})
    }
})

// delete api flight
flightRoutes.delete("/flights/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data = await Flightmodel.find({_id:id});
        if(data.length>0){
            let Flightmodel_id=data[0].userID;
            let user_Id=req.body.userID;
            if(Flightmodel_id==user_Id){
                await Flightmodel.findByIdAndDelete({_id:id});
                res.status(202).send("Flight  has been deleted");
            }else{
                res.send({message:"user cannot delete other's flight data"})
            }
        }else{
            res.send({message:"no id found"})
        }
        
    } catch (error) {
        console.log({error:error.message})
    }
})
module.exports={flightRoutes}