import React, { useState } from "react";
import PropTypes from "prop-types";

const StompWebSocketComponent = ({ stompWebSocketHook }) => {
    const [input, setInput] = useState("");

    const handleSubscribe = () => {
        stompWebSocketHook.subscribe(input);
        setInput("")
    };

    const handleUnsubscribe = () => {
        stompWebSocketHook.unsubscribe(input);
        setInput("")
    };

    const handleSendMessage = () => {
        stompWebSocketHook.sendMessage("/app/hello", { name: input });
        setInput("");
    };

    // useEffect(() => {
    //     if (stompWebSocketHook && stompWebSocketHook.connected === true) {
    //         setInput("/topic/greetings")
    //         handleSubscribe();
    //     }
    //
    //     return () => {
    //         if (stompWebSocketHook && stompWebSocketHook.connected === true) {
    //             setInput("/topic/greetings")
    //             handleUnsubscribe();
    //         }
    //     }
    // }, [stompWebSocketHook.connected]);

    return (
        <div>
            <h2 style={{color: "white"}}>
                received messages
            </h2>
            <ul>
                {stompWebSocketHook.messages.map((message, index) => (
                    <li key={index} style={{color: "white"}}>{message}</li>
                ))}
            </ul>
            <h2 style={{color: "white"}}>
                active subscriptions
            </h2>
            <ul>
                {Object.keys(stompWebSocketHook.subscriptionsRef.current).map((sub, index) => (
                    <li key={index} style={{color: "white"}}>{sub}</li>
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
            <button onClick={() => console.log(stompWebSocketHook.subscriptionsRef.current)}>List subs</button>
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
