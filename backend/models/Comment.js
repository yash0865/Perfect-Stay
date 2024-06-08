import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    listingId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        default: ""
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

export default Comment