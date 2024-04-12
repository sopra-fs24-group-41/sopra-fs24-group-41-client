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
        Object.assign(this, data);
    }
}

export default User;
