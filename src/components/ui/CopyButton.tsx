import React, { useState} from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import "styles/ui/CopyButton.scss";

CopyButton.propTypes = {
    copyText: PropTypes.number
}

function CopyButton({ copyText }) {
    const [isCopied, setIsCopied] = useState(false)

    async function copy(text)  {

        return await navigator.clipboard.writeText(text);
    }

    const handleCopyClick = () => {

        let URL = window.location.href;
        copy(URL);
        setIsCopied(true);
        
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
        
    }

    return (
        <div className="copy-container">
            <div className="text-container">
                {copyText}
            </div>
            <div>
                <Button
                    onClick={handleCopyClick}
                    style={{ fontSize: "13px" }}>
                    {isCopied ? "Copied!" : "Copy lobby URL"}
                </Button>
            </div>
        </div>
    );
}

export default CopyButton;