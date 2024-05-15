/**
 * User model
 */
class User {
    constructor(data = {}) {
        this.id = null;
        this.username = null;
        this.token = null;
        this.status = null;
        this.wins = null;
        this.losses = null;
        this.creationDate = null;
        this.ownedLobby = null;
        this.favourite = null;
        this.combinationsMade = null;
        this.discoveredWords = null;
        this.rarestWordFound = null;
        this.fastestWin = null;
        Object.assign(this, data);
    }
}

export default User;
