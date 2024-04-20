import { useEffect, useRef, useState } from "react";

const useStompWebSocket = (client) => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const subscriptionsRef = useRef({});

    useEffect(() => {

        client.current.onConnect = function (frame) {
            setConnected(true);
            console.log("Connected: ", frame);
        }

        client.current.onWebSocketClose = function (e) {
            setConnected(false);
            Object.keys(subscriptionsRef.current).forEach((sub) => unsubscribe(sub))
            console.log("Socket closed: ", e)
        }

        client.current.onWebSocketError = function (error) {
            console.error("Error with websocket", error);
        }

        client.current.onStompError = function (frame) {
            console.log("Broker reported error: " + frame.headers["message"]);
            console.log("Additional details: " + frame.body);
        }

        // Connect to WebSocket server
        client.current.activate();

        // Cleanup function
        return () => {
            // Disconnect from WebSocket server
            client.current.deactivate();
        };
    }, []);

    const subscribe = (destination) => {
        if (client.current.connected) {
            const subscription = client.current.subscribe(destination, (message) => {
                const receivedMessage = JSON.parse(message.body).message;
                console.log(JSON.parse(message.body).message)
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                console.log(messages)
            });
            subscriptionsRef.current[destination] = subscription;
            console.log("subscribed to ", destination)
        } else {
            alert("no websocket connection")
        }
    };

    const unsubscribe = (destination) => {
        if (client.current.connected) {
            const subscription = subscriptionsRef.current[destination];
            if (subscription) {
                subscription.unsubscribe();
                delete subscriptionsRef.current[destination];
            }
            console.log("unsubscribed from ", destination)
        } else {
            alert("no websocket connection")
        }
    };

    const sendMessage = (destination, message) => {
        if (client.connected) {
            if (client.current) {
                client.current.publish({ destination, body: JSON.stringify(message) });
            }
            console.log("Sent message to ", destination, " : ", message)
        } else {
            alert("no websocket connection")
        }
    };

    return { messages, subscribe, unsubscribe, sendMessage, subscriptionsRef, connected };
};

export default useStompWebSocket;
