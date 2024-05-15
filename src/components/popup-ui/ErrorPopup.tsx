import React, {useState} from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/ErrorPopup.scss";
import PropTypes from "prop-types";

const ErrorPopup = ({ErrorInfo, resetError}) => {

    let [errorPopup, setErrorPopup] = useState(true)
    const Errordata = ErrorInfo.split("\n");
    console.log(Errordata);
    const requestTo = Errordata[1];
    const statuscode = Errordata[2];
    const error = Errordata[3];
    const errormessage = Errordata[4];

    const handleClose = () => {
        setErrorPopup(false);
        resetError();
    }

    if (errorPopup) return (
        <BaseContainer className="errorpopup container">
            <h2>{errormessage}</h2>
            <p>{requestTo}</p>
            <p>{statuscode}</p>
            <p>{error}</p>

            <Button className="errorpopup button-container" onClick={() => handleClose()}>Ok</Button>
        </BaseContainer>
    );
}

ErrorPopup.propTypes = {
    ErrorInfo: PropTypes.string.isRequired,
    resetError: PropTypes.func.isRequired
}

export default ErrorPopup;

