// create a new instance of draw
let draw = new Draw({
  view: view
});

// create an instance of draw polyline action
// the polyline vertices will be only added when
// the pointer is clicked on the view
let action = draw.create("polyline", {mode: "click"});

// fires when a vertex is added
action.on("vertex-add", function (evt) {
  measureLine(evt.vertices);
});

// fires when the pointer moves
action.on("cursor-update", function (evt) {
  measureLine(evt.vertices);
});

// fires when the drawing is completed
action.on("draw-complete", function (evt) {
  measureLine(evt.vertices);
});

// fires when a vertex is removed
action.on("vertex-remove", function (evt) {
  measureLine(evt.vertices);
});

function measureLine(vertices) {
  view.graphics.removeAll();

  let line = createLine(vertices);
  let lineLength = geometryEngine.geodesicLength(line, "miles");
  let graphic = createGraphic(line);
  view.graphics.add(graphic);
}

function createLine(vertices) {
  let polyline = {
    type: "polyline", // autocasts as new Polyline()
    paths: vertices,
    spatialReference: view.spatialReference
  }
  return polyline;
}
