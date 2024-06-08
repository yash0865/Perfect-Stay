import React, { useEffect, useState, useRef } from 'react';
import { categories } from '../data';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../redux/state';
import ListingCard from './ListingCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Listings = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const listings = useSelector((state) => state.listings);
    const categoryListRef = useRef(null);

    const getListings = async () => {
        try {
            const response = await fetch(
                selectedCategory !== "All"
                    ? `http://localhost:3000/listing?category=${selectedCategory}`
                    : `http://localhost:3000/listing`,
                { method: "GET" }
            );

            const data = await response.json();
            dispatch(setListings({ listings: data }));
            setLoading(false);
        } catch (err) {
            console.log("Listings fetching failed");
            setLoading(false); // Ensure loading state is set to false in case of an error
        }
    };


    const scrollLeft = () => {
        if (categoryListRef.current) {
            categoryListRef.current.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (categoryListRef.current) {
            categoryListRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        getListings();
    }, [selectedCategory]);


    return (
        <div id='listings' className=''>
            <div className="relative mx-32 mb-14">
                <button
                    className="absolute -left-16 top-[40%] transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-200"
                    onClick={scrollLeft}
                >
                    <IoIosArrowBack size={24} />
                </button>
                <div
                    ref={categoryListRef}
                    className="category-list flex gap-6 justify-start flex-nowrap overflow-x-auto pb-3"
                >
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedCategory(item.label)}
                            className={`category category-card shadow-lg p-6 flex flex-col text-center bg-white gap-2 items-center justify-center w-fit h-20 text-nowrap hover:bg-gray-100 hover:cursor-pointer rounded-xl ${selectedCategory === item.label ? "text-orange-500 border-b-4 border-orange-500" : "text-slate-800"}`}
                        >
                            <div>{React.cloneElement(item.icon, { size: 30 })}</div>
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="absolute -right-16 top-[40%] transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-200"
                    onClick={scrollRight}
                >
                    <IoIosArrowForward size={24} />
                </button>
            </div>



            {loading ? (
                <div className="flex justify-center ">
                    <InfinitySpin width="200" color="aqua" ariaLabel="infinity-spin-loading" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 mx-20">
                    {listings.length > 0 ? (
                        listings.map((listing, index) => (
                            <ListingCard listing={listing} key={index} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-2xl text-gray-500">No listings found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Listings;
