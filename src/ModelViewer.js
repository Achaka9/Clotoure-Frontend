// File: src/ModelViewer.js
import React, { useEffect, useRef } from 'react';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkSTLReader from 'vtk.js/Sources/IO/Geometry/STLReader';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';


const ModelViewer = ({ url }) => {
    const vtkContainerRef = useRef(null);

    useEffect(() => {
      if (!vtkContainerRef.current) {
          return;
      }
  
      const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
          rootContainer: vtkContainerRef.current,
          containerStyle: {},
      });
  
      const renderer = fullScreenRenderWindow.getRenderer();
      const renderWindow = fullScreenRenderWindow.getRenderWindow();
  
      const coneSource = vtkConeSource.newInstance();
      const mapper = vtkMapper.newInstance();
  
      if (coneSource && mapper) {
          mapper.setInputConnection(coneSource.getOutputPort());
      }
  
      const actor = vtkActor.newInstance();
      if (actor && mapper) {
          actor.setMapper(mapper);
      }
  
      if (renderer && actor) {
          renderer.addActor(actor);
          renderer.resetCamera();
          renderWindow.render();
      }
  
      return () => {
          if (fullScreenRenderWindow) {
              fullScreenRenderWindow.delete();
          }
      };
  }, []);

    return <div ref={vtkContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default ModelViewer;
