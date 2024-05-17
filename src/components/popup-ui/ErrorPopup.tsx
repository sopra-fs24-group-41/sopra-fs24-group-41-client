import React, {useState} from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/ErrorPopup.scss";
import PropTypes from "prop-types";

const ErrorPopup = ({ErrorInfo, resetError}) => {


    let [errorPopup, setErrorPopup] = useState(true)
    const Errordata = ErrorInfo.split("\n");
    const errormessage = Errordata[4];
    console.log(ErrorInfo);

    const handleClose = () => {
        setErrorPopup(false);
        resetError();
    }

    if (errorPopup) return (
        <BaseContainer className="errorpopup container">
            <p>{errormessage}</p>

            <Button className="errorpopup button-container" onClick={() => handleClose()}>Ok</Button>
        </BaseContainer>
    );
}

ErrorPopup.propTypes = {
    ErrorInfo: PropTypes.string.isRequired,
    resetError: PropTypes.func.isRequired
}

export default ErrorPopup;

