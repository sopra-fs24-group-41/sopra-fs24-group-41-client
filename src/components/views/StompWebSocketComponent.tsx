import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const StompWebSocketComponent = ({ stompWebSocketHook }) => {
    const [input, setInput] = useState("");
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleSubscribe = () => {
        stompWebSocketHook.subscribe(input);
        setInput("");
        forceUpdate();
    };

    const handleUnsubscribe = () => {
        stompWebSocketHook.unsubscribe(input);
        setInput("");
        forceUpdate();
    };

    const handleSendMessage = () => {
        stompWebSocketHook.sendMessage("/app/hello", { message: input });
        setInput("");
        forceUpdate();
    };

    useEffect(() => {
        if (stompWebSocketHook && stompWebSocketHook.connected === true) {
            stompWebSocketHook.subscribe("/topic/greetings");
            forceUpdate();
        }

        return () => {
            if (stompWebSocketHook && stompWebSocketHook.connected === true) {
                stompWebSocketHook.unsubscribe("/topic/greetings");
                forceUpdate();
            }
        };
    }, [stompWebSocketHook.connected]);

    return (
        <div>
            <h2 style={{ color: "white" }}>
                received messages
            </h2>
            <ul>
                {stompWebSocketHook.messages.map((message, index) => (
                    <li key={index} style={{ color: "white" }}>{message}</li>
                ))}
            </ul>
            <h2 style={{ color: "white" }}>
                active subscriptions
            </h2>
            <ul>
                {Object.keys(stompWebSocketHook.subscriptionsRef.current).map((sub) => (
                    <li key={sub} style={{ color: "white" }}>{sub}</li>
                ))}
            </ul>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send Message</button>
            <button onClick={handleSubscribe}>Subscribe</button>
            <button onClick={handleUnsubscribe}>Unsubscribe</button>
        </div>
    );
};

StompWebSocketComponent.propTypes = {
    stompWebSocketHook: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
        sendMessage: PropTypes.func.isRequired,
        messages: PropTypes.array.isRequired,
        connected: PropTypes.bool.isRequired,
        subscriptionsRef: PropTypes.object.isRequired,
    }).isRequired,
};

export default StompWebSocketComponent;
