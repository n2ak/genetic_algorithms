let popul;
let worldMap;
let canvas;
let fitnessP;
let generationsP;
let meilleureIndividu;
let resetButton;
let on;
let mutationRate = 0.01;
let isCyclic = false;
const generationSize = 200;
const maxGenerations = 150;


const mappa = new Mappa('Leaflet');

let villesCoord = new Map();
villesCoord.set("Casablanca",{x:33.589886,y:-7.603869});
villesCoord.set("Rabat",{x:33.9715904,y:-6.8498129});
villesCoord.set("Agadir",{x:30.427755,y:-9.598107});
villesCoord.set("Fes",{x:34.033333,y:-5.000000});
villesCoord.set("Erfoud",{x:31.4366,y:-4.2344});
villesCoord.set("Essaouira",{x:31.5085,y:-9.7595});
villesCoord.set("Mhamid",{x:29.8258,y:-5.7234});
villesCoord.set("Marrakech",{x:31.6295,y:-7.9811});
villesCoord.set("Midelt",{x:32.6799,y:-4.7329});
villesCoord.set("Ouarzazate",{x:30.9335,y:-6.9370});
villesCoord.set("Tangier",{x:35.7595,y:-5.8340});
villesCoord.set("Taroudant",{x:30.4727,y:-8.8749});
villesCoord.set("Tinerhir",{x:31.5205,y:-5.5302});
villesCoord.set("Zagora",{x:30.3459,y:-5.8407});

const options = {
  lat: villesCoord.get("Casablanca").x,
  lng: villesCoord.get("Casablanca").y,
  zoom: 6,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}
function setup(){
    createButton("Reset").mousePressed(reset);
    on = createButton("Start");
    createButton("Télécharger données.").mousePressed(enregistrer);
    createCheckbox("Running",false).changed(toggleRunning);
    createCheckbox("Cyclique",false).changed(toggleCyclic);
    createP().html("Nombre des individus dans une génération:"+generationSize);
    on.mousePressed(toggleOn);
    //createP();
    fitnessP = createP();
    generationsP = createP();




    initCanvas(); 
    initMappa();
    noLoop();
}
function enregistrer() {
    if (!popul)
        return;
    const texte = popul.genererFichier();
    download(texte,'data.txt');
}
function initCanvas(){
    canvas = createCanvas(500,500);
    //canvas.style();
}
function initMappa(){
    worldMap = mappa.tileMap(options);
    worldMap.overlay(canvas);
    worldMap.onChange(drawVilles);
}
function reset(){
    popul = new Population(mutationRate,isCyclic,generationSize);
    fitnessP.html("NaN");
}
let keepRunning = false;
function toggleRunning() {
    keepRunning = this.checked();
}
function toggleCyclic() {
    isCyclic = this.checked();
}
function toggleOn(){
    if(this.html() === "Start"){
        this.html("Stop");
        loop();
        return;
    }
    this.html("Start");
    noLoop();
}
function draw(){
    if(!popul)return;
    if(popul.generations > maxGenerations){
        noLoop();
        on.html("Start");
        return;
    }
    fill(200, 100, 100);    
    popul.calculerFitness();
    meilleureIndividu = popul.getMostFit();
    fitnessP.html("Meilleure itinéraire:"+meilleureIndividu.fitness+", "+meilleureIndividu.toText());
    generationsP.html("Génération:"+popul.generations);
    let inds = popul.selection();
    inds = popul.crossover(inds);
    popul.moveGen(inds);
    popul.mutate();
    drawVilles();
    if(!keepRunning){
        noLoop();
        on.html("Start");
    }
}
function drawLines(){

}

function drawVilles(){
    if(!meilleureIndividu)
        return;
    clear();
    let prec = null;
    stroke(50);
    meilleureIndividu.dna.genes.forEach(nom => {
        const ville = villesCoord.get(nom);
        
        if(!ville)return;
        const {x,y} = worldMap.latLngToPixel(ville.x,ville.y);
        ellipse(x,y, 5, 5);
        if(prec !== null){
            line(prec.x,prec.y,x,y);
        }
        prec = {x,y};
    });
    if(isCyclic === true){
        const ville1 = villesCoord.get(meilleureIndividu.dna.genes[0]);
        const ville2 = villesCoord.get(meilleureIndividu.dna.genes[meilleureIndividu.dna.genes.length-1]);
        const {x:x1,y:y1} = worldMap.latLngToPixel(ville1.x,ville1.y);
        const {x:x2,y:y2} = worldMap.latLngToPixel(ville2.x,ville2.y);
        //console.log(ville1,ville2);
        //console.log(worldMap.latLngToPixel(ville1.x,ville1.y));
        line(x1,y1,x2,y2);
    }
}