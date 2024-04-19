/**
 * User model
 */
class User {
    constructor(data = {}) {
        this.id = null;
        this.name = null;
        this.token = null;
        this.status = null;
        this.wins = null;
        this.losses = null;
        this.creationDate = null;
        this.ownedLobby = null;
        Object.assign(this, data);
    }
}

export default User;
