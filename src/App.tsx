import React from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";
import Starscape from "./components/add/Starscape";
import "styles/add/Starscape.scss";
import useStompWebSocket from "./components/hooks/useStompWebSocket";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 * Updated by Marco Leder
 */
const App = () => {
    const stompWebSocketHook = useStompWebSocket();

    return (
        <div>
            <Header height="100" />
            <AppRouter stompWebSocketHook={stompWebSocketHook} />
            <div className="starscape">
                <Starscape />
            </div>
        </div>
    );
};

export default App;
