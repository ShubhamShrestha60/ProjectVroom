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

  return (
    <div className='Notification'>
      <h1>Dashboard</h1>
      <div>
        <h2>Notifications</h2>
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
