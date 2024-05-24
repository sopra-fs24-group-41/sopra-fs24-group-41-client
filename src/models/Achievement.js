/**
 * Achievement model
 */
class Achievement {
    constructor(data = {}) {
        this.id = null;
        this.name = null;
        this.title = null;
        this.description = null;
        this.profilePicture = null;
        this.hidden = null;
        Object.assign(this, data);
    }
}

export default Achievement;
