import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import BookingCard from '../components/BookingCard';

const PropertyList = () => {
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState(null)
    const userId = useSelector((state) => state.user._id)

    const getProperties = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/properties`, {
                method: "GET"
            })

            const data = await response.json()

            setProperties(data)
            setLoading(false)

        } catch (err) {
            console.log("Getting properties failed", err.message)
        }
    }

    useEffect(() => {
        getProperties()
    }, [])

    console.log(properties);


    return (
        <>
            <Navbar />
            {loading ? (
                <div className='flex justify-center items-center h-[90vh]'>
                    <InfinitySpin color='aqua' />
                </div>
            ) : (
                <div className='mx-20 my-6'>
                    <h1 className='text-3xl font-semibold mb-4'>Your Properties</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 mx-20'>
                        {properties.map((item, idx) => (
                            <BookingCard booking={item} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default PropertyList