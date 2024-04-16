import * as React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';

import Axios from 'axios';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import uploadimage from './images/upload-image-image.jpg';
import logo from './images/clotoure_logo.png';


const ImgButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 400,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

function ImageButton() {

    const [capturedFront, setCapturedFront] = useState(uploadimage);
    const [capturedBack, setCapturedBack] = useState(uploadimage);

    const [frontImageFile, setFrontImageFile] = useState(null);
    const [frontFileName, setFrontFileName] = useState('');
    const [backImageFile, setBackImageFile] = useState(null);
    const [backFileName, setBackFileName] = useState('');

    const [disabled, setDisabled] = useState(true)

    const images = [
        {
          url: frontImageFile,
          title: 'Front',
          width: '30%',
        },
        {
          url: backImageFile,
          title: 'Back',
          width: '30%',
        }
    ];

    console.log(uploadimage)


    const inputFrontRef = useRef(null);
    const inputBackRef = useRef(null);

    const handleFrontClick = () => {
        inputFrontRef.current.click();
        //console.log("Clicked")
    };

    const handleBackClick = () => {
        inputBackRef.current.click();
    };

    const handleFrontUpload = (event) => {
        console.log("front")
        const front = event.target.files[0];
        //const back = event.target.files[1];
        
        setFrontImageFile(front);
        setFrontFileName(front.name);
        //setBackImageFile(back);
        //setBackFileName(back.name);
        console.log(front.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCapturedFront(reader.result);
        };
        if (front) {
          reader.readAsDataURL(front);
        }

        if (backImageFile) {
            setDisabled(false);
        }
    };

    const handleBackUpload = (event) => {
        console.log("back")
        const back = event.target.files[0];
        
        setBackImageFile(back);
        setBackFileName(back.name);
        console.log(back.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCapturedBack(reader.result);
        };
        if (back) {
          reader.readAsDataURL(back);
        }

        if (frontImageFile) {
            setDisabled(false);
        }
    };


    const submitImage = () =>{
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

    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                <ImgButton
                focusRipple
                key={images[0].title}
                style={{
                    width: images[0].width,
                }}
                onClick={handleFrontClick}
                >
                <input
                    type="file"
                    ref={inputFrontRef}
                    style={{ display: "none" }}
                    onChange={handleFrontUpload}
                />
                <ImageSrc style={{ backgroundImage: `url(${capturedFront})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                    >
                    {images[0].title}
                    <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
                </ImgButton>
                <ImgButton
                focusRipple
                key={images[1].title}
                style={{
                    width: images[1].width,
                }}
                onClick={handleBackClick}
                >
                <input
                    type="file"
                    ref={inputBackRef}
                    style={{ display: "none" }}
                    onChange={handleBackUpload}
                />
                    <ImageSrc style={{ backgroundImage: `url(${capturedBack})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                            position: 'relative',
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                        >
                        {images[1].title}
                        <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </ImgButton>
            </Box>
            <Button disabled={disabled} startIcon={<CloudUploadIcon/>} onClick={submitImage}>Submit Images</Button>
        </div>
    );
}

export default ImageButton;