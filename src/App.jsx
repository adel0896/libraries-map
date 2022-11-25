// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import React, { useRef, useEffect, useState } from "react";
// import Filters from "./components/Filters";
import "./App.css";
import MyMap from "./components/MyMap";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoiYWRlbGluYXJhZHVsZXNjdSIsImEiOiJjbGF0cWFmNTQwM2U4M3Btb2djZWxyM20zIn0.qMv2ldG5SYADLla1erJiLg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Find the location of the libraries situated around Copenhagen Municipality</h1>
      <MyMap />
    </div>
  );
}

export default App;
