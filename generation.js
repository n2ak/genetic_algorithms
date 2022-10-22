class Generation{
    constructor(individus = undefined,size=100){
        this.size = size;// le nombre des individus
        this.mostFit = null;// le meilleur individu
        if(individus !== undefined){
            this.individus = individus;
            this.size = this.individus.length;
        }else{
            this.init();
        }
    }
    init(){
        this.individus = [];
        for (let i = 0; i < this.size; ++i) {
            this.individus.push(new Individu()); 
        }
    }
    calculerFitness(isCyclic){
        let mostFit = null;
        this.individus.forEach(ind => {
            ind.calculerFitness(isCyclic);
            if(mostFit === null || ind.fitness < mostFit.fitness){
                mostFit = ind;
            }
        });
        this.mostFit = mostFit;
    }
    crossover(individus){
        if(individus.length != this.size){
            throw new Exception(individus.length+" != "+this.size);
            return;
        }
        const newInds = [];
        let i =  0;
        //console.log(individus);
        while(newInds.length < this.size){
            const ind1 = individus[Math.floor(Math.random()*individus.length)];
            let ind2;
            while( (ind2 = individus[Math.floor(Math.random()*individus.length)]) === ind1){}
            
            const [newInd1,newInd2] = ind1.crossover(ind2); 
            newInds.push(newInd1,newInd2);
        }
        //console.log(newInds.length)
        return newInds;
    }
    selection(){
        let temp = [];
        let individusSelectionnes = [];
        let fitnesses = this.individus.map(function(ind){
            return ind.fitness;
        });
        let _max = Math.max(...fitnesses);
        let _min = Math.min(...fitnesses);
        this.individus.forEach(function(ind){
            let occur = Math.floor(map(ind.fitness,_max,_min,0,7));
            //console.log(ind.fitness,"occurs",occur);
            for (let i = 0; i < occur; i++) {
                temp.push(ind);
            }
        });
        temp.sort(function(ind1,ind2){
            return ind1.fitness - ind2.fitness;
        });
        temp = temp.slice(0,this.size*2);
        for(let i =0;i<this.size;i++){
            individusSelectionnes.push(temp[Math.floor(Math.random() * temp.length)]);
        }
        //console.log(temp.length,individusSelectionnes.length);
        //individusSelectionnes = temp.slice(0,this.size);
        return individusSelectionnes;
    }
    mutate(mutationRate){
        this.individus.forEach(ind => {
            ind.mutate(mutationRate);
        });
    }
}