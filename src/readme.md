# Installation instructions

Make sure Node.js is installed

*/Paste and run the following script into terminal

```terminal
npm init
```

Next Paste and run this script into terminal

```terminalea
npm install react react-dom react-scripts react-webcam web-vitals axios
```

In the "scripts" key in the generated package.json paste the following before "test":

```terminal
    "start": "react-scripts start",
    "build": "react-scripts build",
```

```terminal
  "scripts": {
    {Paste Code Here}
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

for model viewer:

```terminal
npm install @kitware/vtk.js
npm install kw-web-swuite --save-dev
```
