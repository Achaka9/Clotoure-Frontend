import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Axios from 'axios';
import shirtOutline from './cameraOutlines/shirt_outline1.png'; // Assuming you have imported the image correctly

function CameraComponent() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    let blobFile = base64toImage(imageSrc);
    let file = new File([blobFile], 'screenCapture.jpeg');
    setImageFile(file);
    setFileName('screenCapture.jpeg');
  }, [webcamRef]);

  const base64toImage = (image) => {
    const byteString = atob(image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  };

  const segment = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', imageFile, fileName);

    const url = "http://localhost:5000/segment";
    Axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      console.log(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  };

  const clearImage = () => {
    setCapturedImage(null);
    setImageFile(null);
    setFileName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ position: 'relative', width: '800px', height: '600px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 800, height: 600, facingMode: "user" }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        <img
          src={shirtOutline}
          alt="Shirt Outline"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 600,
            height: '100%',
            opacity: 0.5,
            zIndex: 2,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
      <button onClick={capture} style={{ zIndex: 3 }}>Capture Photo</button>
      <button onClick={segment} disabled={loading} style={{ zIndex: 3 }}>
        {loading ? 'Loading...' : 'Segment'}
      </button>
    </div>
  );
}

export default CameraComponent;
