import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const { customerId, ownerId, listingId, startDate, endDate, totalPrice } = req.body
        const newBooking = new Booking({
            customerId, ownerId, listingId, startDate, endDate, totalPrice
        })

        await newBooking.save()
        res.status(200).json(newBooking)
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Booking failed", error: err.message })
    }
})

export default router