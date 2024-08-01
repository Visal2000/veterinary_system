// src/components/AddDoctorForm.js
/*import React, { useState, useEffect } from 'react';
import './AddDoctorForm.css';

const generateShortId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const AddDoctorForm = () => {
  const [docName, setDocName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    setRegistrationDate(new Date().toLocaleString());
    setDocId(generateShortId(8)); // Generates an 8-character long ID
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      docName,
      birthday,
      address,
      registrationDate,
      docId,
    });
    // Add code here to handle form submission (e.g., send data to an API)
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h2>Add Doctor</h2>
      <label>
        Doctor Name:
        <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} required />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        Registration Date:
        <input type="text" value={registrationDate} readOnly className="readonly-field" />
      </label>
      <label>
        Doctor ID:
        <input type="text" value={docId} readOnly className="readonly-field" />
      </label>
      <button type="submit">Add Doctor</button>
    </form>
  );
};

export default AddDoctorForm;*/




import React, { useState, useEffect } from 'react';
import './AddDoctorForm.css';
import axios from 'axios';

const generateShortId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const AddDoctorForm = () => {
  const [docName, setDocName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    setRegistrationDate(new Date().toLocaleString());
    setDocId(generateShortId(6)); // Generates a 6-character long ID
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const response = await axios.post('http://localhost:5000/add-doctor', {
        docName,
        birthday,
        address,
        registrationDate,
        docId,
      });
      console.log(response.data);
      alert('Doctor added successfully');
    } catch (error) {
      console.error('There was an error adding the doctor:', error);
      alert('Failed to add pet');
    }
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h2>Add Doctor</h2>
      <label>
        Doctor Name:
        <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} required />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        Registration Date:
        <input type="text" value={registrationDate} readOnly className="readonly-field" />
      </label>
      <label>
        Doctor ID:
        <input type="text" value={docId} readOnly className="readonly-field" />
      </label>
      <button type="submit">Add Doctor</button>
    </form>
  );
};

export default AddDoctorForm;
