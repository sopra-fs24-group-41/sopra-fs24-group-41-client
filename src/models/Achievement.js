/**
 * Achievement model
 */
class Achievement {
    constructor(data = {}) {
        this.id = null;
        this.title = null;
        this.description = null;
        this.profilePicture = null;
        Object.assign(this, data);
    }
}

export default Achievement;
