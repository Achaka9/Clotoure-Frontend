import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import phoneImage from './HomePageImages/phoneImage.png'; //this will be the phone outline with img inside
import gifBackground from './HomePageImages/background.gif'; //this is the gif background 

function HomePage() {
  const styles = {
    container: {
      position: 'relative',
      height: '100vh',
      backgroundImage: `url(${gifBackground})`, // Corrected to use template literals
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
    },
    overlayText: {
      fontSize: '48px',
      fontWeight: 'bold',
    },
    mottoSection: {
      marginTop: '20vh',
      padding: '0 20px',
      textAlign: 'center',
    },
    mottoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    seeHowButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    stepsSection: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40vh',
    },
    StepContainer: {
      width: '30%',
      textAlign: 'right',
      padding: '10px',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    phoneImage: {
      width: '100px',
      height: 'auto',
    },
    ul: {
      listStyleType: 'none',
      padding: '0',
      textAlign: 'center',
    },
    li: {
      marginBottom: '10px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    // If needed, define styles for logo and phoneOutline here
    logo: {
      // Define your logo styles
    },
    phoneOutline: {
      // Define your phoneOutline styles if used differently than phoneImage
    },
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.overlayText}>
          <h1>Welcome to your virtual closet</h1>
        </div>
        <div style={styles.mottoSection}>
          <h2 style={styles.mottoText}>
            Your very own virtual closet.
            <br />
            Rediscover your wardrobe and get dressed with confidence.
          </h2>
          <Link to="/tutorial">
            <button style={styles.seeHowButton}>See how it works</button>
          </Link>
        </div>
        <div style={styles.stepsSection}>
          <div style={styles.StepContainer}>
            <div>
              Snap a Photo
              <hr />
              Digitize your Clothing
              <hr />
              Unlock your Wardrobe's Potential
            </div>
          </div>
          <div style={styles.phoneOutline}>
            <img src={phoneImage} alt="Phone outline with image" style={styles.phoneImage} />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <Link style={styles.link} to="/camera">Go to camera</Link>
            </li>
            <li style={styles.li}>
              <Link style={styles.link} to="/tutorial">View Tutorial</Link>
            </li>
          </ul>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
