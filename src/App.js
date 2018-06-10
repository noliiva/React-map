import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Map from "./components/Map";

const Marker = props => <div {...props} />;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div
          style={{
            height: "calc(100vh - 290px)",
            width: "75%",
            margin: "50px auto"
          }}
        >
          <Map>
            <Marker key="Paris" lat={48.85661} lng={2.35222} />
            <Marker key="Lyon" lat={45.76404} lng={4.83566} />
            <Marker key="Marseille" lat={43.29648} lng={5.36978} />
            <Marker key="Bordeaux" lat={44.83779} lng={-0.57918} />
            <Marker key="Lille" lat={50.62925} lng={3.05726} />
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
