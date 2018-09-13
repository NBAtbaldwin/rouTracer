import React from 'react';
import { Link } from "react-router-dom";

const Footer = ({ currentUser, login, signup }) => {
  return(
    <div className="footer-container">
      <ul className="footer-logo">
        <li><h2>RouTracer</h2></li>
        <li><p>2018 Tyler Baldwin</p></li>
      </ul>
      <ul className="footer-login-links">
        <li><p>get started</p></li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">log in</Link></li>
      </ul>
    </div>
  )
};

export default Footer;
