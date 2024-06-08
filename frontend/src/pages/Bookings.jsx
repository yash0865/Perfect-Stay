import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ListingCard from '../components/ListingCard'
import BookingCard from '../components/BookingCard';
import { setBookings } from '../redux/state';

const Bookings = () => {
    const [loading, setLoading] = useState(true);
    const bookings = useSelector((state) => state.user.bookings)
    const userId = useSelector((state) => state.user._id)
    const dispatch = useDispatch()

    const getBookings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/bookings`, {
                method: "GET"
            })

            const data = await response.json()

            dispatch(
                setBookings(data)
            )
            setLoading(false)

        } catch (err) {
            console.log("Getting bookings failed", err.message)
        }
    }

    useEffect(() => {
        getBookings()
    }, [])

    return (
        <>
            <Navbar />
            {loading ? (
                <div className='flex justify-center items-center h-[90vh]'>
                    <InfinitySpin color='aqua' />
                </div>
            ) : (
                <div className='mx-20 my-6'>
                    <h1 className='text-3xl font-semibold mb-4'>Your bookings</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 mx-20'>
                        {bookings.map((item, idx) => (
                            <BookingCard key={idx} booking={item} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Bookings