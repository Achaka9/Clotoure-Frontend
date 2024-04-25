import React from 'react';

import photoUploadPageImage from './photoUploadPageImage'; //Import image for the photo upload
import shirtImage from './shirt.jpg'; //Import image for the shirt
import pantsImage from '/.pants.jpg'; //Import image for the pants
import frontPhotoImage from './front_photo.jpg'; //Import image for the front photo 
import backPhotoImage from './back_photo.jpg'; //Import image for the back photo 
import SegmentImage from './segment.jpg'; //Import image for the segment step


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
        <p>This step navigates to the photo upload page</p>
        <img src={photoUploadPageImage} alt="Photo Upload Page" />
      </div>

      {/*Step 2: Select what you would like to upload (shirts and pants)*/}
      <div>
        <h2>Step 2: Select what you would like to upload (shirts or pants)</h2>
        <p>Select the item you would like to upload</p>
        <div>
          <img src={shirtImage} alt="Shirt" />
          <img src={pantsImage} alt="Pants" />
        </div>
      </div>

      {/*Step 3: Align the camera with the outline of the item*/}
      <div>
        <h2>Step 3: Align the camera with the outline of the item</h2>
        <p>Align your camera with the outline of the item on the screen</p>
        <img src={frontPhotoImage} alt="Front Photo" />

      </div>

      {/*Step 4: Confirm if the picture is taken good*/}
      <div>
        <h2>Step 4: Confirm if the picture is taken good</h2>
        <p>Review the picture and confirm if it meets your expectations</p>
        <img src={backPhotoImage} alt="Back Photo" />
      </div>

      {/*Step 5: Turn around, align the outline with back side of the clothing item*/}
      <div>
        <h2>Step 5: Turn around, align outline with the back side of the clothing item</h2>
        <p>Turn around and align the outline with the back side of the clothing item</p>
        <img src={backPhotoImage} alt="Back Photo" />
      </div>

      {/*Step 6: Take the picture of the backside*/}
      <div>
        <h2>Step 6: Take picture of the backside</h2>
        <p>Take a picture of the back side of the clothing item</p>
        <img src={backPhotoImage} alt="Back Photo" />
      </div>

      {/*Step 7: Confirm if the back picture is good*/}
      <div>
        <h2>Step 7: Confirm if back picture is good</h2>
        <p>Review the picture and confirm if it meets your expectations</p>
        <img src={backPhotoImage} alt="Back Photo" />
      </div>

      {/*Step 8: Click Segment*/}
      <div>
        <h2>Step 8: Click Segment</h2>
        <p>Clock on the segment to proceed</p>
        <img src={SegmentImage} alt="Segment" />
      </div>

      {/*Step 9: Wait a few minutes to see your 3D clothing item*/}
      <div>
        <h2>Step 9: Wait a few minutes to see your 3D clothing items</h2>
        <p>Wait for a few minutes to see your result</p>
        <p>Display the 3D clothing item here</p>
      </div>
    </div>
  );
}

export default UserTutorialPage;
