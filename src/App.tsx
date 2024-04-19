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
          <h3>Menu Extraction</h3>
          <LeftPanel />
        </div>
        <div className="center_panel_container">
          <h3>ReactFlow Graph</h3>
          <CenterPanel />
        </div>
      </div>
    </>
  );
}

export default App;
