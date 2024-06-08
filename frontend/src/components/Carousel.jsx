import React, { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import PropTypes from 'prop-types';

const Carousel = ({ data = [] }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = (e) => {
        e.stopPropagation();
        setSlide((slide + 1) % data.length);
    }

    const prevSlide = (e) => {
        e.stopPropagation();
        setSlide((slide - 1 + data.length) % data.length);
    }

    return (
        <div className='relative flex justify-center items-center w-full h-full'>
            {data.length > 0 && (
                <>
                    <BsArrowLeftCircleFill
                        onClick={prevSlide}
                        className='absolute left-2 text-white text-3xl cursor-pointer hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-1'
                    />

                    {data.map((item, idx) => (
                        <div
                            className={`w-full h-0 pb-[56.25%] relative ${slide === idx ? 'block' : 'hidden'}`}
                            key={idx}
                        >
                            <img
                                src={item}
                                alt={`slide-${idx}`}
                                className='absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out'
                            />
                        </div>
                    ))}

                    <BsArrowRightCircleFill
                        onClick={nextSlide}
                        className='absolute right-2 text-white text-3xl cursor-pointer hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-1'
                    />

                    <div className='absolute bottom-2 flex justify-center items-center gap-2'>
                        {data.map((_, idx) => (
                            <button
                                onClick={() => setSlide(idx)}
                                className={`w-2 h-2 rounded-full transition-transform duration-300 ${slide === idx ? 'bg-white scale-150' : 'bg-gray-500'}`}
                                key={idx}
                            ></button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

Carousel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string)
};

export default Carousel
