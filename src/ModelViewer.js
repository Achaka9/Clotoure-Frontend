import React from 'react';
import { useState, useRef, useEffect } from 'react'; 

// START EXAMPLE CODE
import '@kitware/vtk.js/favicon';
import Box from '@mui/material/Box';

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
import vtkConeSource      from '@kitware/vtk.js/Filters/Sources/ConeSource';
import vtkOBJReader from '@kitware/vtk.js/IO/Misc/OBJReader';
//import {ResizeSensor}     from 'css-element-queries'

//Need: vtkrenderingOpenGL2, vtkNamedColors, vtkTextureMapToPlane, vtkJPEGReader, vtkOBJReader, vtkCameraOrientationWidget, vtkAxesActor(axes), vtkPolyDataMapper, vtkRenderWindow, vtkRenderWindowInteractor, vtkRenderer, vtkTexture, vtkProperty

function VTK() {
  const vtkContainerRef = useRef(null);
  const context = useRef(null);
  const [coneResolution, setConeResolution] = useState(6);
    const [representation, setRepresentation] = useState(2);

    
  useEffect(() => {
    if (!context.current) {
       const container = document.createElement('div');
      container.id = 'subViewer';
      document.body.appendChild(container);
    const genericRenderWindow = vtkGenericRenderWindow.newInstance({
        rootContainer: vtkContainerRef.current,
      });
      
      const coneSource = vtkConeSource.newInstance({ height: 1.0 });

      const mapper = vtkMapper.newInstance();
      mapper.setInputConnection(coneSource.getOutputPort());

      const actor = vtkActor.newInstance();
      actor.setMapper(mapper);

    const renderWindow = genericRenderWindow.getRenderWindow();
    const  renderer = genericRenderWindow.getRenderer();
    renderer.setBackground(0.0, 0.05, 0.0);
    genericRenderWindow.setContainer(container);
    genericRenderWindow.resize();

      renderer.addActor(actor);
      renderer.resetCamera();
      renderWindow.render();

      context.current = {
        genericRenderWindow,
        renderWindow,
        renderer,
        coneSource,
        actor,
        mapper,
      };
    }

    return () => {
      if (context.current) {
        const { genericRenderWindow, coneSource, actor, mapper } = context.current;
        actor.delete();
        mapper.delete();
        coneSource.delete();
        genericRenderWindow.delete();
        context.current = null;
      }
    };
  }, [vtkContainerRef]);

  useEffect(() => {
    if (context.current) {
      const { coneSource, renderWindow } = context.current;
      coneSource.setResolution(coneResolution);
      renderWindow.render();
    }
  }, [coneResolution]);

  useEffect(() => {
    if (context.current) {
      const { actor, renderWindow } = context.current;
      actor.getProperty().setRepresentation(representation);
      renderWindow.render();
    }
  }, [representation]);

  return (
    <div>
      <div ref={vtkContainerRef} />
    </div>
  );

}

function ModelViewer() {

  
    // ----------------------------------------------------------------------------
    // Standard rendering code setup
    // ----------------------------------------------------------------------------
  
    //First, Initialize Renderer

    useEffect(() => {
    const container = document.createElement('div');
    container.id = 'mainViewer';
    document.body.appendChild(container);
    const genericRenderWindow = vtkGenericRenderWindow.newInstance();


    // VTK renderWindow/renderer
    const renderWindow = genericRenderWindow.getRenderWindow();
    const renderer = genericRenderWindow.getRenderer();
    renderer.setBackground(0.0, 0.05, 0.0);
    genericRenderWindow.setContainer(container);
        //not properly working on microsoft edge,, there is no standard for handling resize event
       // new ResizeSensor(container, genericRenderWindow.resize);
    genericRenderWindow.resize();

    
    // ----------------------------------------------------------------------------
    // Example code
    // ----------------------------------------------------------------------------
      
    const actor = vtkActor.newInstance();


    const mapper = vtkMapper.newInstance();
  
    
    
    const scene = [];
    /*
    const sphereSource = vtkSphereSource.newInstance();
    sphereSource.setThetaResolution(64);
    sphereSource.setPhiResolution(32);
    */
    const reader = vtkOBJReader.newInstance();
      /*
    reader.setUrl('./OBJFiles/TShirt/splitfront.obj', { binary: true }).then(() => {
      const polydata = reader.getOutputData(0);
      mapper.setInputData(polydata);
      renderWindow.render();
    });
    */

    reader.setUrl('../OBJFiles/TShirt/splitfront.obj')
          const polydata = reader.getOutputData();
          //const name = polydata.get('name').name;
          mapper.setInputData(polydata);
          actor.setMapper(mapper);

          renderer.addActor(actor);

          scene.push({ name, polydata, mapper, actor });
        renderer.resetCamera();
        renderWindow.render();

    
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
    mapper.setInputConnection(tcoordFilter.getOutputPort());
    */
    
    /*

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
    */
      
    return () => {
      document.body.removeChild(container);
    };
  }, []); 

  const [isVTKVisible, showVTK] = useState(false);
  const toggleShowVisible = () => {
    showVTK(!isVTKVisible);
  };
    
    return (
      <div>
        <h1>Model Viewer</h1>
        <p>This is the Model Viewer.</p>
        
        <div style={{ zIndex: 99 }}>
        <button onClick={toggleShowVisible}>Toggle show</button>{" "}
      </div>
      <div> {isVTKVisible ? <VTK /> : <div />} </div>
      </div>

      
      
    );
    
  }
/*     /*
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
        */

//<div id="mainViewer" class="ui-widget-content" float= "right" width= "800px" max-height= "10%" background-color= "#000" boarder = "none" margin= "0 5px"> </div>
export default ModelViewer;


