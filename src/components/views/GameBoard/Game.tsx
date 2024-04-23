import React, { useEffect, useState, createContext, useContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordBoard from "./WordBoard";
import WordMergeBar from "./WordMergeBar";
import Player from "models/Player";
import { api, handleError } from "helpers/api";
import Word from "models/Word";
import WordButton from "./WordButton";

export const nextWordIndexContext = createContext(123);

export const mergeWordListContext = createContext([]);

export const wordListContext = createContext([]);

export const playerContext = createContext(new Player());
const testPlayerToken = "f9303651-c5cb-4546-9345-d57de2e48ca3";
const testPlayerId = 4;
const testLobbyCode = 9399;

const Game = () => {
    const [nextWordIndex, setNextWordIndex] = useState(0);
    const [mergeWordList, setMergeWordList] = useState<String>([]);
    const [player, setPlayer] = useState<Player>(new Player);
    const [wordList, setWordList] = useState<Word[]>([]);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const playerId = testPlayerId; // TODO: replace with actual ID
                const playerToken = testPlayerToken; // TODO: replace with actual token
                const lobbyCode = testLobbyCode; // TODO: replace with actual lobby code

                let response = await api.get(`/lobbies/${lobbyCode}/players/${playerId}`, { headers: { "playerToken": playerToken } });
                let foundPlayer = new Player(response.data);
                foundPlayer.id = playerId;
                foundPlayer.token = playerToken;
                foundPlayer.lobbyCode = lobbyCode;
                setPlayer(foundPlayer);
            } catch (error) {
                alert("Error: " + error.message);
            }
        };
        fetchPlayer();
    }, []);

    useEffect(() => {
        setWordList(player?.getWords());
    }, [player]);


    return (
        <BaseContainer className="game container">
            <nextWordIndexContext.Provider
                value={{ nextWordIndex, setNextWordIndex }}
            >
                <mergeWordListContext.Provider
                    value={{ mergeWordList, setMergeWordList }}
                >
                    <wordListContext.Provider
                        value={{ wordList, setWordList }}
                    >
                        <playerContext.Provider
                            value={{ player, setPlayer }}
                        >
                            <WordMergeBar></WordMergeBar>
                            <WordBoard></WordBoard>
                        </playerContext.Provider>
                    </wordListContext.Provider>
                </mergeWordListContext.Provider>
            </nextWordIndexContext.Provider>
        </BaseContainer>
    );
};

export default Game;
