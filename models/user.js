import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: false,
        minlenght:6
    },
    blogs:[{type:mongoose.Types.ObjectId, ref:"Blog", required:true}]
})

export default mongoose.model("User", (userSchema))


const schema = mongoose.Schema()