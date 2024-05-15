/**
 * WordButton model
 */
class Word {
    constructor(data = {}) {
        this.name = null;
        this.depth = null;
        this.reachability = null;
        this.newlyDiscovered = false;
        Object.assign(this, data);
    }
}

export default Word;
