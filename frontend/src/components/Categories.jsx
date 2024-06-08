import React from 'react'
import { FaRegSnowflake } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { categories } from '../data';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <div className='flex flex-col gap-8 justify-center mx-10 mt-6 '>
            <div className='text-center text-4xl font-semibold'>Explore Top Categories</div>
            <p className='text-xl mx-24 text-center'>
                Explore our wide range of vacation rentals that cater to all types of
                travelers. Immerse yourself in the local culture, enjoy the comforts of
                home, and create unforgettable memories in your dream destination.
            </p>
            <div className="flex justify-center flex-wrap gap-16 mx-20 mb-20">
                {categories?.slice(1, 7).map((item, index) => (
                    <Link to={`/listing/category/${item.label}`}
                        key={index}
                        className="relative grid h-[18rem] w-full max-w-[20rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white text-center text-gray-700 group"
                    >
                        <div
                            className="absolute inset-0 h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.img})` }}
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 group-hover:from-black/90 group-hover:via-black/70 transition-all duration-300"></div>
                        </div>
                        <div className="relative p-6 py-14 md:px-12 flex flex-col gap-4 items-center justify-center">
                            <div className='text-white'> {React.cloneElement(item.icon, { size: 50 })}</div>
                            <h2 className="mb-6 text-xl font-medium leading-[1.5] text-white">
                                {item.description}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    )
}

export default Categories