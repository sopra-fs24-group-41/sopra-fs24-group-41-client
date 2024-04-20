import { React, useRef } from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";
import Starscape from "./components/add/Starscape";
import "styles/add/Starscape.scss";
import useStompWebSocket from "./components/hooks/useStompWebSocket";
import { Client } from "@stomp/stompjs";
import { getDomain } from "./helpers/getDomain";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 * Updated by Marco Leder
 */
const App = () => {
    const client = useRef(new Client({
        brokerURL: getDomain().replace("http", "ws")+"/welcome",
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
    }));

    const stompWebSocketHook = useStompWebSocket(client);

    return (
        <div>
            <Header height="100" />
            <AppRouter stompWebSocketHook={stompWebSocketHook}/>
            <div className="starscape">
                <Starscape />
            </div>
        </div>
    );
};

export default App;
