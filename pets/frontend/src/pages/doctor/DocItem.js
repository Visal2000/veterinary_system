// src/pages/DocItem.js
import React from 'react';
import {Link} from 'react-router-dom';

const DocItem = ({ doc }) => {
  return (
    <tr>
      <td>{doc.id}</td>
      <td>{doc.name}</td>
      <td>{doc.birthday}</td>
      <td>{doc.address}</td>
      <td>{doc.registrationDate}</td>
      <td>
      <Link to="/DoctorProfile">View</Link>
        <button>Delete</button>
      </td>
    </tr>
  );
};

export default DocItem;