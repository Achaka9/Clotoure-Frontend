import React from 'react';
import styles from './HomePage.module.css';
import phoneImage from './HomePageImages/phoneImage.png'; // Make sure the path is correct

function HomePage() {
  return (
    <div className={styles.homeContainer}>
      
      <main className={styles.homeMain}>
        {/* Hero section */}
        <section className={`${styles.fullHeight} ${styles.heroSection}`}>
          <div className={styles.heroText}>
            <h1>Welcome to your virtual closet</h1>
            {/* Additional hero content */}
          </div>
          {/* The background image should be set in CSS using background-image property for .heroSection */}
        </section>

        {/* New Content section for the image and text side by side */}
        <section className={`${styles.fullHeight} ${styles.contentSection}`}>
          <div className={styles.textArea}>
            <div className={styles.textBlock}>
              <h2>Create an avatar</h2>
              <p>Based on your photo, we create a photorealistic avatar that looks just like you.</p>
            </div>
            <div className={styles.textBlock}>
              <h2>Digitize your clothing</h2>
              <p>Our smart fit technology models and fits your clothing to your avatar, so you can try on and plan outfits with the swipe of a finger.</p>
            </div>
            <div className={styles.textBlock}>
              <h2>Unlock your wardrobe's potential</h2>
              <p>Rather than getting bogged down by wardrobe logistics - get inspired, make informed wardrobe decisions, and explore your own personal style.</p>
            </div>
          </div>
          <div className={styles.imageArea}>
            <img src={phoneImage} alt="Showcasing app interface" />
          </div>
        </section>

        {/* Additional content sections can be added here */}
        {/* ... */}
      </main>
    </div>
  );
}

export default HomePage;
