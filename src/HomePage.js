import React from 'react';
import { link } from 'react-router-dom';
import logo from './logo.svg';
import phoneImage from './phone-image.png'; //this will be the phone outline with img inside
import gifBackground from './background.gif'; //this is the gif background 

function HomePage() {
  const styles = {
    //Container style for the home page
    container: {
      position: 'relative',
      height: '100vh',
      backgroundImage: 'url(${gifBackground})', //gif background
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
    },
    //Font style for the text going over the gid background on first mainpage
    overlayText: {
      fontSize: '48px',
      fontWeight: 'bold',

    },
    //Font style for the text saying company saying idk
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
  };

  return (
    <div>
      {/* Large gif with centered text*/}

      <div>
        <img src = {gifBackground} alt ="background homepage image" />
      </div>
      <div style={styles.container}>
        <div style={styles.overlayText}>
          <h1>Welcome to your virtual closet</h1>
        </div>

        {/*Company motto and button*/}
        <div style={styles.mottoSection}>
          <h2 style={styles.mottoText}>
            Your very own virutal closet.
            <br />
            Rediscover your wardrobe and get dressed with confidence.
          </h2>
          <link to="/tutorial">
            <button style={styles.seeHowButton}>See how it works</button>
          </link>
        </div>

        {/*Three step section*/}
        <div style={styles.stepsSection}>
          {/*Steps container to the right*/}
          <div style={styles.StepContainer}>
            <div>
              Snap a Photo
              <hr />
              Digitize your Clothing
              <hr />
              Unlock your Wardrobe's Potential
            </div>
          </div>

          {/*Phone image on the left*/}
          <div style={styles.phoneOutline}>
            <img src={phoneImage} alt="Phone outline with image" style={styles.phoneImage} />
          </div>
        </div>
      </div>

      {/*Navigation links to camera and tutorial page*/}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <link style={styles.link} to="/camera">Go to camera</link>
          </li>

          {/*Link to tutorial page*/}
          <li style={styles.li}>
            <link style={styles.link} to="/tutorial">View Tutorial</link>
          </li>
        </ul>
      </div>

      {/*Display the Clotoure logo at the top left of page*/}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
    </div>



  );
}

export default HomePage;


//This is the updated home page(maciej)
// Testing Uploading