/*// src/components/AddPetForm.js
import React, { useState, useEffect } from 'react';
import './AddPetForm.css';

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

  useEffect(() => {
    setRegistrationDate(new Date().toLocaleString());
    setPetId(generateShortId(8)); // Generates an 8-character long ID
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
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
    // Add code here to handle form submission (e.g., send data to an API)
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
        <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        Email Address:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
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

export default AddPetForm;*/










import React, { useState, useEffect } from 'react';
import './AddPetForm.css';
import axios from 'axios';

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
        <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        Email Address:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
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

export default AddPetForm;

