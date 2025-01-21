class Population {
  constructor(mutationRate, isCyclic, size, genes, fitnessFn) {
    this.fitnesses = [];
    this.mutationRate = mutationRate;
    this.isCyclic = isCyclic;
    this.currentGen = Generation.init(size, genes, fitnessFn);
  }
  toText(absolute = false) {
    let fitnesses = this.fitnesses;
    if (absolute) fitnesses = fitnesses.map(Math.abs);
    const text = fitnesses.join(",");
    return text;
  }
  calculeFitness(isCyclic) {
    this.currentGen.calculeFitness(isCyclic);
  }
  getMostFit() {
    return this.currentGen.mostFit;
  }
  selection() {
    return this.currentGen.selection();
  }
  crossover(individuals) {
    return this.currentGen.crossover(individuals);
  }
  moveGen(individuals) {
    this.fitnesses.push(this.currentGen.mostFit.fitness);
    this.currentGen = new Generation(individuals);
  }
  mutate() {
    this.currentGen.mutate(this.mutationRate);
  }
  ngen() {
    return this.fitnesses.length;
  }
}
