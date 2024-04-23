import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import shirtOutline from './cameraOutlines/shirt_front_Outline.png';
import backShirtOutline from './cameraOutlines/Shirt_back_Outline.png';

function CameraComponent() {
  const webcamRef = useRef(null);
  const [clothingType, setClothingType] = useState("");
  const [clothingOutline, setClothingOutline] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDis, setIsDis] = useState(true);
  

  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);
  const [capturedFront, setCapturedFront] = useState(null);
  const [capturedBack, setCapturedBack] = useState(null);
  const [showPreviewFront, setShowPreviewFront] = useState(false);
  const [showPreviewBack, setShowPreviewBack] = useState(false);
  const [loading, setLoading] = useState(false);

  const clothingTypes = {
    "shirt": [shirtOutline, backShirtOutline],
    "dress_shirt": [],
    "pants": []
  };

  const handleChange = (event) => {
    const type = event.target.value;
    setClothingType(type);
    setClothingOutline(clothingTypes[type]);
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
    if (!capturedFront) {
      setCapturedFront(imageSrc);
      setShowPreviewFront(true);
    } else if (!capturedBack) {
      setCapturedBack(imageSrc);
      setShowPreviewBack(true);
    }
  }, [webcamRef, capturedFront, capturedBack]);

  const segment = () => {
    setLoading(true);
    const formData = new FormData();
    let frontBlob = base64toImage(capturedFront);
    let  ffname = "front_" + clothingType + ".png";
    const front = new File([frontBlob], ffname);

    let backBlob = base64toImage(capturedBack);
    let  bfname = "back_" + clothingType + ".png";
    const back = new File([backBlob], bfname);

    //var frnt = frontImageFile;
    //var bck = backImageFile;
    formData.append('front', front, ffname);
    formData.append('back', back, bfname);
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
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  };

  const handleConfirm = (type) => {
    const imageSrc = type === "front" ? capturedFront : capturedBack;
    const blobFile = base64toImage(imageSrc);
    const file = new File([blobFile], `${type}_${clothingType}.png`);
    if (type === "front") {
      setFrontImageFile(file);
      setShowPreviewFront(false);
    } else {
      setBackImageFile(file);
      setShowPreviewBack(false);
    }
    // Check if both images are confirmed
    if ((type === "front" && backImageFile) || (type === "back" && frontImageFile)) {
      segment(); // Trigger segmentation after both are confirmed
    }
  };

  const handleRetake = (type) => {
    if (type === "front") {
      setCapturedFront(null);
      setShowPreviewFront(false);
      setFrontImageFile(null);
    } else {
      setCapturedBack(null);
      setShowPreviewBack(false);
      setBackImageFile(null);
    }
  };

  const base64toImage = (dataString) => {
    const byteString = atob(dataString.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
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
            onChange={handleChange}
          >
            <MenuItem value={"shirt"}>Shirt</MenuItem>
            <MenuItem value={"dress_shirt"}>Dress Shirt</MenuItem>
            <MenuItem value={"pants"}>Pants</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      <div style={{ position: 'relative', width: '800px', height: '600px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 250, height: 240, facingMode: "user" }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
        {clothingOutline.length > 0 && !showPreviewFront && !showPreviewBack && (
          <img
            src={clothingType === "shirt" ? clothingOutline[0] : ""}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 600,
              height: '100%',
              opacity: 0.5,
              zIndex: 1,
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </div>
      <Box style={{ alignItems: 'center', justifyContent: 'center' }} sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {capturedFront && 
        <img
        src={capturedFront}
        style={{
          width: '300px',
          height: 'auto',
          border: '2px solid #ccc',
          borderRadius: '10px'
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
          borderRadius: '10px'
        }}
      />
      }
      </Box>
      <button onClick={captureFront} disabled={isDisabled} style={{ zIndex: 3 }}>Capture Front</button>
      <button onClick={captureBack} disabled={isDis} style={{ zIndex: 3 }}>Capture Back</button>
      <button onClick={segment} disabled={loading} style={{ zIndex: 3 }}>
        {loading ? 'Loading...' : 'Segment'}
      </button>
      <button onClick={capture} style={{ marginTop: 20 }}>
        Capture Photo
      </button>
      {showPreviewFront && (
        <div>
          <img
            src={capturedFront}
            style={{ width: '300px', height: 'auto', border: '2px solid #ccc', borderRadius: '10px', margin: '10px auto' }}
          />
          <button onClick={() => handleConfirm("front")}>Confirm</button>
          <button onClick={() => handleRetake("front")}>Retake</button>
        </div>
      )}
      {showPreviewBack && (
        <div>
          <img
            src={capturedBack}
            style={{ width: '300px', height: 'auto', border: '2px solid #ccc', borderRadius: '10px', margin: '10px auto' }}
          />
          <button onClick={() => handleConfirm("back")}>Confirm</button>
          <button onClick={() => handleRetake("back")}>Retake</button>
        </div>
      )}
    </div>
  );
}

export default CameraComponent;
