import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import AppComponent from "./App";

function App() {
  return (
    <div className="App">
      <AppComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
