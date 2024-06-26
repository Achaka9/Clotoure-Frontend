import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CameraComponent from './CameraComponent';  // Assuming CameraComponent is its own page now
import UserTutorialPage from './UserTutorialPage';
import ModelViewer from './ModelViewer';
import NavbarComp from './Navigation/NavbarComp';


function App() {
  return (
    <div className="App">
      <NavbarComp/>
    </div>
  );
}

/*
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
            <li>
              <Link to="/ModelViewer">Model Viewer</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraComponent />} />
          <Route path="/tutorial" element={<UserTutorialPage />} />
          <Route path="/ModelViewer" element={<ModelViewer />} />
        </Routes>
      </div>
    </Router>
*/

export default App;
