import React, { useEffect, useState, useContext } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { User } from "types";
import WordButton from "./WordButton";
import { nextWordIndexContext, mergeWordListContext, playerContext } from "./Game";

const TargetWord = () => {
    const { player, setPlayer} =
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
