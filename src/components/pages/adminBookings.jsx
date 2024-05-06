import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/bookings.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    bookingID: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
  });

  // Function to fetch bookings from the backend
  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/bookings`);
      if (Array.isArray(response.data)) {
        setBookings(response.data); // Update state with fetched bookings
      } else {
        console.error('Invalid bookings data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []); // Dependency array to execute useEffect only on component mount

  // Function to handle opening the update modal
  const handleOpenUpdateModal = (booking) => {
    setUpdateData({
      bookingID: booking._id,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      pickupDate: new Date(booking.pickupDate).toISOString().slice(0, 16), // Format for datetime-local input
      dropoffDate: new Date(booking.dropoffDate).toISOString().slice(0, 16), // Format for datetime-local input
    });
    setShowUpdateModal(true);
  };

  // Function to update booking details
  const handleUpdateBooking = async () => {
    try {
      const { bookingID, ...updatedFields } = updateData;
      await axios.put(`http://localhost:3001/bookings/${bookingID}`, updatedFields);
      fetchBookings(); // Refresh bookings data after update
      setShowUpdateModal(false); // Hide the modal
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  // Function to handle marking a booking as completed
  const handleMarkAsCompleted = async (bookingID) => {
    try {
      await axios.put(`http://localhost:3001/bookings/${bookingID}/complete`);
      fetchBookings(); // Refresh bookings data after update
    } catch (error) {
      console.error('Error marking booking as completed:', error);
    }
  };

  // Function to handle deleting a booking
  const handleDeleteBooking = async (bookingID) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${bookingID}`);
      fetchBookings(); // Refresh bookings data after deletion
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="admin-bookings">
      <h2>Admin Bookings Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Pickup Date & Time</th>
            <th>Dropoff Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.email}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.dropoffLocation}</td>
              <td>{new Date(booking.pickupDate).toLocaleString()}</td>
              <td>{new Date(booking.dropoffDate).toLocaleString()}</td>
              <td>{booking.status}</td>
              <td className="actions-container">
                {booking.status === 'active' && (
                  <button onClick={() => handleOpenUpdateModal(booking)}>
                    Update
                  </button>
                )}
                {booking.status === 'active' && (
                  <button onClick={() => handleMarkAsCompleted(booking._id)}>
                    Mark as Complete
                  </button>
                )}
                <button onClick={() => handleDeleteBooking(booking._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Booking Modal */}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Booking</h2>
            <label>
              Pickup Date & Time:
              <input
                type="datetime-local"
                value={updateData.pickupDate}
                onChange={(e) =>
                  setUpdateData({ ...updateData, pickupDate: e.target.value })
                }
              />
            </label>
            <label>
              Dropoff Date & Time:
              <input
                type="datetime-local"
                value={updateData.dropoffDate}
                onChange={(e) =>
                  setUpdateData({ ...updateData, dropoffDate: e.target.value })
                }
              />
            </label>
            <button onClick={handleUpdateBooking}>Save Changes</button>
            <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
