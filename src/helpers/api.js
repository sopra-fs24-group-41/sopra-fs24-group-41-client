import axios from "axios";
import { getDomain } from "./getDomain";

export const api = axios.create({
    baseURL: getDomain(),
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
});

export const handleError = (error, navigate) => {
    const response = error.response;

    // catch 4xx and 5xx status codes
    if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
        let info = `\nRequest to: ${response.request.responseURL}`;

        if (response.data.status) {
            info += `\nStatus code: ${response.data.status}`;
            info += `\nError: ${response.data.error}`;
            info += `\nError message: ${response.data.message}`;
        } else {
            info += `\nStatus code: ${response.status}`;
            info += `\nError message:\n${response.data}`;
        }

        error.response.statusText = response.data.message;
        console.log("The request was made and answered but was unsuccessful.", error.response);

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
