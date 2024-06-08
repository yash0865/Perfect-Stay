import React from 'react';
import SideImage from '/assets/side_image.png'; // Adjust the path based on your project structure

const Slide = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center h-[90vh] gap-14 px-6 md:px-10 lg:px-20">
            <div className="flex-1 text-center md:text-left md:ml-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Get started your exciting <span className="text-orange-500">journey</span> with us
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-500 mt-4 leading-relaxed">
                    A team of experienced tourism professionals will provide you with the best advice and tips for your desired place.
                </h2>
                <button
                    onClick={() => {
                        document.querySelector('#listings').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-orange-500 border border-orange-500 font-light mt-6 hover:bg-orange-500 hover:text-white px-6 py-3 text-lg md:text-xl transition-colors duration-300"
                >
                    Discover Now
                </button>
            </div>
            <div className="flex-1">
                <img src={SideImage} alt="Side Visual" className="w-full md:ml-12 h-auto max-h-[70vh] object-contain" />
            </div>
        </div>
    );
}

export default Slide;
