const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
require("dotenv").config()
const connection = mongoose.connect("mongodb+srv://abhi:abhi@cluster0.k5hto.mongodb.net/airline?retryWrites=true&w=majority");
module.exports={connection}
