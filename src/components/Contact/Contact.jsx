import React from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';


const Contact = ({ _id, firstName, lastName, phoneNumber, email, removeContact }) => {

  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td><a href={"mailto:" + email}>{email}</a></td>
      <td>{phoneNumber}</td>
      <td>
        <button onClick={() => removeContact(_id)} className="Action-Button fa fa-trash"></button>
        <Link to={{ pathname: '/edit', search: _id }}>
          <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>
    </tr>
  );
};

export default Contact;
