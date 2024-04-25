import React, { useContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordButton from "./WordButton";
import { playerContext } from "./Game";

const TargetWord = () => {
    const { player } =
      useContext(playerContext);

    const targetWordName = player.targetWord ? player.targetWord.name : "";

    return (
        <BaseContainer className="targetword container">
            <div className="targetword text">Target word:</div>
            <WordButton key={0} className="targetword word">
                {targetWordName}
            </WordButton>
        </BaseContainer>
    );
};

export default TargetWord;
