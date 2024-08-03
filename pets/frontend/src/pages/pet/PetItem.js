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
      
      

      

      <td>
      <Link to={`/PetProfile/${pet.petId}`}>View</Link>
        
      </td>
    </tr>
  );
};

export default PetItem;