
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        trim:true
    },
    lastName: {
        type:String,
        required: true,
        trim:true
    },
    registerationID: {
        type:String,
        required: true,
        trim:true
    },
    password: {
        type:String,
        required: true,
        trim:true
    },
    email: {
        type:String,
        required: true,
        trim:true
    },
    contact: {
        type:Number,
        required: true,
        trim:true
    },
    address: {
        type:String,
        required: true,
        trim:true
    },
    age: {
        type:Number,
        required: true,
        trim:true
    },
   
  });
  const User = mongoose.model('user', UserSchema);
  export default User