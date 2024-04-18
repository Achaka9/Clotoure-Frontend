import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import shirtOutline from './cameraOutlines/shirt_outline1.png'; // Assuming you have imported the image correctly
import backShirtOutline from './cameraOutlines/shirt_outline.png';
// import frontDressShirtOutline from './cameraOutlines/dress_shirt_outline1';
// import backDressShirtOutline from './cameraOutlines/dress_shirt_outline2';
// import frontPants from './cameraOutlines/pants_outline1';
// import backPants from './cameraOutlines/pants_outline2';


function CameraComponent() {
  const webcamRef = useRef(null);

  // Clothing type can be shirt, dress-shirt, pants
  // Selected from a drop-down menu
  const clothingTypes = {"shirt": [shirtOutline, backShirtOutline], "dress_shirt": [], "pants": []};
  const [clothingType, setClothingType] = useState("");
  const [clothingOutline, setClothingOutline] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDis, setIsDis] = useState(true);
  
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [frontFileName, setFrontFileName] = useState('');
  const [backImageFile, setBackImageFile] = useState(null);
  const [backFileName, setBackFileName] = useState('');

  const [capturedFront, setCapturedFront] = useState(null);
  const [capturedBack, setCapturedBack] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  /* Process
    Drop down menu with clothing types
    Set outline to on camera based on clothing
    Display front then back
    Add retake buttons to both
    Add segmentation button
  */
  const handleChange = (event) => {
    let type = event.target.value;
    setClothingType(type);
    console.log(type);
    console.log(clothingTypes[type]);
    setClothingOutline(clothingTypes[type]);
    setIsDisabled(false);
  };

  const currentOutline = (() => {
    console.log("Here");
    if(!capturedFront){
      console.log(0);
      return 0;
    }
    return 1;
  });

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    let blobFile = base64toImage(imageSrc);
    if (!backImageFile){  
      setCapturedFront(imageSrc);
      let name = "front_" + clothingType + ".png";
      let file = new File([blobFile], name);
      setFrontImageFile(file);
      setFrontFileName(name);
      setIsDisabled(true);
      setIsDis(false);
    } else if(frontImageFile){
      setCapturedBack(imageSrc);
      let name = "back_" + clothingType + ".png";
      let file = new File([blobFile], name);
      setBackImageFile(file);
      setBackFileName(name);
    }
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
    var frnt = frontImageFile;
    var bck = backImageFile;
    formData.append('front', frnt, frontFileName);
    formData.append('back', bck, backFileName);
    var data = JSON.stringify({"clothing_name": "Mexico_Shirt"})
    formData.append('data', data)
        
    const url = "http://localhost:5000/segment";
    
    Axios.post(url, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const clearImage = () => {
    setCapturedImage(null);
    setImageFile(null);
    setFileName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Clothing Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={clothingType}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"shirt"}>Shirt</MenuItem>
            <MenuItem value={"dress_shirt"}>Dress Shirt</MenuItem>
            <MenuItem value={"pants"}>Pants</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br></br>
      <div style={{ position: 'relative', width: '800px', height: '600px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 800, height: 600, facingMode: "user" }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        {isDisabled && <img
          src={clothingOutline[0]}
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
        />} 
        {isDis && <img
            src={clothingOutline[1]}
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
        />}
      </div>
      {capturedFront && 
        <img
        src={capturedFront}
        style={{
          width: '300px',
          height: 'auto',
          border: '2px solid #ccc',
          borderRadius: '10px',
          margin: '0 auto'
        }}
      />
      }
      {capturedBack && 
        <img
        src={capturedBack}
        style={{
          width: '300px',
          height: 'auto',
          border: '2px solid #ccc',
          borderRadius: '10px',
          margin: '0 auto'
        }}
      />
      }
      <button onClick={capture} style={{ zIndex: 3 }}>Capture Photo</button>
      <button onClick={segment} disabled={loading} style={{ zIndex: 3 }}>
        {loading ? 'Loading...' : 'Segment'}
      </button>
    </div>
  );
}

export default CameraComponent;
