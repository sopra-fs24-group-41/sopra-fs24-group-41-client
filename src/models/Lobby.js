/**
 * Lobby model
 */
class Lobby {
    constructor(data = {}) {
        this.code = null;
        this.publicAccess = null;
        this.mode = null;
        this.status = null;
        this.owner = null;
        this.players = null;
        Object.assign(this, data);
    }
}

export default Lobby;
