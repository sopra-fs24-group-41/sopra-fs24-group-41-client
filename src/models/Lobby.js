/**
 * Lobby model
 */
class Lobby {
    constructor(data = {}) {
        this.code = null;
        this.name = null;
        this.publicAccess = null;
        this.gameTime = null;
        this.status = null;
        this.mode = null;
        this.owner = null;
        this.players = [];
        Object.assign(this, data);
    }
}

export default Lobby;
