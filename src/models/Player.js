import Word from "./Word";

/**
 * Player model
 */
class Player {
    constructor(data = {}) {
        this.id = null;
        this.name = null;
        this.points = 0;
        this.token = null;
        this.wins = null;
        this.losses = null;
        this.user = null;
        this.profilePicture = null;
        this.lobby = null;
        this.ownedLobby = null;
        this.playerWords = null;
        this.targetWord = null;
        this.resultWord = null;
        Object.assign(this, data);
        // Assign word count attribute
        this.wordCount = this.playerWords ? this.playerWords.length : 0;

        // Assign profile picture attribute from user object
        if (this.user && this.user.profilePicture) {
            this.profilePicture = this.user.profilePicture;
        }

        if (this.user && this.user.wins){
            this.total_wins = this.user.wins;
        }

        if (this.user && this.user.losses){
            this.total_losses = this.user.losses;
        }

    }

    getWords() {
        if (!this.playerWords) return [];
        
        return this.playerWords.map(playerWord => new Word(playerWord.word));
    }
    
    getNewestWord() {
        if (!this.playerWords || this.playerWords.length === 0) {
            return null;
        }
        
        let newestPlayerWord = this.playerWords.reduce((prevWord, currentWord) => {
            const prevTimestamp = new Date(prevWord.timestamp);
            const currentTimestamp = new Date(currentWord.timestamp);
            
            return prevTimestamp > currentTimestamp ? prevWord : currentWord;
        }, this.playerWords[0]);

        return newestPlayerWord.word;
    }
}

export default Player;
