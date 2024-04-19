/**
 * Player model
 */
class Player {
    constructor(data = {}) {
        this.username = null;
        this.token = null;
        this.wins = null;
        this.losses= null;
        this.user = null;
        Object.assign(this, data);
    }
}

export default Player;
