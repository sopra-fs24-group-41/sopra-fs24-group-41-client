import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Client } from "@stomp/stompjs";
import { Button } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";

const WebSocketTest = () => {
    const [greetings, setGreetings] = useState([]);

    const stompClient = new Client({
        brokerURL: "ws://localhost:8080/welcome",
        onConnect: (frame) => {
            console.log("Connected: " + frame);
            stompClient.subscribe("/topic/greetings", (greeting) => {
                console.log(greeting)
                showGreeting(greeting.body);
            });
            alert("connected")
        },
        onWebSocketError: (error) => {
            console.error("Error with websocket", error);
        },
        onStompError: (frame) => {
            console.error("Broker reported error: " + frame.headers["message"]);
            console.error("Additional details: " + frame.body);
        },
    });

    const sendGreeting = async () => {
        try {
            await api.post("/greetings", {}, { headers: {"userToken": localStorage.getItem("token") }} )
        } catch (e) {
            alert(
                `Error occurred during triggering greeting: \n${handleError(e)}`
            );
        }
    }

    const showGreeting = (m) => {
        setGreetings((prev) => [...prev, m]);
        console.log(m)
        console.log(greetings)
    }

    return (
        <BaseContainer className="overview container">
            <h2>Websocket Test</h2>
            <p className="greeting">
                <Button onClick={() => stompClient.activate()}>
                    connect
                </Button>
                <Button
                    className="greet-button"
                    onClick={() => sendGreeting()}
                >
                    Greet
                </Button>
                <ul>
                    {greetings.map((greeting: string, index) =>
                        <li
                            key={index}
                            className={"greet"}
                        >
                            {greeting}
                        </li>)}
                </ul>
            </p>
        </BaseContainer>
    )
}

export default WebSocketTest;