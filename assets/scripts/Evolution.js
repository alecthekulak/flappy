var observations, network_output, outputs, results, new_weights, new_network, mutated_weights, gap_dist; 
var temp2;
class Population{ 
    constructor(size) {
        this.size = size; 
        this.top_member = false; 
        this.top_network = false; 
        this.top_score = 0; 
        this.top_dist = 0; 
        this.gen_num = 0; 
        this.dead = false; 
        this.age = 0; 
        
        this.members = [];
        this.networks = [];  
        console.log("Creating " + (size).toString() + " AI players.");
        for (var i = 0; i < size; i++) {
            this.members.push(new Player()); 
            this.networks.push(new Network(4, 1)); 
        }
    }
    nextGeneration() {
        console.log("best info:"); 
        console.log("gap_dist: "+abs(temp2[1]-temp2[3]).toString());
        
        console.log("age: "+this.top_member.age);
        this.age = 0; 
        this.dead = false; 
        this.gen_num++; 

        this.members = [];
        this.networks = []; 
        console.log("weights: "+this.top_network.weights.toString());
        if (typeof(this.top_network) !== "boolean") { 
            // this.members.push(new Player()); 
            // this.networks.push(new Network(4, 1, this.top_network.clone())); 
            for (i = 0; i < this.size; i++) {
                this.members.push(new Player()); 
                this.networks.push(new Network(4, 1, this.top_network.clone(true, i*mutation_amount/this.gen_num))); 
                if (i==0) {
                    console.log("weights new: "+this.networks[i].weights.toString());
                }
            }
        } else {
            for (i = 0; i < this.size; i++) {
                this.members.push(new Player()); 
                this.networks.push(new Network(4, 1)); 
            }
        }
        // return this; 
    }
    update(obstacles) {
        this.dead = true; 
        for (var i=0; i < this.size; i++) {
            if (!this.members[i].dead) {
                this.dead = false; 
                observations = this.members[i].observeEnvironment(obstacles); 
                network_output = this.networks[i].getOutput(observations); 
                if (network_output == 1) {
                    this.members[i].flap(); 
                }
                // Logging if it's the best one
                if (this.members[i].age > this.age) {
                    this.age = this.members[i].age; 
                }
                gap_dist = abs(observations[1]-observations[3]); 
                if (this.members[i].age - gap_dist > this.top_dist) {
                    this.top_dist = this.members[i].age - gap_dist; 
                    temp2 = observations; 
                    this.top_member = this.members[i]; 
                    this.top_network = this.networks[i].deepCopy(); 
                    if (this.members[i].score > this.top_score) {
                        this.top_score = this.members[i].score; 
                        if (this.top_score > high_score) {
                            high_score = this.top_score;
                        }
                    }
                }
            }
            this.members[i].update();
        }
    }
    show() {
        for (i=0; i<this.size; i++) {
            this.members[i].show();
        }
    }
}
class Network{
    constructor(n_inputs, n_outputs, weights_in) {
        this.n_inputs = n_inputs;
        this.n_outputs = n_outputs; 
        if (weights_in === undefined) {
            this.weights = []; 
            for (i=0; i<n_inputs*n_outputs; i++) { 
                this.weights.push(randomGaussian(0, mutation_amount));
                // this.weights.push(random());
            }
        } else {
            this.weights = weights_in; 
        }
    }
    transform(inputs) {
        results = []; 
        for (i=0; i<this.n_outputs; i++) {
            temp = 0; 
            for (j=0; j<this.n_inputs; j++) {
                temp += inputs[j] * this.weights[i*this.n_outputs+j];
            }
            results.push(this.sigmoid(temp));
        }
        return results; 
    }
    getOutput(inputs) {
        outputs = this.transform(inputs);
        return this.step(outputs[0] - 0.5);
    }
    sigmoid(x) {
        return 1.0 / (1.0 + pow(Math.E, -x))
    }
    step(x) {
        if (x < 0){
            return 0;
        }
        return 1; 
    }
    deepCopy() {
        return new Network(this.n_inputs, this.n_outputs, this.weights); 
    }
    clone(mutate = true, stddev = mutation_amount) {
        if (mutate) {
            mutated_weights = []; 
            for (var j=0; j<this.weights.length; j++) {
                mutated_weights.push(randomGaussian(this.weights[j], stddev));
            }
            new_weights = mutated_weights;
        } else {
            new_weights = this.weights;
        }
        // new_network = new Network(this.n_inputs, this.n_outputs, new_weights); 
        // return new_network;
        return new_weights; 
    }
}
Math.randomGaussian = function(mean = 0.0, standardDeviation = 1.0) {
    if (standardDeviation == 0) {
        return mean; 
    }
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