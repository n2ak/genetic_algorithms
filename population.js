class Population{
    constructor(mutationRate,isCyclic,size){
        this.distances = [];
        this.gens = [];
        this.generations = 0;
        this.mutationRate = mutationRate;
        this.isCyclic = isCyclic;
        this.currentGen = new Generation(undefined,size=size);
    }
    genererFichier(){
        let texte = "";
        for (let i = 0; i < this.gens.length; i++) {
            texte += this.distances[i]+","+this.gens[i]+"\r\n";
        }
        return texte;
    }
    calculerFitness(isCyclic){
        this.currentGen.calculerFitness(isCyclic);
    }
    getMostFit(){
        return this.currentGen.mostFit;
    }
    selection(){
        return this.currentGen.selection();
    }
    crossover(individus){
        return this.currentGen.crossover(individus);
    }
    moveGen(individus){
        this.distances.push(this.currentGen.mostFit.fitness);
        this.gens.push(this.generations);
        ++this.generations;
        this.currentGen = new Generation(individus=individus);
    }
    mutate(){
        this.currentGen.mutate(this.mutationRate);
    }
}