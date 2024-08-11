/*//src/pages/appointmentlist.js
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
      app.petId.toLowerCase().includes(filter.toLowerCase())
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
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredApps.length === 0 ? (
            <tr>
              <td colSpan="10">No Appointments available</td>
            </tr>
          ) : (
            filteredApps.map(app => (
              <AppointmentItem key={app.appId} app={app} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;*/



import React, { useState, useEffect } from 'react';
import AppointmentItem from './AppointmentItem';
import './AppointmentList.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
  const [apps, setApps] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredApps, setFilteredApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        setApps(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchApps();
  }, []);

  useEffect(() => {
    const newFilteredApps = apps.filter(app =>
      app.petId.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredApps(newFilteredApps);
  }, [filter, apps]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (appId) => {
    setApps(prevApps => prevApps.filter(app => app.appId !== appId));
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.length === 0 ? (
            <tr>
              <td colSpan="10">No Appointments available</td>
            </tr>
          ) : (
            filteredApps.map(app => (
              <AppointmentItem key={app.appId} app={app} onDelete={handleDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
