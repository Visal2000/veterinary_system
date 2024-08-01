/*// src/pages/DocList.js
import React, { useState } from 'react';
import AppointmentItem from './AppointmentItem';
import './AppointmentList.css';
import {Link} from 'react-router-dom';

const appsData = [
  { id: 'P001', name: 'Tommy', reason: '2020-01-01', doctor: 'Labrador', date: 'John Doe', time: '11' },
  { id: 'P002', name: 'Max', reason: '2019-02-15', doctor: 'Beagle', date: 'Jane Smith', time: '11' },
  // Add more pets as needed
];

const AppointmentList = () => {
  const [filter, setFilter] = useState('');
  const [filteredApps, setFilteredApps] = useState(appsData);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const newFilteredApps = appsData.filter(app =>
      app.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredApps(newFilteredApps);
  };

  return (
    <div className="pet-list-container">
      <h2>All Appointments</h2>
      <Link to="/AddAppointmentForm" className="add-pet-button">Add Appointment</Link> 
      <input
        type="text"
        placeholder="Search Appointments..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <table className="pet-list-table">
        <thead>
          <tr>
            <th>Pet ID</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map(app => (
            <AppointmentItem key={app.id} app={app} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;*/



// src/pages/appointmentList.js
import React, { useState, useEffect } from 'react';
import AppointmentItem from './AppointmentItem';
import './AppointmentList.css';
import axios from 'axios';
import {Link} from 'react-router-dom';



const AppointmentList = () => {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredApps, setFilteredApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        console.log('Fetched apps:', response.data); // Debug log
        setApps(response.data);
      } catch (error) {
        console.error('Error fetching app:', error);
      }
    };

    fetchApps();
  }, []);

  useEffect(() => {
    const newFilteredApps = apps.filter(app =>
      app.appId.toLowerCase().includes(filter.toLowerCase())
    );
    console.log('Filtered apps:', newFilteredApps); // Debug log
    setFilteredApps(newFilteredApps);
  }, [filter, apps]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="pet-list-container">
      <h2>All Appointments</h2>
      <Link to="/AddAppointmentForm" className="add-pet-button">Add Appointment</Link> 
      <input
        type="text"
        placeholder="Search Appointments..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <table className="pet-list-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Pet ID</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map(app => (
            <AppointmentItem key={app.id} app={app} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
