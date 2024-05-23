import "./profile.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [BookingDetails, setBookingDetails] = useState(null);
    const [CarDetails, setCarDetails] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [askDeletion, setAskDeletion] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [cancellationMessage, setCancellationMessage] = useState(false);
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
                    const carDetailsPromises = BookingDetails.map(async (booking) => {
                        const response = await axios.post('http://localhost:3002/carDetails', { carID: booking.carID });
                        return { ...response.data, status: booking.status }; // Merge status from booking with car details
                    });
                    const carDetails = await Promise.all(carDetailsPromises);
                    setCarDetails(carDetails.filter(car => car)); // Filter out any potential null values
                }
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [BookingDetails]);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        window.location.href = '/home';
    };
    

    const handleConfirmBooking = () => {
        setShowConfirmation(false);
        handleLogout();
    };


   
    const handleAskDeletion = (bookingID) => {
        setAskDeletion(true);
        setBookingToDelete(bookingID);
    };

    const handleCancelBooking = async () => {
        try {
            const response = await axios.delete(`http://localhost:3002/cancelBooking/${bookingToDelete}`);
            console.log(response.data.message);
            
            // Send cancellation notification to the database
        const cancellationNotification = {
            bookingID: bookingToDelete,
            message: `Booking was cancelled by ${email}.`

        };

        const notificationResponse = await axios.post('http://localhost:3002/sendCancellationNotification', cancellationNotification);
        console.log(notificationResponse.data);

            setAskDeletion(false);
            setCancellationMessage(true);
            
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };


    const handleAcknowledgeCancellation = () => {
        setCancellationMessage(false);
        window.location.reload();
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

                                 {BookingDetails && BookingDetails[index] && (
                                    <div>
                                       <p>Status: {car.status}</p> {/* Display fetched status */}
                                        {car.status === 'pending' && (
                                           <button className="booking_delete" onClick={() => handleAskDeletion(BookingDetails[index].bookingID)}>Cancel Booking</button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No cars yet</p>
                )}
            </div>
              
              
            <div className="user_info">
              

              <h2 style={{textDecoration:"underline"}}>User information</h2>

              <p>FirstName:  {localStorage.getItem('firstName')}</p>
              <p>LastName:  {localStorage.getItem('lastName')}</p>
              <p>Email:  {localStorage.getItem('userEmail')}</p>
              <p>PhoneNumber:  {localStorage.getItem('phoneNumber')}</p>
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
             
                {askDeletion && (
                    <div className="logout_confirmation_popup">
                        <p>Cancel the booking?</p>
                        <div className='logout_option'>
                            <button onClick={handleCancelBooking} style={{ width: "55px" }}>Yes</button>
                            <button onClick={() => setAskDeletion(false)} style={{ width: "55px"}}>No</button>
                        </div>
                    </div>
                )}
               
                {cancellationMessage && (
                    <div className="cancellation_message">
                        <p>Booking has been cancelled</p>
                        <div className='option'>
                            <button onClick={handleAcknowledgeCancellation} style={{ width: "55px" }}>Ok</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
