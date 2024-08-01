// src/pages/PetItem.js
import React from 'react';
import {Link} from 'react-router-dom';

const PetItem = ({ pet }) => {
  return (
    <tr>
      <td>{pet.petId}</td>
      <td>{pet.petName}</td>
      <td>{pet.birthday}</td>
      <td>{pet.breed}</td>
      <td>{pet.ownerName}</td>
      <td>{pet.ownerId}</td>
      <td>{pet.address}</td>
      <td>{pet.registrationDate}</td>
      <td>{pet.email}</td>
      <td>
      <Link to="/PetProfile">View</Link>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default PetItem;