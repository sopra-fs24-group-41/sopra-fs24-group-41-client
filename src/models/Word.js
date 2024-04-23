/**
 * WordButton model
 */
class Word {
    constructor(data = {}) {
        this.name = null;
        this.depth = null;
        this.reachability = null;
        Object.assign(this, data);
    }
}

export default Word;
