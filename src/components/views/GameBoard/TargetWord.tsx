import React, { useContext } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordButton from "./WordButton";
import { playerContext } from "./Game";

const TargetWord = () => {
    const { player} =
      useContext(playerContext);

    return (
        <BaseContainer className="targetword container">
            <div className="targetword text">Target word:</div>
            <WordButton key={0} className="targetword word">
                {player.targetWord}
            </WordButton>
        </BaseContainer>
    );
};

export default TargetWord;
