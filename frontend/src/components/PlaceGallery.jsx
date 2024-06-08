import { useState } from "react";

// SVG components for icons
const StarIcon = ({ isFilled }) => (
    isFilled ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
    )
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export default function PhotosUploader({ photos, setPhotos }) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(event) {
        event.preventDefault();
        if (!photoLink.trim()) return;

        if (photos.includes(photoLink)) {
            alert("Image already added");
        } else {
            setPhotos(prev => [...prev, photoLink]);
        }
        setPhotoLink("");
    }

    function removePhoto(link) {
        console.log(`Removing photo: ${link}`);
        setPhotos(prev => {
            const newLinks = prev.filter(photo => photo !== link);
            console.log(`New imageLink state: ${newLinks}`);
            return newLinks;
        });
    }


    function selectAsMainPhoto(event, link) {
        event.preventDefault();
        setImagesLink([link, ...imageLink.filter(photo => photo !== link)]);
    }

    return (
        <div className="mx-16">
            <div className="flex gap-6">
                <input
                    type="text"
                    placeholder="Add using a link..."
                    value={photoLink}
                    onChange={e => setPhotoLink(e.target.value)}
                    className="w-full rounded-md border outline-none px-6 py-3 text-left"
                />
                <button className="bg-gray-300 px-4 rounded-lg" onClick={addPhotoByLink}>
                    Add&nbsp;photo
                </button>
            </div>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {photos.map((link, index) => (
                    <div key={index} className="relative h-32 flex">
                        <img className="rounded-2xl w-full object-cover" src={link} alt={`Photo ${index + 1}`} />
                        <button
                            onClick={() => removePhoto(link)}
                            className="cursor-pointer absolute bottom-2 right-1 text-white bg-black p-2 bg-opacity-50 rounded-full"
                        >
                            <TrashIcon />
                        </button>
                        <button
                            onClick={event => selectAsMainPhoto(event, link)}
                            className="cursor-pointer absolute bottom-2 left-1 text-white bg-black p-2 bg-opacity-50 rounded-full"
                        >
                            <StarIcon isFilled={link === photos[0]} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
