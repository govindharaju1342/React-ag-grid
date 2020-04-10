import React from "react";
import "./App.css";
import AgGirdTable from "./containers/AgGridTable";

function App() {
  return (
    <div className="App">
      <header id="nav" className="compact">
        <a id="logo" href="/" title="The Best Javascript Grid in the World">
          <img src="/logo.svg" alt="img" />
        </a>
      </header>
      <div>
        <AgGirdTable />
      </div>
    </div>
  );
}

export default App;
