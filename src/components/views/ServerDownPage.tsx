import React, { useEffect } from "react";
import "../../styles/views/ServerDown.scss";
import BaseContainer from "../ui/BaseContainer";
import { useNavigate } from "react-router-dom";
import { api } from "../../helpers/api";

const ServerDownPage = () => {

    const navigate = useNavigate();

    const checkServerStatus = async () => {
        try {
            const response = await api.get("");
            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error checking server status:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            checkServerStatus();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <BaseContainer className="server-down container">
            <div className>
                <h2 className="server-down title">Server Down</h2>
                <p className="server-down text">Sorry, the server is currently unavailable. Please try again later.</p>
            </div>
        </BaseContainer>
    );
};

export default ServerDownPage;
