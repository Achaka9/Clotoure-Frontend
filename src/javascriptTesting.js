let angle = 0;
  let bunny;

  function preload() {
    bunny = loadModel('./OBJFiles/TShirt/bunny.obj');
  }

  function setup() {
    createCanvasElement(400,300, WEBGL);
  }

  function draw() {
    background(0);
    AmbientLight(100);
    DirectionalLight();
    rotateX(angle);
    rotateY(angle * 1.3);
    rotateZ(angle * 0.7);
    //box(100);
    angle += 0.03;
  }