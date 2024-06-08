import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setListings } from '../redux/state'
import { InfinitySpin } from 'react-loader-spinner'
import ListingCard from '../components/ListingCard'
import Navbar from '../components/Navbar'

const SearchPage = () => {
    const [loading, setLoading] = useState(true)
    const { search } = useParams()
    const listings = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    const getSearchListings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/listing/search/${search}`, { method: "GET" })
            const data = await response.json()
            dispatch(setListings({ listings: data }))
            setLoading(false)
        } catch (err) {
            console.log("Fetching search list failed");
            setLoading(false)
        }
    }

    useEffect(() => {
        getSearchListings()
    }, [search])

    return loading ? <div className='flex justify-center items-center h-screen'><InfinitySpin color='aqua' /></div> : (
        <>
            <Navbar />
            <div className='mx-20'>
                <h1 className='text-3xl mt-6 font-semibold mb-4'>{search} listings</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 '>
                    {listings?.map((listing, idx) => (
                        <ListingCard key={idx} listing={listing} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchPage