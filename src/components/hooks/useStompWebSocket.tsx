import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { getDomain } from "../../helpers/getDomain";

const useStompWebSocket = () => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const client = useRef(null)
    const subscriptionsRef = useRef({});

    useEffect(() => {
        client.current = new Client({
            brokerURL: getDomain()+"/welcome",
            reconnectDelay: 5000,
        });

        client.current.onConnect = function (frame) {
            setConnected(true);
            console.log("Connected: ", frame);
        }

        client.current.onWebSocketClose = function (e) {
            setConnected(false);
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
        const subscription = client.current.subscribe(destination, (message) => {
            const receivedMessage = JSON.parse(message.body).message;
            console.log(JSON.parse(message.body).message)
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            // messages.push(receivedMessage.message);
            console.log(messages)
        });
        subscriptionsRef.current[destination] = subscription;
        console.log("subscribed to ", destination)
    };

    const unsubscribe = (destination) => {
        const subscription = subscriptionsRef.current[destination];
        if (subscription) {
            subscription.unsubscribe();
            delete subscriptionsRef.current[destination];
        }
        console.log("unsubscribed from ", destination)
    };

    const sendMessage = (destination, message) => {
        if (client.current) {
            client.current.publish({ destination, body: JSON.stringify(message) });
        }
        console.log("Sent message to ", destination, " : ", message)
    };

    console.log("subscriptions: ", subscriptionsRef)

    return { messages, subscribe, unsubscribe, sendMessage, subscriptionsRef, connected };
};

export default useStompWebSocket;
