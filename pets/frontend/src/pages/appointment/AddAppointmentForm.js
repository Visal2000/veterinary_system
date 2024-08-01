/*// src/components/AddAppointmentForm.js
import React, { useState } from 'react';
import './AddAppointmentForm.css';

const AddAppointmentForm = () => {
  const [petId, setPetId] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log({ petId, name, reason, doctor, date, time });
  };

  return (
    <div className="form-container">
      <form className="add-appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="petId">Pet ID:</label>
          <input type="text" id="petId" value={petId} onChange={(e) => setPetId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <input type="text" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="doctor">Doctor:</label>
          <input type="text" id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default AddAppointmentForm;*/


import React, { useState, useEffect } from 'react';
import './AddAppointmentForm.css';
import axios from 'axios';

const AddAppointmentForm = () => {
  const [petId, setPetId] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');s
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log({ petId, name, reason, doctor, date, time });
  };

  return (
    <div className="form-container">
      <form className="add-appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="petId">Pet ID:</label>
          <input type="text" id="petId" value={petId} onChange={(e) => setPetId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <input type="text" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="doctor">Doctor:</label>
          <input type="text" id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default AddAppointmentForm;
