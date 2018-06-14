import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Map from "./components/Map";
import Marker from "./components/Marker";

const markers = [
  { position: { lat: 48.85661, lng: 2.35222 }, ville: "Paris" },
  { position: { lat: 45.76404, lng: 4.83566 }, ville: "Lyon" },
  { position: { lat: 43.29648, lng: 5.36978 }, ville: "Marseille" },
  { position: { lat: 44.83779, lng: -0.57918 }, ville: "Bordeaux" },
  { position: { lat: 50.62925, lng: 3.05726 }, ville: "Lille" }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Map</h1>
        </header>

        <div
          style={{
            height: "calc(100vh - 290px)",
            width: "75%",
            margin: "50px auto"
          }}
        >
          <Map apiKey="API_KEY">
            {markers.map((props, index) => (
              <Marker key={props.ville} {...props} index={index} />
            ))}
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
