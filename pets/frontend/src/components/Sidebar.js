import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import logo from './Pet Care Clinic Logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt='./Pet Care Clinic Logo.png' className='logo' />
      <ul>
      
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/PetList">Pets</Link></li>
        <li><Link to="/DocList">Doctors</Link></li>
        <li><Link to="/AppointmentList">Appointments</Link></li>
        <li><Link to="/NoticeBoard">Notice Board</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
