import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [totalPets, setTotalPets] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    // Fetch total pets count
    axios.get('http://localhost:5000/total-pets')
      .then(response => setTotalPets(response.data.count))
      .catch(error => console.error('Error fetching total pets:', error));

    // Fetch total doctors count
    axios.get('http://localhost:5000/total-doctors')
      .then(response => setTotalDoctors(response.data.count))
      .catch(error => console.error('Error fetching total doctors:', error));

    // Fetch total appointments count
    axios.get('http://localhost:5000/total-appointments')
      .then(response => setTotalAppointments(response.data.count))
      .catch(error => console.error('Error fetching total appointments:', error));
  }, []);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="notification-icon">
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
      <div className="metrics">
        <div className="metric">Total Pets: {totalPets}</div>
        <div className="metric">Total Doctors: {totalDoctors}</div>
        <div className="metric">Appointments: {totalAppointments}</div>
      </div>
    </div>
  );
};

export default Dashboard;
