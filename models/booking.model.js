const mongoose=require("mongoose");
const bookingSchema=mongoose.Schema({
    user : { type: String },
    flight : { type: String}

})

const Bookingmodel=mongoose.model("booking",bookingSchema);
module.exports={Bookingmodel}