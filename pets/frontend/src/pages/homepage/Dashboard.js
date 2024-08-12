/*import React, { useState, useEffect } from 'react';
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

export default Dashboard;*/


import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [totalPets, setTotalPets] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    // Fetch total counts
    axios.get('http://localhost:5000/total-pets')
      .then(response => setTotalPets(response.data.count))
      .catch(error => console.error('Error fetching total pets:', error));

    axios.get('http://localhost:5000/total-doctors')
      .then(response => setTotalDoctors(response.data.count))
      .catch(error => console.error('Error fetching total doctors:', error));

    axios.get('http://localhost:5000/total-appointments')
      .then(response => setTotalAppointments(response.data.count))
      .catch(error => console.error('Error fetching total appointments:', error));

    // Fetch recent appointments
    axios.get('http://localhost:5000/appointments')
      .then(response => setRecentAppointments(response.data))
      .catch(error => console.error('Error fetching recent appointments:', error));

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
      <div className="recent-appointments">
        <h2>Recent Appointments</h2>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Pet ID</th>
              <th>Name</th>
              <th>Reason</th>
              <th>Doctor</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentAppointments.length === 0 ? (
              <tr>
                <td colSpan="6">No recent appointments</td>
              </tr>
            ) : (
              recentAppointments.map(app => (
                <tr key={app.appId}>
                  <td>{app.appId}</td>
                  <td>{app.petId}</td>
                  <td>{app.name}</td>
                  <td>{app.reason}</td>
                  <td>{app.doctor}</td>
                  <td>{app.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

