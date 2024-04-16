import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the main page. Choose one of the options:</p>
      <ul>
        {/*
        <li><Link to="/camera">Go to Camera</Link></li>
        <li><Link to="/tutorial">View Tutorial</Link></li>
        */}
      </ul>
    </div>
  );
}

export default HomePage;
