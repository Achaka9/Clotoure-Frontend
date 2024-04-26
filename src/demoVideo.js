import React from 'react';
import videoSource from './demoVideo/clotoure_demo.mp4'; // Ensure the correct path to your MP4 file

const DemoVideo = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <video width="100%" height="100%" controls loop autoplay muted style={{ objectFit: 'cover' }}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default DemoVideo;
