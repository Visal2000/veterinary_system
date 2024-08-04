


import React, { useState, useEffect, useMemo } from 'react';
import PetItem from './PetItem';
import './PetList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PetList = () => {
  const [filter, setFilter] = useState('');
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets'); // Ensure the port matches the backend
        console.log('Fetched pets data:', response.data);
        setPetsData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pets data:', err);
        setError('Error fetching pets data');
        setLoading(false);
      }
    };
    fetchPetsData();
  }, []);

  const filteredPets = useMemo(() => {
    return petsData.filter(pet =>
      //pet.PetId.toLowerCase().includes(filter.toLowerCase()) ||
      pet.petName.toLowerCase().includes(filter.toLowerCase()) ||
      pet.breed.toLowerCase().includes(filter.toLowerCase()) ||
      pet.ownerName.toLowerCase().includes(filter.toLowerCase())||
      pet.ownerId.toLowerCase().includes(filter.toLowerCase()) 
    );
  }, [filter, petsData]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pet-list-container">
      <div className="header">
        <h2>All Pets</h2>
        <Link to="/AddPetForm" className="add-pet-button">Add Pet</Link>
      </div>
      <input
        type="text"
        placeholder="Search pets by Pet ID, Pet Name, Breed,Owner ID or Owner Name..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      
      
      
      
      <table className="pet-list-table">
        <thead>
          <tr>
            <th>Pet ID</th>
            <th>Pet Name</th>
            <th>Birthday</th>
            <th>Breed</th>
            <th>Owner Name</th>
            <th>Owner ID</th>
            <th>Address</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.length > 0 ? (
            filteredPets.map(pet => (
              <PetItem key={pet.id} pet={pet} />
            ))
          ) : (
            <tr>
              <td colSpan="9">No pets available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;



