import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '/assets/logo.jpg';
import { setLogout } from '../redux/state';

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const showDropdown = () => {
        setDropdown(!dropdown);
    };

    const logout = () => {
        dispatch(setLogout());
    };

    const navigateToCreateListing = () => {
        if (!user) {
            alert("Please login first")
        } else {
            navigate("/create-listing")

        }
    }

    return (
        <div className="relative bg-white shadow-lg">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center  py-4">
                <Link to={"/"} className="flex items-center gap-3">
                    {/* <img src={Icon} alt="Logo"  /> */}
                    <img className="w-12 h-12 p-2 rounded-full shadow-md" src="https://img.icons8.com/sf-black-filled/64/FD7E14/booking.png" alt="booking" />
                    <span className="text-2xl font-semibold text-gray-800">Perfect Stay</span>
                </Link>
                <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">


                    <div className="search-box flex items-center gap-2 border-2 border-gray-200 rounded-full px-4 py-2 bg-gray-100 shadow-inner">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="text-center bg-transparent outline-none w-full"
                            placeholder="Search..."
                        />
                        <button disabled={search === ""} onClick={() => navigate(`/listing/search/${search}`)}>
                            <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
                        </button>
                    </div>
                    <button onClick={navigateToCreateListing} className="text-lg bg-orange-500 rounded-full text-white px-4 py-2">
                        Become a host
                    </button>
                    <div
                        className="flex items-center gap-2 py-2 px-3 border border-gray-300 rounded-full shadow-sm cursor-pointer bg-white hover:bg-gray-100 transition duration-300"
                        onClick={showDropdown}
                    >
                        <i className="fa-solid fa-bars text-gray-600"></i>
                        {user && user.profileImg ? (
                            <div className='flex gap-2 items-center'>
                                <img src={user.profileImg} alt="User Profile" className="w-8 h-8 rounded-full" /> <span>{user.firstName}</span>
                            </div>
                        ) : (
                            <i className="fa-solid fa-user-circle text-gray-600 text-xl"></i>
                        )}
                    </div>
                </div>
            </div>
            {dropdown && (
                <div className="absolute z-10 top-full mt-2 w-full md:w-48 bg-white border border-gray-300 rounded-md shadow-lg md:right-5 right-1/2 transform md:translate-x-0 translate-x-1/2">
                    {user ? (
                        <div className="flex flex-col p-2">
                            <Link to={`${user._id}/bookings`} className="py-2 px-4 hover:bg-gray-100 transition duration-200">Bookings</Link>
                            <Link to={`${user._id}/wishList`} className="py-2 px-4 hover:bg-gray-100 transition duration-200">Wish List</Link>
                            <Link to={`${user._id}/properties`} className="py-2 px-4 hover:bg-gray-100 transition duration-200">Property List</Link>
                            <Link to={`${user._id}/reservations`} className="py-2 px-4 hover:bg-gray-100 transition duration-200">Reservation List</Link>
                            <Link to="/create-listing" className="py-2 px-4 hover:bg-gray-100 transition duration-200">Become A Host</Link>
                            <Link to="/login" onClick={logout} className="py-2 px-4 hover:bg-gray-100 transition duration-200">Log out</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col p-2">
                            <Link to="/login" className="py-2 px-4 hover:bg-gray-100 transition duration-200">Login</Link>
                            <Link to="/register" className="py-2 px-4 hover:bg-gray-100 transition duration-200">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
