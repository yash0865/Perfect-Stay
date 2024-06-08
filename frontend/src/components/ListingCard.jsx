import React from 'react';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setWishList } from '../redux/state';
import { IoHeart } from "react-icons/io5";

const ListingCard = ({ listing }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const patchWishList = async (e) => {
        e.stopPropagation();
        if (user?._id !== listing.creator._id) {
            const response = await fetch(
                `http://localhost:3000/user/${user._id}/${listing._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();

            if (response.ok) {
                dispatch(setWishList(data.wishList));
            }
        } else {
            return
        }
    };

    const wishList = useSelector((state) => state.user?.wishList);
    const isLiked = wishList?.find((item) => item?._id === listing._id);


    return (
        <div
            onClick={() => navigate(`/listing/${listing._id}`)}
            className="p-4 relative shadow-lg rounded-lg bg-white hover:shadow-2xl"
        >
            <div className="">
                <Carousel data={listing.photos} />
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">{listing.title}</h3>
                <div className="text-gray-600 mt-2">
                    <span>{listing.city}, </span>
                    <span>{listing.state}, </span>
                    <span>{listing.country}</span>
                </div>
                <p className="mt-2 text-gray-500">{listing.type}</p>
                <p className="mt-2 text-lg font-bold">₹ {listing.price} <span className="text-sm font-normal">per night</span></p>
            </div>
            {user && (
                <button
                    className="absolute bottom-3 right-3"
                    onClick={patchWishList}
                    disabled={!user}
                >
                    <IoHeart color={isLiked ? 'red' : 'black'} size={25} />
                </button>
            )}
        </div>
    );
};

export default ListingCard;
