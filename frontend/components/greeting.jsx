import React from 'react';
import { Link } from "react-router-dom";

const Greeting = ({ currentUser, logout }) => {
  const greeting = () => (
    <div>
      <h2>Hello, {currentUser.email}?</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
  const links = () => (
    <div className="greeting-div">
      <p id="number-1-text">The #1 app for runners and cyclists</p>
      <div className="image-login-container">
        <img src={window.phoneImage} className="greeting-image"></img>
        <button className="greeting-email-button">
          <i className="far fa-envelope"></i>
          <Link to="/signup" id="signup-email">Sign up with email</Link>
        </button>
      </div>
    </div>
  );
  return currentUser ? greeting() : links();
};

export default Greeting;

// <div className="img-placeholder"></div>
