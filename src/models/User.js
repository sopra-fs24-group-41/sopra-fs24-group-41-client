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
        this.achievements = null;
        this.dailyChallengeRecord = null; 
        this.numberOfCombinations = null; 
        this.profilePicture = null;

        Object.assign(this, data);

        if (Array.isArray(data.achievements)) {
            this.achievements = data.achievements;
        }

        if(this.dailyChallengeRecord && this.dailyChallengeRecord.numberOfCombinations){
            this.numberOfCombinations = this.dailyChallengeRecord.numberOfCombinations;
        }
    }
}

export default User;