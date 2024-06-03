
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'employee'], required: true },
    lastName: { type: String, trim: true },
    registerationID: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }, 
    contact: { type: Number, trim: true }, 
    address: { type: String, trim: true }, 
    age: { type: Number, trim: true }
});
export default mongoose.model("User", UserSchema);
