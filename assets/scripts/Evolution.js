class Population{ 
    constructor(size) {
        this.members = []; 
        this.top_member; 
        this.top_score = 0; 
        this.generation = 0; 
        
        for (i = 0; i < size; i++) {
            this.members.push(new Player()); 
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
        // assert(length(inputs) == this.n_inputs)
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
    mutate()
}