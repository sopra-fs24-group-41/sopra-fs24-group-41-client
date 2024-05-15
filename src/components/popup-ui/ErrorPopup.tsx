import React, {useState} from "react";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/popup-ui/ErrorPopup.scss";
import PropTypes from "prop-types";

const ErrorPopup = ({ErrorInfo}) => {

    let [errorPopup, setErrorPopup] = useState(true)
    const Errordata = ErrorInfo.split("\n");
    console.log(Errordata);
    const requestTo = Errordata[1];
    const statuscode = Errordata[2];
    const error = Errordata[3];
    const errormessage = Errordata[4];

    if (errorPopup) return (
        <BaseContainer className="errorpopup container">
            <h2>{errormessage}</h2>
            <p>{requestTo}</p>
            <p>{statuscode}</p>
            <p>{error}</p>

            <Button className="errorpopup button-container" onClick={() => setErrorPopup(false)}>Ok</Button>
        </BaseContainer>
    );
}

ErrorPopup.propTypes = {
    ErrorInfo: PropTypes.string.isRequired,
}

export default ErrorPopup;

