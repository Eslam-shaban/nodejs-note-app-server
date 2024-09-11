import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId: {
        type: "string",
        required: [true, "Please enter a user id"],
    },
    title: {
        type: "string",
        required: [true, "Please enter a title"],
        maxlenght: [40, "title cannpt be more than 40 characters"],
    },
    description: {
        type: "string",
        required: [true, "Please enter a description"],
        maxlenght: [200, "description cannpt be more than 200 characters"],
    },
    color: {
        type: "string",
        default: "#fff",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model("Note", NoteSchema);