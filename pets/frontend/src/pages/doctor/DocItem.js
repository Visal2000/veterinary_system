// src/pages/DocItem.js
import React from 'react';
import {Link} from 'react-router-dom';

const DocItem = ({ doc }) => {
  return (
    <tr>
      <td>{doc.docId}</td>
      <td>{doc.docName}</td>
      <td>{doc.birthday}</td>
      <td>{doc.address}</td>
      <td>{doc.registrationDate}</td>
      <td>{doc.address}</td>

      <td>
      <Link to={`/DocProfile/${doc.docId}`}>View</Link>
        
      </td>
    </tr>
  );
};

export default DocItem;