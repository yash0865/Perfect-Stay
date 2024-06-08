import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gray-100 pt-14">
            <div className="bg-orange-500 flex items-center text-white h-60 w-2/3 mx-auto mb-14 px-14 rounded-md">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold">Contact us, we will reach you</h2>
                    <div className="mt-6 flex gap-6 items-center justify-center">
                        <input
                            type="email"
                            placeholder="Enter your mail"
                            className="p-2  w-1/2 text-black rounded-md"
                        />
                        <button className="bg-white rounded-md text-black py-2 px-3">Sent</button>
                    </div>
                </div>
            </div>
            <footer className="container mx-auto py-8">
                <div className="flex justify-between">
                    <div className="text-left">
                        <h3 className="text-xl font-bold">Perfect Stay</h3>
                        <p className="mt-2">Book your trip in minute, get full Control for much longer.</p>
                        <div className="flex mt-4 space-x-4">
                            <a href="#" className="text-gray-600 bg-white rounded-full py-2 px-3 hover:bg-orange-500 hover:text-white"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="text-gray-600 bg-white rounded-full py-2 px-3 hover:bg-orange-500 hover:text-white"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-600 bg-white rounded-full py-2 px-3 hover:bg-orange-500 hover:text-white"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold">Company</h4>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-gray-600">About</a></li>
                            <li><a href="#" className="text-gray-600">Careers</a></li>
                            <li><a href="#" className="text-gray-600">Logistic</a></li>
                            <li><a href="#" className="text-gray-600">Privacy & Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold">Contact</h4>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-gray-600">Help/FAQ</a></li>
                            <li><a href="#" className="text-gray-600">Press</a></li>
                            <li><a href="#" className="text-gray-600">Affiliates</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold">More</h4>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-gray-600">Press Centre</a></li>
                            <li><a href="#" className="text-gray-600">Our Blog</a></li>
                            <li><a href="#" className="text-gray-600">Low fare tips</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-8 border-t pt-4">
                    <p className="text-gray-500">&copy; 2024 Hotel Finder. All rights reserved.</p>
                    <a href="#" className="text-gray-600">Terms & Conditions</a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
