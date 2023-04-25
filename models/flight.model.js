const mongoose=require("mongoose");
const flightSchema=mongoose.Schema({
    airline: {type:String,required:true},
    flightNo: {type:String,required:true},
    departure: {type:String,required:true},
    arrival: {type:String,required:true},
    departureTime: {type:Date,required:true}, //yy-mm-dd
    arrivalTime: {type:Date,required:true},   //yy-mm-dd
    seats: {type:Number,required:true},
    price: {type:Number,required:true},
    userID:{type:String,required:true}

})

const Flightmodel=mongoose.model("flights",flightSchema);
module.exports={Flightmodel}