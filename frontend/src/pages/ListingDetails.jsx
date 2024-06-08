import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { InfinitySpin } from 'react-loader-spinner';
import Navbar from '../components/Navbar';
import { facilities } from '../data';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import PhotoGallery from '../components/PhotoGallery';

const ListingDetails = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const customerId = useSelector((state) => state?.user?._id);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const getListing = async () => {
        try {
            const response = await fetch(`http://localhost:3000/listing/${id}`, { method: "GET" });
            const data = await response.json();
            setListing(data);
            getComments();
            setLoading(false);
        } catch (err) {
            console.error("Listing fetching failed", err.message);
            setLoading(false);
        }
    };

    const getComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/comment/${id}`, { method: "GET" });
            const data = await response.json();
            setComments(data);
        } catch (err) {
            console.error("Comment fetching failed", err.message);
        }
    };

    const postComment = async () => {
        if (comment === "") return;

        try {
            const commentData = {
                listingId: id,
                userName: `${user.firstName} ${user.lastName}`,
                userImage: user.profileImg,
                comment,
                rating
            };

            const response = await fetch(`http://localhost:3000/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentData)
            });
            const data = await response.json();

            if (data) {
                alert("Comment Posted");
                setComment("");
                setRating(0);
                getComments();
            }
        } catch (err) {
            console.error("Comment post failed", err.message);
        }
    };

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    useEffect(() => {
        getListing();
    }, []);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const handleBooking = async () => {
        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            const bookingData = {
                customerId,
                ownerId: listing.creator._id,
                listingId: listing._id,
                startDate: dateRange[0].startDate.toDateString(),
                endDate: dateRange[0].endDate.toDateString(),
                totalPrice: listing.price * dayCount
            };

            const response = await fetch("http://localhost:3000/booking/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                navigate(`/${customerId}/bookings`);
            }
        } catch (err) {
            console.log("Booking failed", err.message);
        }
    };

    return (
        <>
            <Navbar />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <InfinitySpin width="200" color="orange" ariaLabel="infinity-spin-loading" />
                </div>
            ) : (
                <div className="container mx-auto p-6 lg:p-12">
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold">{listing.title}</h1>
                    </div>

                    <PhotoGallery place={listing} />

                    <h2 className="text-2xl font-semibold my-4">
                        {listing.type} in {listing.city}, {listing.state}, {listing.country}
                    </h2>

                    <p className="mb-4 text-lg">
                        {listing.guestCount} guests · {listing.bedroomCount} bedrooms · {listing.bedCount} beds · {listing.bathroomCount} bathrooms
                    </p>

                    <hr className="mb-4" />

                    <div className="flex items-center gap-6 mb-4">
                        <img src={listing.creator.profileImg} alt={`${listing.creator.firstName} ${listing.creator.lastName}`} className="w-16 h-16 rounded-full object-cover" />
                        <h3 className="text-2xl">Posted by {listing.creator.firstName} {listing.creator.lastName}</h3>
                    </div>

                    <hr className="mb-6" />

                    <h2 className="text-xl font-semibold mb-2">{listing.highlight}</h2>
                    <p className="text-justify mb-6">{listing.description}</p>

                    <hr className="mb-6" />

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <h1 className="text-xl font-semibold mb-4">What this place offers</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {listing.amenities?.map((item, idx) => {
                                    const facility = facilities.find((facility) => facility.name === item);
                                    return (
                                        <div key={idx} className="flex items-center gap-3 text-lg">
                                            {facility ? React.cloneElement(facility.icon, { size: 30 }) : null}
                                            {facility ? facility.name : item}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-xl font-semibold mb-4">How long do you want to stay?</h1>
                            <div className="flex justify-center">
                                <DateRange
                                    ranges={dateRange}
                                    onChange={handleSelect}
                                    minDate={new Date()}
                                    className="mb-4"
                                    color="#FFA500"
                                />
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg">${listing.price} x {dayCount} {dayCount > 1 ? 'nights' : 'night'}</h2>
                                <h2 className="text-lg font-semibold">Total: ${listing.price * dayCount}</h2>
                            </div>

                            <div className="mb-4">
                                <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                                <p>End Date: {dateRange[0].endDate.toDateString()}</p>
                            </div>

                            <button onClick={handleBooking} className="bg-orange-500 px-6 py-3 rounded-md text-xl text-white w-full">Book</button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Give your review</h2>
                        <form className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label htmlFor="comment" className="block text-lg font-semibold mb-2">Write your review</label>
                                <textarea
                                    required
                                    className="shadow-sm h-20 rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none"
                                    placeholder="Write your review"
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Give stars</h2>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={40}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={postComment}
                                className="bg-orange-500 px-6 py-2 rounded-md text-xl text-white w-full"
                            >
                                Post Comment
                            </button>
                        </form>

                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                            <div className="flex gap-3">
                                                <img src={comment.userImage} alt="User Profile" className="w-6 h-6 rounded-full" />
                                                <h3 className="text-lg font-semibold">{comment.userName}</h3>
                                            </div>
                                            <ReactStars
                                                count={5}
                                                value={comment.rating}
                                                size={24}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <p className="mt-2">{comment.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xl text-center">No comments yet</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListingDetails;
