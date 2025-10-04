// chromosome
class Individual {
  constructor(dna) {
    this.dna = dna;
    this.fitness = -1;
  }
  crossover(individual2) {
    const [newDNA1, newDNA2] = this.dna.crossover(individual2.dna);
    return [new Individual(newDNA1), new Individual(newDNA2)];
  }
  mutate(mutationRate) {
    this.dna.mutate(mutationRate);
  }
  calculeFitness(isCyclic) {
    this.fitness = this.dna.calculeFitness(isCyclic);
    return this.fitness;
  }
  toText() {
    return this.dna.genes.join(" ➔ ");
  }
}
