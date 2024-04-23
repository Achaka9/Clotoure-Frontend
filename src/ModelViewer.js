import React from 'react';
import { useEffect } from 'react'; 

// START EXAMPLE CODE
import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow';

import macro from '@kitware/vtk.js/macros';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
import vtkImageGridSource from '@kitware/vtk.js/Filters/Sources/ImageGridSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkPolyData from '@kitware/vtk.js/Common/DataModel/PolyData';
import vtkSphereSource from '@kitware/vtk.js/Filters/Sources/SphereSource';
import vtkTexture from '@kitware/vtk.js/Rendering/Core/Texture';
import vtkOBJReader from '@kitware/vtk.js/IO/Misc/OBJReader';
import vtkTextureMapToPlane from '@kitware/vtk.js/Filters/Texture/TextureMapToPlane';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';

//import {ResizeSensor}     from 'css-element-queries'

//Need: vtkrenderingOpenGL2, vtkNamedColors, vtkTextureMapToPlane, vtkJPEGReader, vtkOBJReader, vtkCameraOrientationWidget, vtkAxesActor(axes), vtkPolyDataMapper, vtkRenderWindow, vtkRenderWindowInteractor, vtkRenderer, vtkTexture, vtkProperty

  function ModelViewer() {
  
  
    // ----------------------------------------------------------------------------
    // Standard rendering code setup
    // ----------------------------------------------------------------------------
 
    //container: { justifyContent: 'center', alignItems: 'center', position:'relative'}

    //First, Initialize Renderer
    //const container = document.querySelector('#mainViewer');

    useEffect(() => {
    const container = document.createElement('div');
    container.id = 'mainViewer';
    document.body.appendChild(container);
    const genericRenderWindow = vtkGenericRenderWindow.newInstance();


    // VTK renderWindow/renderer
    const renderWindow = genericRenderWindow.getRenderWindow();
    const  renderer = genericRenderWindow.getRenderer();
    renderer.setBackground(0.0, 0.05, 0.0);
    genericRenderWindow.setContainer(container);
        //not properly working on microsoft edge,, there is no standard for handling resize event
       // new ResizeSensor(container, genericRenderWindow.resize);
    genericRenderWindow.resize();

    
    // ----------------------------------------------------------------------------
    // Example code
    // ----------------------------------------------------------------------------
      /*
    const reader = vtkOBJReader.newInstance();
    // =====================

    reader.setUrl('./OBJFiles/TShirt/splitback.obj')
  .then(() => {
    reader.loadData().then(() => {
      const actor = vtkActor.newInstance();
      const mapper = vtkMapper.newInstance();
      mapper.setInputData(reader.getOutputData());
      actor.setMapper(mapper);
      renderer.addActor(actor);
      renderer.resetCamera();
      renderWindow.render();
    });
  })
  .catch((error) => {
    console.error('Error loading OBJ file:', error);
  });

    // =====================
*/
    const actor = vtkActor.newInstance();
    renderer.addActor(actor);
    
    const mapper = vtkMapper.newInstance();
    actor.setMapper(mapper);

    const sphereSource = vtkSphereSource.newInstance();
    sphereSource.setThetaResolution(64);
    sphereSource.setPhiResolution(32);

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
    mapper.setInputConnection(tcoordFilter.getOutputPort());

    const gridSource = vtkImageGridSource.newInstance();
    gridSource.setDataExtent(0, 511, 0, 511, 0, 0);
    gridSource.setGridSpacing(16, 16, 0);
    gridSource.setGridOrigin(8, 8, 0);

    const texture = vtkTexture.newInstance();
    texture.setInterpolate(true);
    texture.setInputConnection(gridSource.getOutputPort());
    actor.addTexture(texture);

    // Re-render
    renderer.resetCamera();
    renderWindow.render();
      // END EXAMPMLE CODE
      
    return () => {
      document.body.removeChild(container);
    };
  }, []); 

    
    return (
      <div>
        <h1>Model Viewer</h1>
        <p>This is the Model Viewer.</p>
      </div>
      
    );
    
  }


//<div id="mainViewer" class="ui-widget-content" float= "right" width= "800px" max-height= "10%" background-color= "#000" boarder = "none" margin= "0 5px"> </div>
export default ModelViewer;