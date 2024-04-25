import React from 'react';

import photoUploadPageImage from './UserTutorialImages/photoUploadPageImage.jpg'; //Import image for the photo upload
import shirtImage from './UserTutorialImages/shirt.jpg'; //Import image for the shirt
import pantsImage from './UserTutorialImages/pants.jpg'; //Import image for the pants
import frontPhotoImage from './UserTutorialImages/front_photo.jpg'; //Import image for the front photo 
import backPhotoImage from './UserTutorialImages/back_photo.jpg'; //Import image for the back photo 
import SegmentImage from './UserTutorialImages/segment.jpg'; //Import image for the segment step
import Step1 from './UserTutorialImages/NewImages/Step1.png';
import Step2 from './UserTutorialImages/NewImages/Step2.png';
import Step2B from './UserTutorialImages/NewImages/Step2B.png';
import Step3 from './UserTutorialImages/NewImages/Step3.png';
import Step4 from './UserTutorialImages/NewImages/Step4.png';
import Step3B from './UserTutorialImages/NewImages/Step3B.png';

function UserTutorialPage() {

  //centering the text and images on the user tutorial page
  const centeredStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  return (
    <div style={centeredStyle}>
      <h1>User Tutorial Page</h1>
      <p>This page contains the user Tutorial page</p>

      {/*Step 1: Go to the Photo Upload Page*/}
      <div>
        <h2>Step 1: Go to the photo upload page</h2>
        <img src={Step1} alt="Photo Upload Page" />
      </div>

      {/*Step 2: Select what you would like to upload (shirts and pants)*/}
      <div>
        <h2>Step 2: Select what you would like to upload (shirts or pants)</h2>
        <p>Select the item you would like to upload</p>
        <div>
          <img src={Step2B} alt="Shirt" />
        </div>
      </div>

      {/*Step 3: Align the camera with the outline of the item*/}
      <div>
        <h2>Step 3: Align the camera with the outline of the item</h2>
        <p>Align your camera with the outline of the item on the screen</p>
        <img src={Step3} alt="Front Photo" />

      </div>

      {/*Step 4: Confirm if the picture is taken good*/}
      <div>
        <h2>Step 4: Confirm if the picture is taken good</h2>
        <p>Review the picture and confirm if it meets your expectations</p>
        <img src={Step3} alt="Back Photo" />
        <img src={Step3B} alt="Back Photo" />
      </div>

      {/*Step 5: Turn around, align the outline with back side of the clothing item*/}
      <div>
        <h2>Step 5: Turn around, align outline with the back side of the clothing item</h2>
        <p>Turn around and align the outline with the back side of the clothing item</p>
        <img src={Step4} alt="Back Photo" />
      </div>

      {/*Step 6: Confirm if the back picture is good*/}
      <div>
        <h2>Step 6: Confirm if back picture is good</h2>
        <p>Review the picture and confirm if it meets your expectations</p>
        <img src={Step4} alt="Back Photo" />
        <img src={Step3B} alt="Back Photo" />
      </div>

      {/*Step 7: Wait a few minutes to see your 3D clothing item*/}
      <div>
        <h2>Step 7: Wait for Segmentation</h2>
        <p>Check out your clothing item in the Model Viewer Page!</p>
      </div>
    </div>
  );
}

export default UserTutorialPage;
