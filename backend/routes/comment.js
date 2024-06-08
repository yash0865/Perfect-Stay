import express from 'express';
import Comment from '../models/Comment.js'

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { listingId, userName, userImage, comment, rating } = req.body
        const newComment = new Comment({ listingId, userName, userImage, comment, rating })
        await newComment.save()
        res.status(200).json(newComment)

    } catch (err) {
        res.status(409).json({ message: "Fail to comment", error: err.message })
        console.log(err);
    }
})

router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        const comments = await Comment.find({ listingId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve comments", error: err.message });
        console.log(err);
    }
})

export default router