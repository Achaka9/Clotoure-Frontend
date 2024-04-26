import React from 'react';

// Replace the 'qrCodeImageSrc' with the actual path to your QR code image
import qrCodeImageSrc from './images/ClotoureQRCode.png';

function QRCode() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={qrCodeImageSrc} alt="QR Code" style={{ width: 'auto', height: '80%', maxWidth: '100%' }} />
    </div>
  );
};

export default QRCode;
