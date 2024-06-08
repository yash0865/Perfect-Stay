import express from 'express';
const router = express.Router()
import Listing from '../models/Listing.js';


router.post("/create", async (req, res) => {

    try {
        const { creator, category, type, streetAddress, apartment, city, state, country, guestCount, bedroomCount,
            bedCount, bathroomCount, amenities, photos, title, description, highlight, price } = req.body;

        const newListing = new Listing({
            creator, category, type, streetAddress, apartment, city, state, country, guestCount, bedroomCount,
            bedCount, bathroomCount, amenities, photos, title, description, highlight, price
        })

        await newListing.save();

        res.status(200).json(newListing)
    } catch (err) {
        res.status(409).json({ message: "Fail to create listing", error: err.message })
        console.log(err);
    }
})

router.get("/", async (req, res) => {
    const category = req.query.category;
    try {
        let listings;
        if (category) {
            listings = await Listing.find({ category: category }).populate("creator")
        } else {
            listings = await Listing.find().populate("creator")
        }

        res.status(200).json(listings)
    } catch (err) {
        res.status(409).json({ message: "Fail to fetch listings", error: err.message })
        console.log(err);
    }
})

//get listings by search
router.get("/search/:query", async (req, res) => {
    const { query } = req.params;
    try {
        let listings = []

        if (query === "all") {
            listings = await Listing.find().populate("creator")
        } else {
            listings = await Listing.find({
                $or: [
                    { category: { $regex: query, $options: "i" } },
                    { title: { $regex: query, $options: "i" } },
                    { city: { $regex: query, $options: "i" } },
                ]
            }).populate("creator")
        }

        res.status(200).json(listings)
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message })
        console.log(err);
    }
})


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate("creator");
        res.status(200).json(listing)
    } catch (err) {
        res.status(404).json({ message: "Listing not found", err: err.message })
    }
})

export default router;