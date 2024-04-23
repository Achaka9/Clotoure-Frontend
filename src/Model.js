import React from 'react';

// START EXAMPLE CODE
import '@kitware/vtk.js/favicon';

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkGenericRenderWindow from '@kitware/vtk.js/Rendering/Misc/GenericRenderWindow';

import macro from '@kitware/vtk.js/macros';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkPolyData from '@kitware/vtk.js/Common/DataModel/PolyData';
import vtkSphereSource from '@kitware/vtk.js/Filters/Sources/SphereSource';
import vtkTexture from '@kitware/vtk.js/Rendering/Core/Texture';
import vtkOBJReader from '@kitware/vtk.js/IO/Misc/OBJReader';

function Model(){

//First, Initialize Renderer
const container = document.querySelector('#mainViewer');
const genericRenderWindow = vtkGenericRenderWindow.newInstance();

// VTK renderWindow/renderer
const renderer = genericRenderWindow.getRenderer();
const renderWindow = genericRenderWindow.getRenderWindow();

renderer.setBackground(0.0, 0.05, 0.0);
genericRenderWindow.setContainer(container);
    //not properly working on microsoft edge,, there is no standard for handling resize event
    // new ResizeSensor(container, genericRenderWindow.resize);
    genericRenderWindow.resize();


//Create readers for images
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

// Create obj readers

const objreader = vtkOBJReader.newInstance()
objreader.setUrl('./OBJFiles/TShirt/splitfront.obj')

const objreader1 = vtkOBJReader.newInstance()
objreader1.setUrl('./OBJFiles/TShirt/splitback.obj')

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

//add first actor
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

texture.setInterpolate(true);
renderer.resetCamera();
renderWindow.render();


}

export default Model;