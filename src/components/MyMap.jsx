import React, { useRef, useEffect, useState, useMemo } from "react";
import Map, { GeolocateControl, Marker, NavigationControl, FullscreenControl, ScaleControl, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { render } from "react-dom";
import styles from "./css-modules/myMap.module.css";
import Button from "./Button";

import Pin from "./Pin";
import axios from "axios";

function MyMap() {
  const [geojson, setGeoJson] = useState(null);
  const pinRef = useRef();
  const mapRef = useRef();

  const valbyLayer = {
    id: "places",
    type: "symbol",
    source: {
      type: "geojson",
      data: geojson,
    },
    layout: {
      "icon-image": "bar-15",
      "icon-size": 1.25,
      "icon-allow-overlap": true,
    },
  };

  useEffect(() => {
    axios.get("https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:biblioteker&outputFormat=json&SRSNAME=EPSG:4326").then((response) => {
      setGeoJson(response.data);
    });
  }, []);
  const pinsArray = [];
  if (geojson !== null) {
    console.log("notnull");
    const pins = geojson.features.map((location, index) => (
      <Marker key={`marker-${index}`} longitude={location.geometry.coordinates[0][0]} latitude={location.geometry.coordinates[0][1]} anchor="bottom">
        <Pin />
      </Marker>
    ));
    pinsArray.push(pins);
  }

  const TOKEN = "pk.eyJ1IjoiYWRlbGluYXJhZHVsZXNjdSIsImEiOiJjbGF0cWFmNTQwM2U4M3Btb2djZWxyM20zIn0.qMv2ldG5SYADLla1erJiLg";
  const [lng, setLng] = useState(12.568337);
  const [lat, setLat] = useState(55.676098);
  const [zoom, setZoom] = useState(10);
  const [location, setLocation] = useState("");

  function handleMove() {
    console.log("moving");
    if (!mapRef.current) return;

    setLng(mapRef.current.getCenter().lng.toFixed(4));
    setLat(mapRef.current.getCenter().lat.toFixed(4));
    setZoom(mapRef.current.getZoom().toFixed(2));
  }
  function changeLocation(event) {
    console.log("clicked");
    setLocation(event.currentTarget.value);
  }

  useEffect(() => {
    if (!mapRef.current) return;
    if (location === "Valby") {
      mapRef.current.flyTo({
        center: [12.516775, 55.661659],
        essential: true,
        zoom: 13,
      });
    } else if (location === "København Ø") {
      mapRef.current.flyTo({
        center: [12.57517469858807, 55.70923313429004],
        essential: true,
        zoom: 13,
      });
    } else if (location === "All") {
      mapRef.current.flyTo({
        center: [lng, lat],
        essential: true,
        zoom: 10,
      });
    } else if (location === "Brønshøj") {
      mapRef.current.flyTo({
        center: [12.49056929207108, 55.70738055947126],
        essential: true,
        zoom: 13,
      });
    }
  }, [location]);

  return (
    <div>
      <div className={styles.container}>
        <Button text={"All"} onClick={changeLocation} value="All" />
        <Button text={"Valby"} onClick={changeLocation} value="Valby" />
        <Button text={"Østerbro"} onClick={changeLocation} value="København Ø" />
        <Button text={"Brønshøj"} value="Brønshøj" onClick={changeLocation} />
      </div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <Map
        // style="bright-v8"
        // onLoad={addSomeLayer}
        ref={mapRef}
        onMove={handleMove}
        initialViewState={{
          longitude: 12.568337,
          latitude: 55.676098,
          zoom: zoom,
        }}
        style={{ width: 800, height: 500 }}
        mapStyle="mapbox://styles/mapbox/bright-v8"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {pinsArray}
        <Layer {...valbyLayer} />
      </Map>
    </div>
  );
}
export default MyMap;
