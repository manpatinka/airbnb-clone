import { useState } from 'react';
import { Navigate } from "react-router-dom";
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';
import axios from 'axios';

export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

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

    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('/places',{
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests 
        } );
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
        <AccountNav />
                    <form onSubmit={addNewPlace}>
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
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
    )
}