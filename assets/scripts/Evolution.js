class Population{ 
    constructor(size) {
        this.members = [];
        this.networks = [];  
        this.top_member; 
        this.top_score = 0; 
        this.generation = 0; 
        
        for (i = 0; i < size; i++) {
            this.members.push(new Player()); 
            this.networks.push(new Network(4, 1)); 
        }
    }
    update() {

    }
}
class Network{
    constructor(n_inputs, n_outputs) {
        this.n_inputs = n_inputs;
        this.n_outputs = n_outputs; 
        this.weights = []; 
        for (i=0; i<(n_inputs*n_outputs); i++) {
            this.weights.push(random());
        }
    }
    transform(inputs) {
        this.outputs = []; 
        for (i=0; i<this.n_outputs; i++) {
            temp = 0; 
            for (j=0; j<this.n_inputs; j++) {
                temp += inputs[j] * this.weights[i*this.n_outputs+j];
            }
            this.outputs.append(this.sigmoid(temp));
        }
        return this.outputs; 
    }
    sigmoid(x) {
        return 1.0 / (1.0 + pow(Math.E, x))
    }
    step(x) {
        if (x < 0){
            return 0;
        }
        return 1; 
    }
    clone(mutate = true) {
        if (mutate) {
            var mutated_weights = []; 
            for (weight in weights) {
                mutated_weights.append(randomGaussian(weight, mutation_amount));
            }
            return mutated_weights;
        }
        return this.weights;
    }
}
Math.randomGaussian = function(mean = 0.0, standardDeviation = 1.0) {

    if (Math.randomGaussian.nextGaussian !== undefined) {
        var nextGaussian = Math.randomGaussian.nextGaussian;
        delete Math.randomGaussian.nextGaussian;
        return (nextGaussian * standardDeviation) + mean;
    } else {
        var v1, v2, s, multiplier;
        do {
            v1 = 2 * Math.random() - 1; // between -1 and 1
            v2 = 2 * Math.random() - 1; // between -1 and 1
            s = v1 * v1 + v2 * v2;
        } while (s >= 1 || s == 0);
        multiplier = Math.sqrt(-2 * Math.log(s) / s);
        Math.randomGaussian.nextGaussian = v2 * multiplier;
        return (v1 * multiplier * standardDeviation) + mean;
    }

};