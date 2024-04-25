/**
 * Lobby model
 */
class Lobby {
    constructor(data = {}) {
        this.code = null;
        this.name = null;
        this.publicAccess = null;
        this.status = null;
        this.mode = null;
        this.owner = null;
        this.players = null;
        Object.assign(this, data);
    }
}

export default Lobby;
