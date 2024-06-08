import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'


const BookingCard = ({ booking }) => {

    console.log(booking);
    return (
        <Link to={`/listing/${booking.listingId._id}`} className='p-4 shadow-lg rounded-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl'>
            <div className=''>
                <Carousel data={booking.listingId.photos} />
            </div>
            <div className='mt-4'>
                <h3 className='text-xl font-semibold'>{booking.listingId.title}</h3>
                <div className='text-gray-600 mt-2'>
                    <span>{booking.listingId.city}, </span>
                    <span>{booking.listingId.state}, </span>
                    <span>{booking.listingId.country}</span>
                </div>
                <p className='mt-2 text-gray-500'>{booking.listingId.type}</p>
                <p className='mt-2 font-bold'>{booking.startDate} - {booking.endDate}</p>
                <p className='mt-2 text-lg font-bold'>₹ {booking.totalPrice} <span className='text-sm font-normal'>total</span></p>
            </div>
        </Link>
    )
}

export default BookingCard