import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Notification.css"

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:3002/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  const deleteAllNotifications = async () => {
    const confirmed = window.confirm('Are you sure you want to delete all notifications?');
    if (confirmed) {
      try {
        await axios.delete('http://localhost:3002/notifications');
        setNotifications([]); // Clear notifications from state after successful deletion
      } catch (error) {
        console.error('Error deleting notifications:', error);
      }
    }
  };

  return (
    <div className='Notification'>
      <h1>Dashboard</h1>
      <div>
        <h2>Notifications</h2>
        <button onClick={deleteAllNotifications} className="delete-button">Delete All Notifications</button>
        <ul>
          {notifications.map(notification => (
            <li key={notification._id}>{notification.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
