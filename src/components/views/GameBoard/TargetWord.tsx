import React, { useContext, useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import WordButton from "./WordButton";
import { playerContext } from "./Game";
import { Button } from "components/ui/Button";

const TargetWord = () => {
    const { player } = useContext(playerContext);
    const [targetWordName, setTargetWordName] = useState(player.targetWord ? player.targetWord.name : "");

    useEffect(() => {
        console.log(player);
        setTargetWordName(player.targetWord ? player.targetWord.name : "");
    }, [player]);

    return (
        <BaseContainer className="targetword container">
            <div className="targetword text">Target word:</div>
            <WordButton key={0} className="targetword word">
                {targetWordName}
            </WordButton>
            <Button>Quit</Button>

        </BaseContainer>
    );
};

export default TargetWord;
