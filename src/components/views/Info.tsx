import React from "react";
import { useNavigate } from "react-router-dom";
import BaseContainer from "../ui/BaseContainer";
import { Button } from "../ui/Button";
import "styles/views/Info.scss";

const Info = () => {
    const navigate = useNavigate();

    return (
        <BaseContainer>
            <div className="info container">
                <h1>Information</h1>
                <p>
                    {`Once upon a time there was a lovely princess. But she had an
                    enchantment upon her of a fearful sort which could only be broken by
                    love's first kiss. She was locked away in a castle guarded by a
                    terrible fire-breathing dragon. Many brave knights had attempted to
                    free her from this dreadful prison, but none prevailed. She waited in
                    the dragon's keep in the highest room of the tallest tower for her
                    true love and true love's first kiss. (laughs)`}
                </p>
                <div className="info button-container">
                    <Button
                        width="100%"
                        onClick={() => navigate("/lobbyoverview")}
                    >
                        Return to Overview
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

export default Info;
