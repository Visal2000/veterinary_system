import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("Notification component loaded!"); // Debug message

    // Fetch notifications
    axios.get('http://localhost:5000/check-anniversary')
      .then(response => {
        console.log("Notification response:", response.data); // Debug message
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <div className="notifications">
      <h3>Notifications</h3>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications at this time.</p>
      )}
      <p>Page is running! You should see notifications here.</p> {/* Debug message */}
    </div>
  );
};

export default Notification;
