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
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
  return currentUser ? greeting() : links();
};

export default Greeting;
