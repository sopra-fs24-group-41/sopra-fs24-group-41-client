import React, { useContext, useEffect, useState} from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordButton from "./WordButton";
import { playerContext } from "./Game";

const TargetWord = () => {
    const { player } = useContext(playerContext);
    const [targetWordName, setTargetWordName] = useState(player.targetWord ? player.targetWord.name : "");
    const [content, setContent] = useState(
        <div className="game horizontal-container">
            <div className="target-word text">Target word:</div>
            <WordButton key={0} className="target-word word">
                {targetWordName}
            </WordButton>
        </div>
    );

    useEffect(() => {
        console.log(player.status)
        if (player.status === "PLAYING") {
            if (player.targetWord === null || player.targetWord === undefined || player.targetWord?.name === "") {
                setContent(
                    <div className="game horizontal-container">
                        <div className="target-word text">Explore Combinations</div>
                    </div>
                )
            }
            else {
                setContent(
                    <div className="game horizontal-container">
                        <div className="target-word text">Target word:</div>
                        <WordButton key={0} className="target-word word">
                            {player.targetWord.name}
                        </WordButton>
                    </div>
                )
            }
        }
        if (player.status === "LOST") {
            setContent(
                <div className="game horizontal-container">
                    <div className="target-word text">You lost...</div>
                </div>
            )
        }

    }, [player]);


    return content;
};

export default TargetWord;
