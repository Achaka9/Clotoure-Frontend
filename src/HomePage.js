import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

function HomePage() {
  const styles = {

    container: {
      backgroundColor: '#f5f5f5', // light brown
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '0 auto',
      marginTop: '50px',
    },
    title: {
      color: '#4a2c18', // dark brown
      textAlign: 'center',
      marginBottom: '20px',
    },
    paragraph: {
      color: '#4a2c18', // dark brown
      textAlign: 'center',
      marginBottom: '20px',
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
      color: '#4a2c18', // dark brown
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };
  
  return (
    <div style= {styles.container}>
      <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', margin: '20px 0', position: 'absolute', top: '0', left: '0' }} />
      <h1 style={styles.title}>Home Page</h1>
      <p style={styles.paragraph}>Welcome to the main page. Choose one of the options:</p>
      <ul style={styles.ul}> 
        <li style={styles.li}><Link style={styles.link} to="/camera">Go to Camera</Link></li>
        <li style={styles.li}><Link style={styles.link} to="/tutorial">View Tutorial</Link></li>
      </ul>
    </div>
  );
}

export default HomePage;

//This is the home page