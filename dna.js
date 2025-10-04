class DNA {
  constructor(genes, fitnessFn) {
    this.genes = genes;
    this.fitnessFn = fitnessFn;
  }
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        let index = randomIndex(this.genes, i);
        let temp = this.genes[index];
        this.genes[index] = this.genes[i];
        this.genes[i] = temp;
      }
    }
  }
  crossover(dna2) {
    let point1 = randomIndex(this.genes);
    let point2 = randomIndex(this.genes, point1);

    let temp = point2;
    point2 = Math.max(point1, point2);
    point1 = Math.min(point1, temp);

    const helper = function (genes1, genes2) {
      let _newGenes = genes1.map((_) => "");
      for (let i = point1; i <= point2; ++i) {
        _newGenes[i] = genes1[i];
      }
      let temp = genes2.slice().filter((item) => !_newGenes.includes(item));
      let j = 0;
      for (let i = 0; i < _newGenes.length; i++) {
        if (i < point1 || i > point2) {
          _newGenes[i] = temp[j++];
        }
      }
      return _newGenes;
    };
    const newGenes1 = helper(this.genes, dna2.genes);
    const newGenes2 = helper(dna2.genes, this.genes);
    return [
      new DNA(newGenes1, this.fitnessFn),
      new DNA(newGenes2, this.fitnessFn),
    ];
  }
  calculeFitness(isCyclic) {
    return this.fitnessFn(this.genes, isCyclic);
  }
}
