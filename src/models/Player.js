import Word from "./Word";

/**
 * Player model
 */
class Player {
    constructor(data = {}) {
        this.id = null;
        this.name = "";
        this.points = 0;
        this.token = null;
        this.wins = 0;
        this.losses = 0;
        this.user = null;
        this.profilePicture = null;
        this.lobbyCode = null;
        this.ownedLobby = null;
        this.playerWords = [];
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

    sortPlayerWords () {
        this.playerWords.sort((a, b) => {
            // First, compare timestamps
            if (a.timestamp < b.timestamp) {
                return -1; // a should come before b
            } else if (a.timestamp > b.timestamp) {
                return 1; // b should come before a
            } else {
                // If timestamps are equal, compare names alphabetically
                if (a.word.name < b.word.name) {
                    return -1; // a should come before b
                } else if (a.word.name > b.word.name) {
                    return 1; // b should come before a
                } else {
                    return 0; // names are equal (shouldn't happen in this scenario)
                }
            }
        });
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
