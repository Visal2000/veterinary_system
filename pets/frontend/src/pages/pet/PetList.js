/*import React, { useState } from 'react';
import PetItem from './PetItem';
import './PetList.css';
import {Link} from 'react-router-dom';

const petsData = [
  { id: 'P001', name: 'Tommy', birthday: '2020-01-01', breed: 'Labrador', ownerName: 'John Doe', ownerId: 'O001',address:'kandy', registrationDate: '2022-07-09',email:'123@gmail.com' },
  { id: 'P002', name: 'Max', birthday: '2019-02-15', breed: 'Beagle', ownerName: 'Jane Smith', ownerId: 'O002', address:'kandy', registrationDate: '2023-07-09',email:'123@gmail.com' },
  // Add more pets as needed
];

const PetList = () => {
  const [filter, setFilter] = useState('');
  const [filteredPets, setFilteredPets] = useState(petsData);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const newFilteredPets = petsData.filter(pet =>
      pet.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPets(newFilteredPets);
  };

  

  return (
    <div className="pet-list-container">
      <div className="header">
        <h2>All Pets</h2>
        <Link to="/AddPetForm" className="add-pet-button">Add Pet</Link>
      </div>
      <input
        type="text"
        placeholder="Search pets..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <table className="pet-list-table">
        <thead>
          <tr>
            <th>Pet ID</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Breed</th>
            <th>Owner Name</th>
            <th>Owner ID</th>
            <th>Address</th>
            <th>Registration Date</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.map(pet => (
            <PetItem key={pet.id} pet={pet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;*/






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PetList.css';
import { Link } from 'react-router-dom';
import PetItem from './PetItem';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets');
        console.log('Fetched pets:', response.data); // Debug log
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    const newFilteredPets = pets.filter(pet =>
      pet.petId.toLowerCase().includes(filter.toLowerCase())
    );
    console.log('Filtered pets:', newFilteredPets); // Debug log
    setFilteredPets(newFilteredPets);
  }, [filter, pets]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="pet-list-container">
      <div className="header">
        <h2>All Pets</h2>
        <Link to="/AddPetForm" className="add-pet-button">Add Pet</Link>
      </div>
      <input
        type="text"
        placeholder="Search pets..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <table className="pet-list-table">
        <thead>
          <tr>
            <th>Pet ID</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Breed</th>
            <th>Owner Name</th>
            <th>Owner ID</th>
            <th>Address</th>
            <th>Registration Date</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.length === 0 ? (
            <tr>
              <td colSpan="10">No pets available</td>
            </tr>
          ) : (
            filteredPets.map(pet => (
              <PetItem key={pet.petId} pet={pet} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
