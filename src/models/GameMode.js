/**
 * Gamemode model
 */
class GameMode {
    constructor(data = {}) {
        this.name = null;
        this.description = null;
        this.serverName = null;
        this.active = null;
        Object.assign(this, data);
    }
}

export default GameMode;
