import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CameraComponent from './CameraComponent';  // Assuming CameraComponent is its own page now
import UserTutorialPage from './UserTutorialPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/camera">Camera Page</Link>
            </li>
            <li>
              <Link to="/tutorial">User Tutorial</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraComponent />} />
          <Route path="/tutorial" element={<UserTutorialPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
