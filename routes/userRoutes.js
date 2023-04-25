const express=require("express");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const app = express();
const {Usermodel}=require("../models/User.model");
let jwt = require("jsonwebtoken")
const userRouter=express.Router();
require("dotenv").config()
app.use(express.json());

//register api
userRouter.post("/register",async(req,res)=>{
    let {name,email,password}=req.body;
    try {
        bcrypt.hash(password,5,async(err,secure_pass)=>{
            if(err){
                res.send({err:err})
            }else{
                let user=await new Usermodel({name,email,password:secure_pass});
                await user.save();
                res.status(201).send({message:`user has successully registered`});
            }
        })
    } catch (error) {
        res.send({error:error.message});
    }
})

/// login api
userRouter.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let data = await Usermodel.find({email});
        if(data.length>0){
            let dec_password= data[0].password;
            let userID=data[0]._id;
            bcrypt.compare(password,dec_password,(err,result)=>{
                if(err){
                    res.send({message:err.message});
                }else{
                    if(result){
                        let token=jwt.sign({userID},"Admin");
                        res.status(201).send({message:"logged in",userData:data,token});
                    }else{
                        res.send({message:"wrong credential"})
                    }
                }
            })

        }else{
            res.send({message:"please do registration first"})
        }
    } catch (error) {
        
    }
})
module.exports={userRouter}
