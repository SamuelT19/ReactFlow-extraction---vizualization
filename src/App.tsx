import React from "react";
import "./App.css";
import CenterPanel from "./components/center-panel/CenterPanel";
import LeftPanel from "./components/left-panel/LeftPanel";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="panel">
        <div className="left_panel_container">
          <h3 style={{ color: "red", paddingBottom: "4px" }}>
            #1 Menu Extraction
          </h3>
          <LeftPanel />
        </div>
        <div className="center_panel_container">
          <h3 style={{ color: "#6161cf", paddingBottom: "4px" }}>
            #2 ReactFlow Graph
          </h3>
          <CenterPanel />
        </div>
      </div>
    </>
  );
}

export default App;
