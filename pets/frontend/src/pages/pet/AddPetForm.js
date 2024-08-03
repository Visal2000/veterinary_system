

/*import React, { useState, useEffect } from 'react';

import './AddPetForm.css';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


const generateShortId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const AddPetForm = () => {
  const [petName, setPetName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [breed, setBreed] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [address, setAddress] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [petId, setPetId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    setRegistrationDate(new Date().toLocaleString());
    setPetId(generateShortId(8));

  }, []);

  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    try {
      const response = await axios.post('http://localhost:5000/add-pet', {
        petName,
        birthday,
        breed,
        ownerName,
        ownerId,
        address,
        registrationDate,
        petId,
        email,
      });
      console.log(response.data);
      alert('Pet added successfully');
      navigate('/PetList');
      
    } catch (error) {
      console.error('There was an error adding the pet!', error);
      alert('Failed to add pet');
    }
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h2>Add Pet</h2>
      <label>
        Pet Name:
        <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} required />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </label>
      <label>
        Breed:
        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required />
      </label>
      <label>
        Owner Name:
        <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
      </label>
      <label>
        Owner ID:
        <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} maxLength="12" required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        Email Address:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Registration Date:
        <input type="text" value={registrationDate} readOnly className="readonly-field" />
      </label>
      <label>
        Pet ID:
        <input type="text" value={petId} readOnly className="readonly-field" />
      </label>
      <button type="submit">Add Pet</button>

      
    </form>
  );
};

export default AddPetForm; */


import React, { useState, useEffect } from 'react';
import './AddPetForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const generateShortId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const AddPetForm = () => {
  const [petName, setPetName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [breed, setBreed] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [address, setAddress] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [petId, setPetId] = useState('');
  const [email, setEmail] = useState('');
  const [petImage, setPetImage] = useState(null); // Add state for pet image
  const navigate = useNavigate();

  useEffect(() => {
    setRegistrationDate(new Date().toLocaleString());
    setPetId(generateShortId(8));
  }, []);

  const handleImageChange = (e) => {
    setPetImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('birthday', birthday);
    formData.append('breed', breed);
    formData.append('ownerName', ownerName);
    formData.append('ownerId', ownerId);
    formData.append('address', address);
    formData.append('registrationDate', registrationDate);
    formData.append('petId', petId);
    formData.append('email', email);
    formData.append('petImage', petImage); // Add image file to form data

    try {
      const response = await axios.post('http://localhost:5000/add-pet', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Pet added successfully');
      navigate('/Petlist');
    } catch (error) {
      console.error('There was an error adding the pet!', error);
      alert('Failed to add pet');
    }
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h2>Add Pet</h2>
      <label>
        Pet Name:
        <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} required />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </label>
      <label>
        Breed:
        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required />
      </label>
      <label>
        Owner Name:
        <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />
      </label>
      <label>
        Owner ID:
        <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} maxLength="12" required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        Email Address:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Registration Date:
        <input type="text" value={registrationDate} readOnly className="readonly-field" />
      </label>
      <label>
        Pet ID:
        <input type="text" value={petId} readOnly className="readonly-field" />
      </label>
      <label>
        Pet Image:
        <input type="file" onChange={handleImageChange} required />
      </label>
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPetForm;
