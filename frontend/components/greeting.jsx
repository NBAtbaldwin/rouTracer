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
    <div>
      <p id="#1-text">The #1 app for runners and cyclists</p>
      <Link to="/signup">Use my email</Link>
    </div>
  );
  return currentUser ? greeting() : links();
};

export default Greeting;
