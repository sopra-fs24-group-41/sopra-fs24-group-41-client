import axios from "axios";
import { getDomain } from "./getDomain";
import ErrorPopup from "../components/popup-ui/ErrorPopup";
import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const api = axios.create({
    baseURL: getDomain(),
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
});

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const [errorInfo, setErrorInfo] = useState(null);

    const handleError = (error, navigate) => {
        const response = error.response;

        // catch 4xx and 5xx status codes
        if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
            let info = `\nRequest to: ${response.request.responseURL}`;

            if (response.data.status) {
                info += `\nStatus code: ${response.data.status}`;
                info += `\nError: ${response.data.error}`;
                info += `\n${response.data.message}`;
            } else {
                info += `\nStatus code: ${response.status}`;
                info += `\n${response.data}`;
            }

            error.response.statusText = response.data.message;
            console.log("The request was made and answered but was unsuccessful.", error.response);
            setErrorInfo(info);

            return info;
        } else {
            if (error.message.match(/Network Error/i)) {
                localStorage.clear();
                alert("The server cannot be reached.\nDid you start it?");
                navigate("/server-down/");

                return error.message;
            }

            console.log("Something else happened.", error);

            return error.message;
        }
    };

    return (
        <ErrorContext.Provider value={{ handleError }}>
            {children}
            {errorInfo && <ErrorPopup ErrorInfo={errorInfo} resetError={() => setErrorInfo(false)} />}
        </ErrorContext.Provider>
    );
};

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired,
}