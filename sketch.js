let on;
let canvas;
let worldMap;
let population;
let fitnessP;
let generationsP;
let genSlider;
let bestIndividual;
let resetButton;
let mutationRate = 0.01;
let isCyclic = false;
let keepRunning = true;
let started = false;
const maxGenerations = 150;
const start = "Casablanca";

const options = {
  lat: citiesCoord[start].x,
  lng: citiesCoord[start].y,
  zoom: 6,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
};
function setup() {
  const canvasDiv = createDiv();
  const optionsDiv = createDiv();
  function newOption(opt) {
    optionsDiv.child(opt);
    return opt;
  }
  newOption(createButton("Reset")).mousePressed(reset);
  on = newOption(createButton("Start"));
  newOption(createCheckbox("Running", keepRunning)).changed(function () {
    keepRunning = this.checked();
  });
  newOption(createCheckbox("Cyclic", false)).changed(function () {
    isCyclic = this.checked();
  });
  genSlider = newOption(createSlider(100, 400, 200));
  nIndivP = newOption(
    createP(`Number of individuals in a generation: ${genSlider.value()}`)
  );
  fitnessP = newOption(createP());
  generationsP = newOption(createP());
  canvas = createCanvas(500, 500);

  genSlider.input(() =>
    nIndivP.html(`Number of individuals in a generation: ${genSlider.value()}`)
  );

  on.mousePressed(toggleOn);

  worldMap = initMappa();
  canvasDiv.child(canvas);
  noLoop();
  reset();
  newOption(createButton("Download data.")).mousePressed(function save() {
    if (!population) return;
    const texte = population.toText(true);
    download(texte, "data.txt");
  });
}

function reset() {
  population = new Population(
    mutationRate,
    isCyclic,
    genSlider.value(),
    cities,
    fitness
  );
  fitnessP.html("Best itinerary: NaN");
  on.html("Start");
  noLoop();
}

function toggleOn() {
  if (this.html() === "Start") {
    this.html("Stop");
    loop();
    return;
  }
  this.html("Start");
  noLoop();
}
let nIndivP;
function draw() {
  if (!population) return;

  if (population.generations > maxGenerations) {
    noLoop();
    on.html("Start");
    return;
  }
  fill(200, 100, 100);
  population.calculeFitness();
  bestIndividual = population.getMostFit();
  fitnessP.html(
    `Best itinerary: ${Math.abs(
      bestIndividual.fitness
    )}, ${bestIndividual.toText()}`
  );
  generationsP.html("Generation:" + population.ngen());

  let inds = population.selection();
  inds = population.crossover(inds);
  population.moveGen(inds);
  population.mutate();
  drawItinerary();
  if (!keepRunning) {
    noLoop();
    on.html("Start");
  }
}

function drawItinerary() {
  if (!bestIndividual) return;
  clear();
  let prec = null;
  stroke(50);
  bestIndividual.dna.genes.forEach((nom) => {
    const city = citiesCoord[nom];

    if (!city) return;
    const { x, y } = worldMap.latLngToPixel(city.x, city.y);
    ellipse(x, y, 5, 5);
    if (prec !== null) {
      line(prec.x, prec.y, x, y);
    }
    prec = { x, y };
  });
  if (isCyclic === true) {
    const city1 = citiesCoord[bestIndividual.dna.genes[0]];
    const city2 =
      citiesCoord[
        bestIndividual.dna.genes[bestIndividual.dna.genes.length - 1]
      ];
    const { x: x1, y: y1 } = worldMap.latLngToPixel(city1.x, city1.y);
    const { x: x2, y: y2 } = worldMap.latLngToPixel(city2.x, city2.y);
    line(x1, y1, x2, y2);
  }
}
