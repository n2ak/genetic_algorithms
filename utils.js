var textFile = null;

function distanceBetweenTwoCities(city1, city2) {
  if (city1 === city2) {
    return 0;
  }
  let dis = distances[city1 + "-" + city2];
  if (!dis) {
    dis = distances[city2 + "-" + city1];
  }
  if (!dis || !Number.isFinite(dis)) {
    throw Error(`Invalid distance between ${city1} ${city2} ${dis}`);
  }
  return dis;
}

function rand(arr) {
  return Math.floor(Math.random() * arr.length);
}

function randomIndex(arr, prev = undefined) {
  if (!prev) return rand(arr);
  let index;
  while ((index = rand(arr)) === prev) {}
  return index;
}

function randomElement(arr, prev = undefined) {
  if (!prev) return arr[rand(arr)];
  let elem;
  while ((elem = arr[rand(arr)]) === prev) {}
  return elem;
}

function fitness(genes, isCyclic) {
  let distance = 0;
  for (let i = 1; i < genes.length; ++i) {
    distance += distanceBetweenTwoCities(genes[i], genes[i - 1]);
  }
  if (isCyclic)
    distance += distanceBetweenTwoCities(genes[0], genes[genes.length - 1]);
  return -distance; // The larger the fitness (distance) the better.
}

function makeTextFile(text) {
  let data = new Blob([text], { type: "text/plain" });
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }
  textFile = window.URL.createObjectURL(data);
  return textFile;
}

function download(text, filename) {
  let link = document.createElement("a");
  link.setAttribute("download", filename);
  link.href = makeTextFile(text);
  document.body.appendChild(link);
  window.requestAnimationFrame(function () {
    let event = new MouseEvent("click");
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function initMappa() {
  const mappa = new Mappa("Leaflet");
  const worldMap = mappa.tileMap(options);
  worldMap.overlay(canvas);
  worldMap.onChange(drawItinerary);
  return worldMap;
}
