import { useEffect, useRef, useState } from "react";

const useStompWebSocket = (client) => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const subscriptionsRef = useRef({});

    useEffect(() => {

        client.current.onConnect = function(frame) {
            setConnected(true);
            console.log("Connected: ", frame);
        };

        client.current.onWebSocketClose = function(e) {
            setConnected(false);
            subscriptionsRef.current = {};
            console.log("Socket closed: ", e);
        };

        client.current.onWebSocketError = function(error) {
            console.error("Error with websocket", error);
        };

        client.current.onStompError = function(frame) {
            console.log("Broker reported error: " + frame.headers["message"]);
            console.log("Additional details: " + frame.body);
        };

        client.current.activate();

        return () => {
            client.current.deactivate();
        };
    }, []);

    const subscribe = (destination) => {
        if (client.current.connected) {
            subscriptionsRef.current[destination] = client.current.subscribe(destination, (message) => {
                try {
                    const receivedMessage = JSON.parse(message.body);
                    console.log(receivedMessage);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage.message]);
                } catch (e) {
                    console.log(message.body);
                    setMessages((prevMessages) => [...prevMessages, message.body]);
                }
            });
            console.log("subscribed to ", destination);
        } else {
            alert("no websocket connection");
        }
    };

    const unsubscribe = (destination) => {
        if (client.current.connected) {
            const subscription = subscriptionsRef.current[destination];
            if (subscription) {
                subscription.unsubscribe();
                delete subscriptionsRef.current[destination];
            }
            console.log("unsubscribed from ", destination);
        } else {
            alert("no websocket connection");
        }
    };

    const sendMessage = (destination, message) => {
        if (client.current.connected) {
            client.current.publish({ destination, body: JSON.stringify(message) });
            console.log("Sent message to ", destination, " : ", message);
        } else {
            alert("no websocket connection");
        }
    };

    return { messages, subscribe, unsubscribe, sendMessage, subscriptionsRef, connected };
};

export default useStompWebSocket;