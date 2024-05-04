import "./profile.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Profile = () => {
    const [BookingDetails, setBookingDetails] = useState(null);
    const [CarDetails, setCarDetails] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.post('http://localhost:3002/bookingDetails', { email: email });
                setBookingDetails(response.data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, [email]);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                if (BookingDetails && BookingDetails.length > 0) {
                    const bookedcarDetailsPromises = BookingDetails.map(async (booking) => {
                        const response = await axios.post('http://localhost:3002/bookedcarDetails', { carID: booking.carID });
                        return response.data;
                    });
                    const bookedcarDetails = await Promise.all(bookedcarDetailsPromises);
                    setCarDetails(bookedcarDetails);
                }
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [BookingDetails]);

    const handleLogout = () => {
        // Set isLoggedIn status in local storage to false
        localStorage.setItem('isLoggedIn', 'false');
        // Navigate to /home
        window.location.href = '/home';
    };
    

    const handleConfirmBooking = () => {
        
        setShowConfirmation(false);
        handleLogout();
    };
    return (
        <div className="profile_main">
            <div className="car_rented">
                <h2 style={{textDecoration:"underline"}}>Booked Cars</h2>
                {CarDetails.length > 0 ? (
                    <div className="zero">
                        {CarDetails.map((car, index) => (
                            <div key={index} className="bookingcarDetail">
                            
                                <img
                                    // style={styles.img}
                                    src={`http://localhost:3002/${car.imageUrl}`}
                                         alt={`Image of ${car.brand}`}
                                       />
                                <p>Brand: {car.brand}</p>
                                <p>Price: {car.price}/day</p>
                                
                                </div>
                                
                           
                        ))}
                    </div>
                ) : (
                    <p>No cars yet</p>
                )}
            </div>

            <div className="logout">
                <h2 style={{textDecoration:"underline"}}>Do you want to logout?</h2>
                <button onClick={() => setShowConfirmation(true)} className='logout_submit'>Logout</button>

                {showConfirmation && (
                <div className="logout_confirmation_popup">
                    <p>Are you sure you want to Logout?</p>
                    <div className='logout_option'>
                    <button onClick={(e) => handleConfirmBooking(e)} style={{width:"100px"}}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)} style={{width:"100px"}}>No</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default Profile;