import React from 'react';
import { Link } from "react-router-dom";
import FooterContainer from "./footer_container"

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
        <Link to="/signup">
          <button className="greeting-email-button">
            <i className="far fa-envelope"></i>
            <p id="signup-email">Sign up with email</p>
          </button>
        </Link>
      </div>
      <FooterContainer />
    </div>
  );
  return currentUser ? greeting() : links();
};

export default Greeting;

// <div className="img-placeholder"></div>
