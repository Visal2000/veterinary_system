/*// src/pages/DocList.js
import React, { useState } from 'react';
import DocItem from './DocItem';
import './DocList.css';
import {Link} from 'react-router-dom';

const docsData = [
  { id: 'P001', name: 'Tommy', birthday: '2020-01-01', address: 'Labrador', registrationDate: 'John Doe' },
  { id: 'P002', name: 'Max', birthday: '2019-02-15', address: 'Beagle', registrationDate: 'Jane Smith' },
  // Add more pets as needed
];

const DocList = () => {
  const [filter, setFilter] = useState('');
  const [filteredDocs, setFilteredDocs] = useState(docsData);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const newFilteredDocs = docsData.filter(doc =>
      doc.id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDocs(newFilteredDocs);
  };

  return (
    <div className="pet-list-container">
      <h2>All Doctors</h2>
      <Link to="/AddDoctorForm" className="add-pet-button">Add Doctor</Link>
      <input
        type="text"
        placeholder="Search Doctors..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <table className="pet-list-table">
        <thead>
          <tr>
            <th>Doc ID</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>registrationDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocs.map(doc => (
            <DocItem key={doc.id} doc={doc} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocList;*/



import React, { useState , useEffect} from 'react';
import DocItem from './DocItem';
import axios from 'axios';
import './DocList.css';
import {Link} from 'react-router-dom';



const DocList = () => {
  const [docs, setDocs] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/doctors');
        console.log('Fetched docs:', response.data); // Debug log
        setDocs(response.data);
      } catch (error) {
        console.error('Error fetching docs:', error);
      }
    };

    fetchDocs();
  }, []);

  useEffect(() => {
    const newFilteredDocs = docs.filter(doc =>
      doc.docId.toLowerCase().includes(filter.toLowerCase())
    );
    console.log('Filtered docs:', newFilteredDocs); // Debug log
    setFilteredDocs(newFilteredDocs);
  }, [filter, docs]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="pet-list-container">
      <h2>All Doctors</h2>
      <Link to="/AddDoctorForm" className="add-pet-button">Add Doctor</Link>
      <input
        type="text"
        placeholder="Search Doctors..."
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <table className="pet-list-table">
        <thead>
          <tr>
            <th>Doc ID</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>registrationDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredDocs.length === 0 ? (
            <tr>
              <td colSpan="10">No Doctors available</td>
            </tr>
          ) : (
            filteredDocs.map(doc => (
              <DocItem key={doc.docId} doc={doc} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocList;
