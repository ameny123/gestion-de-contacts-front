import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
   <nav className="NavBar-Wrapper">
     <div>
       <h3 className="NavBar-Title">Gestion de contacts</h3>
     </div>
     <div className="NavBar-Links">
      <Link to="/" className="NavBar-Link">Home</Link>
      <Link to="/add" className="NavBar-Link">Add contact</Link>
      {/* <Link to="/import" className="NavBar-Link">Import</Link> */}
     </div>
   </nav>
  );
};

export default Home;
