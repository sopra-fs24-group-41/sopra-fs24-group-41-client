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
        this.lobby = null;
        this.ownedLobby = null;
        this.playerWords = null;
        this.targetWord = null;
        this.resultWord = null;
        Object.assign(this, data);
    }

    getWords() {
        if (!this.playerWords) return [];
        
        return this.playerWords.map(playerWord => new Word(playerWord.word));
    }
}

export default Player;
