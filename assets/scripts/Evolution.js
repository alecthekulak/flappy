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
}
class NNetwork{
    constructor(inputs, outputs) {
        this.inputs = inputs;
        this.outputs = outputs; 
        this.weights = []; 
        for (i=0; i<(inputs*outputs); i++) {
            this.weights.push(random());
        }
    }
}