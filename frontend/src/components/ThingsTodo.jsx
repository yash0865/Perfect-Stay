import React from 'react';
import { FaUserCheck, FaMoneyCheckAlt, FaHotel } from 'react-icons/fa'; // Assuming you use react-icons for icons

const ThingsTodo = () => {
    return (
        <div className="flex flex-col items-center py-12 h-[90vh] bg-gray-100 mx-20 px-10 justify-center mb-16">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Things you need <span className="text-orange-500">to do</span></h2>
                <p className="text-lg text-gray-500 mt-2">We ensure that you’ll embark on a perfectly planned, safe vacation at a price you can afford.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-10 ">
                <div className="bg-white px-6 py-8 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-orange-500 text-4xl mb-4">
                        <FaUserCheck />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center">Sign Up</h3>
                    <p className="text-gray-500 text-center">Completes all the work associated with planning and processing.</p>
                </div>
                <div className="bg-white px-6 py-8 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-blue-500 text-4xl mb-4">
                        <FaMoneyCheckAlt />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center">Worth of Money</h3>
                    <p className="text-gray-500 text-center">After successful access then book from exclusive deals & pricing.</p>
                </div>
                <div className="bg-white px-6 py-8 rounded-lg shadow-md">
                    <div className="flex items-center justify-center text-yellow-500 text-4xl mb-4">
                        <FaHotel />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center">Hotel Booking</h3>
                    <p className="text-gray-500 text-center">Start and explore a wide range of exciting hotel options for your stay.</p>
                </div>
            </div>
        </div>
    );
}

export default ThingsTodo;
