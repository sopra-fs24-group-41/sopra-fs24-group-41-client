import React, { useContext, useEffect, useState, createContext} from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordButton from "./WordButton";
import { playerContext } from "./Game";
import { Button } from "components/ui/Button";
import QuitPopup from "components/popup-ui/QuitPopup";

export const GameContext = createContext();


const TargetWord = () => {
    const { player } = useContext(playerContext);
    const [targetWordName, setTargetWordName] = useState(player.targetWord ? player.targetWord.name : "");
    const [quitPopup, setQuitPopup] = useState(false);

    const handleQuit = () => {
        setQuitPopup((prevState) => !prevState);
    };

    useEffect(() => {
        setTargetWordName(player.targetWord ? player.targetWord.name : "");
    }, [player]);

    return (
        <BaseContainer className="targetword container">
            <div className="targetword text">Target word:</div>
            <WordButton key={0} className="targetword word">
                {targetWordName}
            </WordButton>
            <Button onClick={() => handleQuit()}>Quit</Button>
            {quitPopup && (
                <GameContext.Provider
                    value={{ quitPopup, setQuitPopup }}
                >
                    <QuitPopup />
                </GameContext.Provider>
            )}
        </BaseContainer>
    );
};

export default TargetWord;
