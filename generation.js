class Generation {
  constructor(individuals) {
    this.mostFit = null; // best individual
    this.individuals = individuals;
    this.size = individuals.length;
  }
  static init(size, arr, fitnessFn) {
    const individuals = [];
    for (let i = 0; i < size; ++i) {
      individuals.push(new Individual(new DNA(shuffle(arr), fitnessFn)));
    }
    return new Generation(individuals);
  }
  calculeFitness(isCyclic) {
    let mostFit = null;
    this.individuals.forEach((ind) => {
      ind.calculeFitness(isCyclic);
      if (mostFit === null || mostFit.fitness < ind.fitness) {
        mostFit = ind;
      }
    });
    this.mostFit = mostFit;
  }
  crossover(individuals) {
    if (individuals.length != this.size) {
      throw new Exception(individuals.length + " != " + this.size);
    }
    const newInds = [];
    while (newInds.length < this.size) {
      const ind1 = randomElement(individuals);
      const ind2 = randomElement(individuals, ind1);
      const [newInd1, newInd2] = ind1.crossover(ind2);
      newInds.push(newInd1, newInd2);
    }
    return newInds;
  }
  selection() {
    let temp = [];
    let selectedIndividuals = [];
    let fitnesses = this.individuals.map(function (ind) {
      return ind.fitness;
    });
    let _max = Math.max(...fitnesses);
    let _min = Math.min(...fitnesses);
    this.individuals.forEach(function (ind) {
      // sample with high probablity from fittest individuals
      let occur = Math.floor(map(ind.fitness, _min, _max, 0, 7));
      for (let i = 0; i < occur; i++) {
        temp.push(ind);
      }
    });
    temp.sort((ind1, ind2) => -1 * (ind1.fitness - ind2.fitness));
    temp = temp.slice(0, this.size * 2);
    for (let i = 0; i < this.size; i++) {
      const ind = randomElement(temp);
      if (!ind) Error("Invalid ind");
      selectedIndividuals.push(ind);
    }
    return selectedIndividuals;
  }
  mutate(mutationRate) {
    this.individuals.forEach((ind) => {
      ind.mutate(mutationRate);
    });
  }
}
