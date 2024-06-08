import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setListings } from '../redux/state'
import ListingCard from '../components/ListingCard'


const CategoryPage = () => {
    const [loading, setLoading] = useState(true)
    const { category } = useParams()
    const listings = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    const getListings = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/listing?category=${category}`,
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

    useEffect(() => {
        getListings()
    }, [category])

    return loading ? <div className='flex justify-center items-center h-screen'><InfinitySpin color='aqua' /></div> :
        (
            <>
                <Navbar />
                <div className='mx-20'>
                    <h1 className='text-3xl mt-6 font-semibold mb-4'>{category} Listings</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 '>
                        {listings?.map((listing, idx) => (
                            <ListingCard key={idx} listing={listing} />
                        ))}
                    </div>
                </div>
            </>
        )
}

export default CategoryPage