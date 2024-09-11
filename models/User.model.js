import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model("User", UserSchema);