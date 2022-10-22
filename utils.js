function distanceEntreDeuxVilles(ville1,ville2){
    if(ville1 === ville2){
        return 0;
    }
    let dis = distances.get(ville1+"-"+ville2);
    if(!dis){
        dis = distances.get(ville2+"-"+ville1);
    }
    if(!dis || !Number.isFinite(dis)){
        console.log(ville1,ville2,",distance n'est pas finie");
        return 0;
    }
    return dis;
}
var textFile = null;
function makeTextFile(text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
};
function download(texte,filename){
    var link = document.createElement('a');
    link.setAttribute('download', filename);
    link.href = makeTextFile(texte);
    document.body.appendChild(link);
    window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
var distances = new Map();
distances.set("Casablanca-Agadir",490);
distances.set("Erfoud-Agadir",760);
distances.set("Essaouira-Agadir",173);
distances.set("Fes-Agadir",826);
distances.set("Mhamid-Agadir",596);
distances.set("Marrakech-Agadir",257);
distances.set("Midelt-Agadir",672);
distances.set("Ouarzazate-Agadir",375);
distances.set("Rabat-Agadir",627);
distances.set("Tangier-Agadir",905);
distances.set("Taroudant-Agadir",80);
distances.set("Tinerhir-Agadir",544);
distances.set("Zagora-Agadir",546);

distances.set("Erfoud-Casablanca",607);
distances.set("Essaouira-Casablanca",359);
distances.set("Fes-Casablanca",291);
distances.set("Mhamid-Casablanca",666);
distances.set("Marrakech-Casablanca",241);
distances.set("Midelt-Casablanca",390);
distances.set("Ouarzazate-Casablanca",445);
distances.set("Rabat-Casablanca",93);
distances.set("Tangier-Casablanca",371);
distances.set("Taroudant-Casablanca",615);
distances.set("Tinerhir-Casablanca",614);
distances.set("Zagora-Casablanca",616);

distances.set("Essaouira-Erfoud",762);
distances.set("Fes-Erfoud",421);
distances.set("Mhamid-Erfoud",390);
distances.set("Marrakech-Erfoud",589);
distances.set("Midelt-Erfoud",233);
distances.set("Ouarzazate-Erfoud",385);
distances.set("Rabat-Erfoud",619);
distances.set("Tangier-Erfoud",751);
distances.set("Taroudant-Erfoud",682);
distances.set("Tinerhir-Erfoud",218);
distances.set("Zagora-Erfoud",340);

distances.set("Fes-Essaouira",640);
distances.set("Mhamid-Essaouira",601);
distances.set("Marrakech-Essaouira",176);
distances.set("Midelt-Essaouira",844);
distances.set("Ouarzazate-Essaouira",370);
distances.set("Rabat-Essaouira",454);
distances.set("Tangier-Essaouira",730);
distances.set("Taroudant-Essaouira",262);
distances.set("Tinerhir-Essaouira",726);
distances.set("Zagora-Essaouira",551);

distances.set("Mhamid-Fes",899);
distances.set("Marrakech-Fes",464);
distances.set("Midelt-Fes",204);
distances.set("Ouarzazate-Fes",678);
distances.set("Rabat-Fes",198);
distances.set("Tangier-Fes",338);
distances.set("Taroudant-Fes",906);
distances.set("Tinerhir-Fes",509);
distances.set("Zagora-Fes",849);

distances.set("Marrakech-Mhamid",425);
distances.set("Midelt-Mhamid",681);
distances.set("Ouarzazate-Mhamid",250);
distances.set("Rabat-Mhamid",759);
distances.set("Tangier-Mhamid",1037);
distances.set("Taroudant-Mhamid",518);
distances.set("Tinerhir-Mhamid",350);
distances.set("Zagora-Mhamid",74);

distances.set("Midelt-Marrakech",415);
distances.set("Ouarzazate-Marrakech",204);
distances.set("Rabat-Marrakech",334);
distances.set("Tangier-Marrakech",612);
distances.set("Taroudant-Marrakech",223);
distances.set("Tinerhir-Marrakech",373);
distances.set("Zagora-Marrakech",375);

distances.set("Ouarzazate-Midelt",415);
distances.set("Rabat-Midelt",402);
distances.set("Tangier-Midelt",534);
distances.set("Taroudant-Midelt",501);
distances.set("Tinerhir-Midelt",291);
distances.set("Zagora-Midelt",631);

distances.set("Rabat-Ouarzazate",538);
distances.set("Tangier-Ouarzazate",808);
distances.set("Taroudant-Ouarzazate",297);
distances.set("Tinerhir-Ouarzazate",169);
distances.set("Zagora-Ouarzazate",171);

distances.set("Tangier-Rabat",278);
distances.set("Taroudant-Rabat",517);
distances.set("Tinerhir-Rabat",707);
distances.set("Zagora-Rabat",709);

distances.set("Taroudant-Tangier",985);
distances.set("Tinerhir-Tangier",847);
distances.set("Zagora-Tangier",987);

distances.set("Tinerhir-Taroudant",464);
distances.set("Zagora-Taroudant",468);

distances.set("Zagora-Tinerhir",300);

var villes = ["Casablanca",
    "Agadir",
    "Erfoud",
    "Essaouira",
    "Fes",
    "Mhamid",
    "Marrakech",     
    "Midelt",
    "Ouarzazate",
    "Rabat",
    "Tangier",
    "Taroudant",
    "Tinerhir",
    "Zagora"];
