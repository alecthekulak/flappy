class Population{ 
    constructor(size) {
        this.size = size; 
        this.members = [];
        this.networks = [];  
        this.top_member = false; 
        this.top_network = false; 
        this.top_score = 0; 
        this.generation = 0; 
        this.dead = false; 
        this.age = 0; 
        
        for (i = 0; i < size; i++) {
            this.members.push(new Player()); 
            this.networks.push(new Network(4, 1)); 
        }
    }
    restart() {
        this.age = 0; 
        this.dead = false; 
        this.generation++; 

        this.members = [];
        this.networks = []; 
        if (typeof(this.top_network) !== "boolean") {
            this.members.push(new Player()); 
            this.networks.push(new Network(4, 1, this.top_network.clone())); 
            for (i = 0; i < size; i++) {
                this.members.push(new Player()); 
                this.networks.push(new Network(4, 1, this.top_network.clone(true))); 
            }
        } else {
            for (i = 0; i < size; i++) {
                this.members.push(new Player()); 
                this.networks.push(new Network(4, 1)); 
            }
        }




    }
    update(obstacles) {
        this.dead = true; 
        for (i=0; i<this.size; i++) {
            if (!this.members[i].dead) {
                this.dead = false; 
                if (this.members[i].age > this.age) {
                    this.age = this.members[i].age; 
                    this.top_member = this.members[i]; 
                    this.top_network = this.networks[i]; 
                    if (this.members[i].score > this.top_score) {
                        this.top_score = this.members[i].score; 
                    }
                }
                observations = this.members[i].observeEnvironment(obstacles); 
                network_output = this.networks[i].getOutput(observations); 
                if (network_output == 1) {
                    this.members[i].flap(); 
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
    constructor(n_inputs, n_outputs, weights = false) {
        this.n_inputs = n_inputs;
        this.n_outputs = n_outputs; 
        if (typeof(weights) == 'boolean') {
            this.weights = []; 
            for (i=0; i<(n_inputs*n_outputs); i++) {
                this.weights.push(2*random()-1);
            }

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
    getOutput(inputs) {
        outputs = this.transform(inputs);
        return this.step(outputs[0]);
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
            new_weights = mutated_weights;
        } else {
            new_weights = this.weights;
        }
        new_network = new Network(this.n_inputs, this.n_outputs, new_weights); 
        return new_network;
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