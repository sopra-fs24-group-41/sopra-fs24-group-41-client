class DailyChallenge {
    constructor(data = {}) {
        this.user = null;
        this.profilePicture = null;
        this.username = null;
        this.numberOfCombinations = null;
        this.id = null;
        Object.assign(this, data);

        if (this.user && this.user.profilePicture) {
            this.profilePicture = this.user.profilePicture;
        }

        if(this.user && this.user.username){
            this.username = this.user.username;
        }

        if(this.user && this.user.id){
            this.id = this.user.id;
        }
    }

}

export default DailyChallenge;
