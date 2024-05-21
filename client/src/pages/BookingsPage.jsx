import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from 'axios';
import PlaceImg from "../PlaceImg";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        });
    }, [])
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <div className="flex gap-4">
                    <div className="w-48">
                      <PlaceImg place={booking.place} />
                    </div>
                        {booking.checkIn} - {booking.checkOut}
                    </div>
                )
                )}
            </div>
        </div>
    )
}