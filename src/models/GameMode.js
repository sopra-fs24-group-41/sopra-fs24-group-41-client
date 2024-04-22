/**
 * Gamemode model
 */
class GameMode {
    constructor(data = {}) {
        this.name = null;
        this.description = null;
        Object.assign(this, data);
    }
}

export default GameMode;
