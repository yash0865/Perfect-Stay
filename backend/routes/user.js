import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js";
import mongoose from "mongoose";

const router = express.Router();

// Get user's bookings
router.get("/:userId/bookings", async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ customerId: userId }).populate("customerId ownerId listingId");
        res.status(200).json(bookings);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Cannot find bookings", error: err.message });
    }
});

// Update user's wish list
router.patch("/:userId/:listingId", async (req, res) => {
    try {
        const { userId, listingId } = req.params
        const user = await User.findById(userId)
        const listing = await Listing.findById(listingId).populate("creator")

        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

        if (favoriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save()
            res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList })
        } else {
            user.wishList.push(listing)
            await user.save()
            res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
})

//get property list
router.get("/:userId/properties", async (req, res) => {
    try {
        const { userId } = req.params;
        const properties = await Listing.find({ creator: userId }).populate("creator");
        res.status(200).json(properties);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Cannot find properties", error: err.message });
    }
});

//get reservation list
router.get("/:userId/reservations", async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await Booking.find({ ownerId: userId }).populate("customerId ownerId listingId");
        res.status(200).json(reservations);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Cannot find reservations", error: err.message });
    }
});


export default router;
