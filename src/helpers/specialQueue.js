class specialQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        
        return this.items.shift();
    }

    isEmpty() {

        return this.items.length === 0;
    }
}

export default specialQueue;