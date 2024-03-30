import mongoose from "mongoose";

const expireTime = () => {
    return new Date(Date.now() + 5 * 60 * 1000);
}

const otpSchema = mongoose.Schema({
    otp: { type: String },
    expire: {
        type: Date,
        default: expireTime,
        expires: 300 
    }
});

export default mongoose.model("otpSchema", otpSchema);
