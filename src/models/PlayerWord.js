/**
 * PlayerWord model
 */
class PlayerWord {
    constructor(data = {}) {
        this.word = null;
        this.uses = null;
        this.timestamp = null;
        Object.assign(this, data);
    }
}

export default PlayerWord;