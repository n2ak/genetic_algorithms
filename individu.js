class Individu{
    constructor(dna){
        if(!dna){
            dna = new DNA();
        }
        this.dna = dna;
        this.fitness = -1;
    }
    crossover(individu2){
        const [newDNA1,newDNA2] = this.dna.crossover(individu2.dna);
        return [new Individu(newDNA1),new Individu(newDNA2)];
    }
    mutate(mutationRate){
        this.dna.mutate(mutationRate);
    }
    calculerFitness(isCyclic){
        this.fitness = this.dna.calculerFitness(isCyclic);
    }
    toText(){
        return this.dna.genes.join("➔");
    }
}