import React from 'react';



// START EXAMPLE CODE
import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

import macro from '@kitware/vtk.js/macros';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
import vtkImageGridSource from '@kitware/vtk.js/Filters/Sources/ImageGridSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkPolyData from '@kitware/vtk.js/Common/DataModel/PolyData';
import vtkSphereSource from '@kitware/vtk.js/Filters/Sources/SphereSource';
import vtkTexture from '@kitware/vtk.js/Rendering/Core/Texture';
import vtkTextureMapToPlane from '@kitware/vtk.js/Filters/Texture/TextureMapToPlane';
import vtkOpenGLPolyDataMapper$1 from '@kitware/vtk.js/Rendering/OpenGL/PolyDataMapper';
import vtkOBJReader from '@kitware/vtk.js/IO/Misc/OBJReader';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';


// Need: vtkrenderingOpenGL2, vtkNamedColors, vtkTextureMapToPlane, vtkJPEGReader, vtkOBJReader, vtkCameraOrientationWidget, vtkAxesActor(axes), vtkPolyDataMapper, vtkRenderWindow, vtkRenderWindowInteractor, vtkRenderer, vtkTexture, vtkProperty



function ModelViewer() {

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const ScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [0, 0, 0],
});
const ren = ScreenRenderer.getRenderer();
const renwin = ScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

// front image reader
const reader = vtkHttpDataSetReader.newInstance({
  fetchGzip: false, // Set to true if the data is gzip compressed
});

const url = 'path_to_your_jpeg_image.jpg';
reader.setUrl(url);

// back image reader
const reader1 = vtkHttpDataSetReader.newInstance({
  fetchGzip: false, // Set to true if the data is gzip compressed
});

const url1 = 'path_to_your_jpeg_image.jpg';
reader.setUrl(url1);

const objreader = vtkOBJReader.newInstance()
objreader.setUrl('path_to_obj1.obj')

const objreader1 = vtkOBJReader.newInstance()
objreader1.setUrl('path_to_obj2.obj')

//Create Texture object
const texture = vtkTexture.newInstance();
texture.setInputConnection(reader.getOutputPort());

//Create second texture object
const texture1 = vtkTexture.newInstance();
texture1.setInputConnection(reader1.getOutputPort());

//MapToModel
const map_to_model = vtkTextureMapToPlane().newInstance();
map_to_model.setInputConnection(objreader.getOutputPort());

const map_to_model1 = vtkTextureMapToPlane().newInstance();
map_to_model1.setInputConnection(objreader1.getOutputPort());


//Create first actor
const actor = vtkActor.newInstance();
ren.addActor(actor);

//Create second actor
const actor1 = vtkActor.newInstance();
ren.addActor(actor);

// Create Mappers
const mapper = vtkMapper.newInstance();
const mapper1 = vtkMapper.newInstance();

// Set Mappers to actors
// set textures to actors

mapper1.setInputConnection(map_to_model.getOutputPort());
mapper.setInputConnection(map_to_model1.getOutputPort());

actor.setMapper(mapper);
actor.getProperty().setTexture(texture);
actor.addTexture(texture);

actor1.setMapper(mapper1);
actor1.getProperty().setTexture(texture1);
actor1.addTexture(texture1);

/*
// create a filter on the fly to generate tcoords from normals
const tcoordFilter = macro.newInstance((publicAPI, model) => {
  macro.obj(publicAPI, model); // make it an object
  macro.algo(publicAPI, model, 1, 1); // mixin algorithm code 1 in, 1 out
  publicAPI.requestData = (inData, outData) => {
    // implement requestData
    if (!outData[0] || inData[0].getMTime() > outData[0].getMTime()) {
      // use the normals to generate tcoords :-)
      const norms = inData[0].getPointData().getNormals();

      const newArray = new Float32Array(norms.getNumberOfTuples() * 2);
      const ndata = norms.getData();
      for (let i = 0; i < newArray.length; i += 2) {
        newArray[i] =
          Math.abs(Math.atan2(ndata[(i / 2) * 3], ndata[(i / 2) * 3 + 1])) /
          3.1415927;
        newArray[i + 1] = Math.asin(ndata[(i / 2) * 3 + 2] / 3.1415927) + 0.5;
      }

      const da = vtkDataArray.newInstance({
        numberOfComponents: 2,
        values: newArray,
      });
      da.setName('tcoord');

      const pd = vtkPolyData.newInstance();
      pd.setPolys(inData[0].getPolys());
      pd.setPoints(inData[0].getPoints());
      const cpd = pd.getPointData();
      cpd.addArray(da);
      cpd.setActiveTCoords(da.getName());
      outData[0] = pd;
    }
  };
})();

tcoordFilter.setInputConnection(sphereSource.getOutputPort());


const gridSource = vtkImageGridSource.newInstance();
gridSource.setDataExtent(0, 511, 0, 511, 0, 0);
gridSource.setGridSpacing(16, 16, 0);
gridSource.setGridOrigin(8, 8, 0);
*/

texture.setInterpolate(true);



// Re-render
ren.resetCamera();
renwin.render();

// END EXAMPMLE CODE

  return (
    <div>
      <h1>Model Viewer</h1>
      <p>This is the Model Viewer.</p>
    </div>
  );
}



export default ModelViewer;
