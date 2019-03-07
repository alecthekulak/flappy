var observations, network_output, results, new_weights, new_network, mutated_weights, gap_dist; 
let temp2;
let n_in = 5; 
let n_out = 1; 
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
function randomGauss(mu = 0.0, sigma = 1.0) {
    var temp;
    if (sigma == 0) {
        console.log("returning randomGauss with no sigma, mean: "+mu.toString());
        temp = mu; 
    } else {
        temp = mu + randn_bm() * sigma; 
    }
    return temp; 
}
class Population{ 
    constructor(size) {
        this.size = size; 
        this.top_member_age = 0; 
        this.top_network = undefined; 
        this.top_network_id = undefined; 
        this.top_score = 0; 
        this.best_distance = 0; 
        this.gen_num = 0; 
        this.dead = false; 
        this.living = this.size; 
        this.age = 0; 
        
        this.members = [];
        this.networks = [];  
        console.log("Creating " + (this.size).toString() + " AI players.");
        for (var i = 0; i < this.size; i++) {
            this.members.push(new Player()); 
            this.networks.push(new Network()); 
        }
    }
    nextGeneration() {
        console.log("gen num: "+this.gen_num.toString()+" info ::");
        console.log("gap_dist: "+abs(temp2[1]-temp2[3]).toString());
        // console.log("age: "+this.top_member_age);

        this.age = 0; 
        this.dead = false; 
        this.living = this.size; 
        this.gen_num++; 

        this.networks = []; 
        console.log("num networks before: "+this.networks.length.toString());
        console.log("weights: "+this.top_network.weights.toString());
        if (this.top_network) { 
            this.members[0].reset(); 
            console.log("clone res: "+this.top_network.clone(false).toString());
            this.networks.push(new Network(n_in, n_out, this.top_network.clone(false))); 
            console.log("weights new1: "+this.networks[0].weights.toString());
            console.log("weights new1 length: "+this.networks[0].weights.length.toString());
            console.log("clone res: "+this.top_network.clone(false).toString());
            for (var i = 1; i < this.size; i++) {
                this.members[i].reset(); 
                if (i < this.size - 10) { 
                    this.networks.push(new Network(n_in, n_out, this.top_network.clone(true, mutation_amount*pow(this.gen_num, -0.3))));
                } else {
                    this.networks.push(new Network());
                }
            }
        } else {
            for (var i = 0; i < this.size; i++) {
                this.members[i].reset(); 
                this.networks.push(new Network()); 
            }
        }
        console.log("num networks after: "+this.networks.length.toString());
        console.log("weights new2 length: "+this.networks[0].weights.length.toString());
        console.log("weights new2: "+this.networks[0].weights.toString());
    }
    calc_survivors() {
        var living_members = 0; 
        for (var i=0; i < this.size; i++) {
            if (!this.members[i].dead) {
                living_members += 1; 
            }
        }
        if (living_members == 0) {
            this.dead = true; 
        }
        this.living = living_members; 
        return this.living;
    }
    update(obstacles) {
        this.calc_survivors()
        for (var i=0; i < this.size; i++) {
            if (!this.members[i].dead) {
                observations = this.members[i].observeEnvironment(obstacles); 
                network_output = this.networks[i].getOutput(observations); 
                if (network_output == 1) {
                    this.members[i].flap(); 
                }
                // Logging if it's the best one
                if (this.members[i].age > this.age) {
                    this.age = this.members[i].age; 
                }
                var gap_dist = abs(observations[1]-observations[3]); 
                if ((this.members[i].age - gap_dist) > this.best_distance) {
                    this.best_distance = this.members[i].age - gap_dist; 
                    temp2 = observations.slice(); 
                    this.top_member_age = this.members[i].age; 
                    if (this.top_network_id !== i){ 
                        this.top_network = this.networks[i].deepCopy(); 
                        this.top_network_id = i; 
                    }
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
        for (var i=0; i<this.size; i++) {
            this.members[i].show();
        }
    }
}
class Network{
    constructor(n_inputs=n_in, n_outputs=n_out, weights_in) {
        this.n_inputs = n_inputs + 1;
        this.n_outputs = n_outputs; 
        this.weights = []; 
        if (weights_in) {
            // console.log("Network constructor: weights in: "+weights_in.toString());
            this.weights = weights_in.slice(); 
        } else {
            for (var j=0; j < this.n_inputs*this.n_outputs; j++) { 
                this.weights.push(randomGauss(0, 0.1));
            }
        }
        console.log("network created, number of weights: "+this.weights.length.toString()+", first weight: "+this.weights[0].toString());
    }
    transform(raw_inputs) {
        var inputs = raw_inputs.slice(); 
        inputs.push(1); 
        var results = []; 
        for (var i=0; i<this.n_outputs; i++) {
            var temp = 0; 
            for (var j=0; j<this.n_inputs; j++) {
                temp += inputs[j] * this.weights[i*this.n_outputs+j];
            }
            results.push(this.sigmoid(temp));
        }
        return results; 
    }
    getOutput(raw_inputs) {
        var outputs = this.transform(raw_inputs);
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
            var mutated_weights = []; 
            for (var j=0; j < this.weights.length; j++) {
                mutated_weights.push(this.weights[j] + randomGauss(0, stddev));
            }
            return mutated_weights; 
        } else {
            return this.weights.slice(); 
        }
    }
}