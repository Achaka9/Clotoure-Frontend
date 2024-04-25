import React, { useState } from 'react';

const ModelViewer = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runPythonScript = () => {
    fetch('/api/run-python') // Assuming your server has a /api/run-python route that runs the Python script
      .then(res => res.json())
      .then(data => {
        setOutput(data.output);
        setError(data.error);
      })
      .catch(err => {
        setError('Error calling the API');
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Model Viewer</h1>
      <button onClick={runPythonScript}>Run Python Script</button>
      <p>Output:</p>
      <pre>{output}</pre>
      <p>Error:</p>
      <pre>{error}</pre>
    </div>
  );
};

export default ModelViewer;
