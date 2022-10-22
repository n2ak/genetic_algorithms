class DNA{
    constructor(genes){
        if(!genes){
            this.genes = shuffle(villes);
        }else{
            this.genes = genes;
        }
    }
    mutate(mutationRate){
        for (let i = 0; i < this.genes.length; i++) {
            if(Math.random() < mutationRate){
                //console.log(this.genes);
                let index;
                while((index = Math.floor(Math.random() * this.genes.length)) === i){}
                let temp = this.genes[index];
                this.genes[index] = this.genes[i];
                this.genes[i] = temp;
                //console.log(this.genes);
            }
        }
    }
    crossover(dna2){
        let point1 = Math.floor(Math.random() * this.genes.length);
        let point2;
        while((point2 = Math.floor(Math.random() * this.genes.length)) === point1){}
       
        let temp = point2;
        point2 = Math.max(point1,point2);
        point1 = Math.min(point1,temp);
        
        const helper = function(genes1,genes2){
            let _newGenes = genes1.map(_ => "");
            for(let i = point1;i <= point2; ++i) {
                _newGenes[i] = genes1[i];
            }
            let temp = genes2.slice().filter(item => !_newGenes.includes(item));
            let j=0;
            for(let i = 0;i < _newGenes.length;i++) {
                if(i < point1 || i > point2){
                    _newGenes[i] = temp[j++];
                }
            }
            return _newGenes;
        }
        const newGenes1 = helper(this.genes,dna2.genes);
        const newGenes2 = helper(dna2.genes,this.genes);
        return [new DNA(newGenes1),new DNA(newGenes2)];
    }
    calculerFitness(isCyclic){
        let distance = 0;
        for(let i=1;i < this.genes.length;++i){
            distance += distanceEntreDeuxVilles(this.genes[i],this.genes[i-1]);
        }
        if(isCyclic)
            distance += distanceEntreDeuxVilles(this.genes[0],this.genes[this.genes.length-1]);
        return distance;
    }
}