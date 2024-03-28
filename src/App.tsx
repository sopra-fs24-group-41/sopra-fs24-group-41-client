import React from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";
import Starscape from "components/stuff/Starscape";

const App = () => {
  return (
    <div style={{ position: "relative" }}>
      <Header height="100" />
      <div style={{ position: "relative", zIndex: "0" }}>
        <AppRouter />
      </div>
      {/* <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "5%",
          height: "5%",
          zIndex: "-1",
        }}
      >
        <Starscape />
      </div> */}
    </div>
  );
};

export default App;
