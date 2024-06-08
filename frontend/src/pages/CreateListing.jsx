import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { categories, facilities, types } from '../data';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import PhotosUploader from '../components/PlaceGallery';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
    const creator = useSelector((state) => state.user._id)
    const navigate = useNavigate()
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [location, setLocation] = useState({
        streetAddress: '',
        apartment: '',
        city: '',
        state: '',
        country: '',
    });
    const [formDescription, setFormDescription] = useState({
        title: '',
        description: '',
        highlight: '',
        price: 0,
    });
    const [guestCount, setGuestCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const handleChangeLocation = (e) => {
        const { name, value } = e.target;
        setLocation((prevLocation) => ({ ...prevLocation, [name]: value }));
    };

    const handleChangeFormDescription = (e) => {
        const { name, value } = e.target;
        setFormDescription((prev) => ({ ...prev, [name]: value }));
    };

    const updateCount = (name, action) => {
        const updateState = (setter, currentCount) => {
            if (action === 'increment') {
                setter(currentCount + 1);
            } else if (action === 'decrement') {
                setter(currentCount > 1 ? currentCount - 1 : 1);
            }
        };

        switch (name) {
            case 'guestCount':
                updateState(setGuestCount, guestCount);
                break;
            case 'bedCount':
                updateState(setBedCount, bedCount);
                break;
            case 'bedroomCount':
                updateState(setBedroomCount, bedroomCount);
                break;
            case 'bathroomCount':
                updateState(setBathroomCount, bathroomCount);
                break;
            default:
                break;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            creator,
            category,
            type,
            ...location,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            photos,
            ...formDescription,
        };

        try {
            const response = await fetch("http://localhost:3000/listing/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                navigate("/");
            } else {
                throw new Error('Failed to create listing');
            }
        } catch (err) {
            console.log(err);
            alert("Publish listing failed");
        }
    };
    return (
        <>
            <Navbar />
            <div className="bg-gray-200 px-14 py-8">
                <form action="" onSubmit={handleFormSubmit} className="">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-16">
                        <h2 className="text-orange-500 text-2xl mb-4 font-bold">
                            Step 1: Tell us about your place
                        </h2>
                        <hr />
                        <h3 className="my-6 text-lg font-semibold">
                            Which of these categories best describes your place?
                        </h3>
                        <div className="flex gap-6 justify-center flex-wrap">
                            {categories?.slice(1).map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCategory(item.label)}
                                    className={`category-card shadow-lg p-6 flex flex-col items-center justify-center w-36 h-36 hover:bg-gray-100 hover:cursor-pointer rounded-xl ${category === item.label ? 'border-2 border-orange-500' : ' text-gray-800'
                                        }`}
                                >
                                    {React.cloneElement(item.icon, { size: 30 })}
                                    <h2 className="mt-3 text-center text-sm font-semibold">
                                        {item.label}
                                    </h2>
                                </div>
                            ))}
                        </div>

                        <h3 className="mt-14 mb-6 text-lg font-semibold">
                            What type of place will guests have?
                        </h3>
                        <div className="flex flex-col gap-4 justify-center mx-14">
                            {types?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setType(item.name)}
                                    className={`type-card shadow-md py-4 px-10 flex items-center justify-between w-full md:w-[50%] hover:bg-gray-100 hover:cursor-pointer rounded-lg ${type === item.name ? 'border-2 border-orange-500' : ' text-gray-800'
                                        }`}
                                >
                                    <div>
                                        <h2 className="font-bold text-base">{item.name}</h2>
                                        <h3 className="text-sm text-gray-700">{item.description}</h3>
                                    </div>
                                    <div className="ml-4">
                                        {React.cloneElement(item.icon, { size: 30 })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="mt-14 mb-6 text-lg font-semibold">
                            Where's your place located?
                        </h3>
                        <div className="flex flex-col gap-6 mx-16">
                            <InputField
                                label="Street Address"
                                name="streetAddress"
                                value={location.streetAddress}
                                onChange={handleChangeLocation}
                            />
                            <div className="flex justify-between gap-6">
                                <div className="flex flex-col gap-4 w-1/2">
                                    <InputField
                                        label="Apartment, Suite, etc. (if applicable)"
                                        name="apartment"
                                        value={location.apartment}
                                        onChange={handleChangeLocation}
                                    />
                                    <InputField
                                        label="State"
                                        name="state"
                                        value={location.state}
                                        onChange={handleChangeLocation}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 w-1/2">
                                    <InputField
                                        label="City"
                                        name="city"
                                        value={location.city}
                                        onChange={handleChangeLocation}
                                    />
                                    <InputField
                                        label="Country"
                                        name="country"
                                        value={location.country}
                                        onChange={handleChangeLocation}
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className="mt-14 mb-6 text-lg font-semibold">
                            Share some basics about your place
                        </h3>
                        <div className="flex flex-wrap gap-10 mx-16 justify-center">
                            <Counter
                                label="Guests"
                                count={guestCount}
                                onDecrement={() => updateCount('guestCount', 'decrement')}
                                onIncrement={() => updateCount('guestCount', 'increment')}
                            />
                            <Counter
                                label="Bedrooms"
                                count={bedroomCount}
                                onDecrement={() => updateCount('bedroomCount', 'decrement')}
                                onIncrement={() => updateCount('bedroomCount', 'increment')}
                            />
                            <Counter
                                label="Beds"
                                count={bedCount}
                                onDecrement={() => updateCount('bedCount', 'decrement')}
                                onIncrement={() => updateCount('bedCount', 'increment')}
                            />
                            <Counter
                                label="Bathrooms"
                                count={bathroomCount}
                                onDecrement={() => updateCount('bathroomCount', 'decrement')}
                                onIncrement={() => updateCount('bathroomCount', 'increment')}
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
                        <h2 className="text-orange-500 text-2xl mb-4 font-bold">
                            Step 2: Make your place stand out
                        </h2>
                        <hr />
                        <h3 className="my-6 text-lg font-semibold">
                            Tell guests what your place has to offer
                        </h3>
                        <div className="flex gap-6 justify-center flex-wrap">
                            {facilities?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        setAmenities((prev) => [...prev, item.name])
                                    }
                                    className={`category-card shadow-md p-4 flex flex-col items-center justify-center w-32 h-32 hover:bg-gray-100 hover:cursor-pointer rounded-lg ${amenities.includes(item.name)
                                        ? 'border-2 border-orange-500'
                                        : ' text-gray-800'
                                        }`}
                                >
                                    {React.cloneElement(item.icon, { size: 30 })}
                                    <h2 className="mt-2 text-center text-sm font-medium">
                                        {item.name}
                                    </h2>
                                </div>
                            ))}
                        </div>

                        <h3 className="my-6 text-lg font-semibold">
                            Add some photos of your place
                        </h3>
                        <PhotosUploader photos={photos} setPhotos={setPhotos} />

                        <h3 className="my-6 text-lg font-semibold">
                            What makes your place attractive and exciting?
                        </h3>
                        <div className="flex flex-col gap-4 mx-16">
                            <InputField
                                label="Title"
                                name="title"
                                value={formDescription.title}
                                onChange={handleChangeFormDescription}
                            />
                            <InputField
                                label="Description"
                                name="description"
                                value={formDescription.description}
                                onChange={handleChangeFormDescription}
                            />
                            <InputField
                                label="Highlight"
                                name="highlight"
                                value={formDescription.highlight}
                                onChange={handleChangeFormDescription}
                            />
                            <InputField
                                label="Now, set your price"
                                type="number"
                                name="price"
                                value={formDescription.price}
                                onChange={handleChangeFormDescription}
                                min={0}
                            />
                        </div>
                    </div>

                    <button className="bg-orange-500 px-6 py-3 rounded-md text-xl text-white">
                        Create your listing
                    </button>
                </form>
            </div>
        </>
    );
};

const InputField = ({ label, ...props }) => (
    <div>
        <label className="font-bold mb-2 block">{label}</label>
        <input
            className="w-full rounded-md border outline-none px-6 py-3 text-left"
            {...props}
        />
    </div>
);

const Counter = ({ label, count, onDecrement, onIncrement }) => (
    <div className="flex flex-col items-center justify-center shadow-md rounded-md py-3 px-5 w-40">
        <h2 className="text-lg font-medium mb-2">{label}</h2>
        <div className="flex gap-3 items-center">
            <IoRemoveCircleOutline
                onClick={onDecrement}
                size={25}
                cursor="pointer"
                className="hover:text-orange-500 transition-colors"
            />
            <p>{count}</p>
            <IoAddCircleOutline
                onClick={onIncrement}
                size={25}
                cursor="pointer"
                className="hover:text-orange-500 transition-colors"
            />
        </div>
    </div>
);

export default CreateListing;
