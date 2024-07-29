// src/App.js
import React from 'react';
import Dashboard from './pages/homepage/Dashboard';
import PetList from './pages/pet/PetList';
import Sidebar from './components/Sidebar';
import AddPetForm from './pages/pet/AddPetForm';
import AddAppointmentForm from './pages/appointment/AddAppointmentForm';
import AddDoctorForm from './pages/doctor/AddDoctorForm';
import DocList from './pages/doctor/DocList';
import DoctorProfile from './pages/doctor/DoctorProfile';
import PetProfile from './pages/pet/PetProfile';
import AppointmentList from './pages/appointment/AppointmentList';
import NoticeBoard from './pages/noticeboard/NoticeBoard';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';




const App = () => {
  return (
    
    
    <Router>
      <div className="App">
      <Sidebar />
      </div>
        <Routes>
        
          <Route path="/" element={<Dashboard />} />``
          <Route path="/PetList" element={<PetList/>} />
          <Route path="/AddPetForm" element={<AddPetForm/>} />
          <Route path="/AddAppointmentForm" element={<AddAppointmentForm/>} />
          <Route path="/DocList" element={<DocList/>} />
          <Route path="/AddDoctorForm" element={<AddDoctorForm/>} />
          <Route path="/DoctorProfile" element={<DoctorProfile/>} />
          <Route path="/PetProfile" element={<PetProfile/>} />
          <Route path="/AppointmentList" element={<AppointmentList/>} />
          <Route path="/NoticeBoard" element={<NoticeBoard/>} />

        </Routes>
        
    
  </Router>
  
  );
};

export default App;
