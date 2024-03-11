import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return <h2 className='text-2xl mt-4'>{text}</h2>
    }

    function inputDescription(text) {
        return <p className='text-gray-500 text-sm'>{text}</p>
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, filename];
        })
        setPhotoLink('');
    }

    console.log(action);
    return (
        <div>
            {action !== 'new' && (
                <div className='text-center'>
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place. Should be short and catchy as in advertisement')}
                        <input
                            type="text"
                            placeholder='title, for example: My lovely apartment'
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                        {preInput('Address', 'Address to this place')}
                        <input
                            type="text"
                            placeholder='address'
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
                        {preInput('Photos', 'More = better')}
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                placeholder='Add using link ....jpeg'
                                value={photoLink}
                                onChange={e => setPhotoLink(e.target.value)} />
                            <button
                                onClick={addPhotoByLink}
                                className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                        </div>
                        <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                  <img src={'http://localhost:4000/uploads/'+link} alt="" />
                                </div>
                            ))}
                            <button className='flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                </svg>
                                Upload</button>
                        </div>
                        {preInput('Description', 'Describe the place in a few sentences')}
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        {preInput('Perks', 'Select all the perks of your place')}
                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra info', 'House rules, etc')}
                        <textarea
                            value={extraInfo}
                            onChange={e => setExtraInfo(e.target.value)} />
                        {preInput('Check in and out times', 'Choose check in and out times, remember to save time between guests for cleaning')}
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input
                                    type="text"
                                    placeholder='14'
                                    value={checkIn}
                                    onChange={e => setCheckIn(e.target.value)} />
                            </div>
                            <div>
                                <h3>Check out time</h3>
                                <input
                                    type="text"
                                    placeholder='12'
                                    value={checkOut}
                                    onChange={e => setCheckOut(e.target.value)} />
                            </div>
                            <div>
                                <h3>Max number of guests</h3>
                                <input
                                    type="number"
                                    placeholder='3'
                                    value={maxGuests}
                                    onChange={e => setMaxGuests(e.target.value)} />
                            </div>
                        </div>
                        <button className='primary my-4'>Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}