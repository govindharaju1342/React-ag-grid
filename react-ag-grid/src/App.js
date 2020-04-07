import React from "react";
import "./App.css";
import Aggird from "./containers/Aggird/aggird";

function App() {
  return (
    <div className="App">
      <header id="nav" class="compact">
        <a id="logo" href="/" title="The Best Javascript Grid in the World">
          <img src="/logo.svg" />
        </a>
      </header>
      <div>
        <Aggird />
      </div>
    </div>
  );
}

export default App;
