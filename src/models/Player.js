/**
 * Player model
 */
class Player {
    constructor(data = {}) {
        this.id = null;
        this.name = null;
        this.points = null;
        this.token = null;
        this.points = null;
        this.wins = null;
        this.losses = null;
        this.user = null;
        this.owned_lobby = null;
        this.lobby = null;
        Object.assign(this, data);
    }
}

export default Player;
