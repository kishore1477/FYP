import mongoose from "mongoose";

const QRCodeSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    otherDetails: {
        type: String,
        trim: true
    },
    stitching_type: {
        type: String,
        trim: true
    },
    line: {
        type: Number,
        required: true
    },
    pocket_type: {
        type: String,
        trim: true
    }
});

export default mongoose.model("QRCode", QRCodeSchema);
