import React, { useEffect, useState, createContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordBoard from "./WordBoard";
import WordMergeBar from "./WordMergeBar";
import Player from "models/Player";
import { api, handleError } from "helpers/api";
import Word from "models/Word";
import PlayerList from "./PlayerList";
import TargetWord from "./TargetWord";
import { useNavigate } from "react-router-dom";

export const nextWordIndexContext = createContext(123);

export const mergeWordListContext = createContext([]);

export const wordListContext = createContext([]);

export const playerContext = createContext(new Player());

const Game = () => {
    const [nextWordIndex, setNextWordIndex] = useState(0);
    const [mergeWordList, setMergeWordList] = useState<String>([]);
    const [player, setPlayer] = useState<Player>(new Player);
    const [players, setPlayers] = useState<Player[]>([]);
    const [wordList, setWordList] = useState<Word[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const playerId = localStorage.getItem("playerId");
                const playerToken = localStorage.getItem("playerToken");
                const lobbyCode = localStorage.getItem("lobbyCode");

                let response = await api.get(`/lobbies/${lobbyCode}/players/${playerId}`, { headers: { "playerToken": playerToken } });
                let foundPlayer = new Player(response.data);
                foundPlayer.id = playerId;
                foundPlayer.token = playerToken;
                foundPlayer.lobbyCode = lobbyCode;
                setPlayer(foundPlayer);
            } catch (error) {
                handleError(error, navigate);
            }
        };
        fetchPlayer();
    }, []);

    useEffect(() => {
        setWordList(player?.getWords());
    }, [player]);

    useEffect(() => {
        const fetchOtherPlayers = async () => {
            try {
                const lobbyCode = localStorage.getItem("lobbyCode");
                let response = await api.get(`/lobbies/${lobbyCode}/players`,);
                setPlayers(response.data.map(p => new Player(p)));
            } catch (error) {
                handleError(error, navigate);
            }
        };
        fetchOtherPlayers();
    }, []);

    return (
        <div>
            <nextWordIndexContext.Provider value={{ nextWordIndex, setNextWordIndex }}>
                <mergeWordListContext.Provider value={{ mergeWordList, setMergeWordList }}>
                    <wordListContext.Provider value={{ wordList, setWordList }}>
                        <playerContext.Provider value={{ player, setPlayer }}>    
                            <BaseContainer>
                                <TargetWord></TargetWord>
                            </BaseContainer>
                            <BaseContainer className="game base-container">

                                <div className="game horizontal-container">
                                    <div className="game container">
                                        <WordMergeBar></WordMergeBar>
                                        <WordBoard></WordBoard>
                                    </div>
                                    <PlayerList players={players}></PlayerList>
                                </div>
                            </BaseContainer>
                        </playerContext.Provider>
                    </wordListContext.Provider>
                </mergeWordListContext.Provider>
            </nextWordIndexContext.Provider>
        </div>
    );
};

export default Game;
