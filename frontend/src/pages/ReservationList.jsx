import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ListingCard from '../components/ListingCard'
import BookingCard from '../components/BookingCard';

const ReservationList = () => {
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState(null)
    const userId = useSelector((state) => state.user._id)

    const getReservations = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/bookings`, {
                method: "GET"
            })

            const data = await response.json()

            setReservations(data)
            setLoading(false)

        } catch (err) {
            console.log("Getting bookings failed", err.message)
        }
    }

    useEffect(() => {
        getReservations()
    }, [])

    console.log(reservations);


    return (
        <>
            <Navbar />
            {loading ? (
                <div className='flex justify-center items-center h-[90vh]'>
                    <InfinitySpin color='aqua' />
                </div>
            ) : (
                <div className='mx-20 my-6'>
                    <h1 className='text-3xl font-semibold mb-4'>Your Reservations</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 mx-20'>
                        {reservations.map((item, idx) => (
                            <BookingCard booking={item} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default ReservationList