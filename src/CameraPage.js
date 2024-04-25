import React from 'react';

import ImageButton from './ImageButton';
import CameraComponent from './CameraComponent';

function CameraPage() {
  return (
    <div style={{ alignItems: 'center', justifyContent: 'center' }}>
      
      <CameraComponent/>
      <br></br>
      <ImageButton/>
    </div>
  );
}

export default CameraPage;
