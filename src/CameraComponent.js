import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import Axios from 'axios';

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

  useEffect(() => {
    const photoSection = document.getElementById('photo-section');
    if (photoSection) {
      photoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [capturedImage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Camera Demo</h1>
      <div style={{ width: '300px', height: '200px', marginBottom: '20px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 300, height: 200, facingMode: "user" }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <button onClick={capture} style={{ margin: '5px' }}>Capture Photo</button>
      <button onClick={segment} disabled={loading} style={{ margin: '5px' }}>
        {loading ? 'Loading...' : 'Segment'} 
      </button>
      {capturedImage && (
        <div id="photo-section" style={{ margin: '20px' }}>
          <img src={capturedImage} alt="Captured" style={{ width: '300px', height: 'auto' }} />
          <button onClick={clearImage} style={{ margin: '5px' }}>Clear Photo</button>
        </div>
      )}
    </div>
  );
}

export default CameraComponent;
