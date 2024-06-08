import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import ListingCard from '../components/ListingCard'

const WishList = () => {
    const wishList = useSelector((state) => state.user.wishList)

    return (
        <>
            <Navbar />
            <div className='mx-20'>
                <h1 className='text-3xl mt-6 font-semibold mb-4'>Wishlist</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 '>
                    {wishList?.map((listing, idx) => (
                        <ListingCard key={idx} listing={listing} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default WishList