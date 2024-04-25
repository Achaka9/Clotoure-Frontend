const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/run-python', (req, res) => {
  const pythonProcess = spawn('python', ['MapToModel.py']);
  let output = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
  });

  pythonProcess.on('close', (code) => {
    res.json({ output, error, code });
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
