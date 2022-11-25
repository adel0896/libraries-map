import React, { useRef, useEffect, useState, useMemo } from "react";
import Map, { GeolocateControl, Marker, NavigationControl, FullscreenControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { render } from "react-dom";
import styles from "./css-modules/myMap.module.css";
import Button from "./Button";

import Pin from "./Pin";
import axios from "axios";
function MyMap() {
  const [geojson, setGeoJson] = useState(null);
  const mapRef = useRef();

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
    if (location === "Frederiksberg") {
      mapRef.current.flyTo({
        center: [12.5359, 55.6774],
        essential: true,
        zoom: 13, // this animation is considered essential with respect to prefers-reduced-motion
      });
    } else if (location === "Copenhagen K") {
    }
  }, [location]);

  return (
    <div>
      <div className={styles.container}>
        <Button text={"All"} />
        <Button text={"Frederiksberg"} onClick={changeLocation} value="Frederiksberg" />
        <Button text={"Copenhagen K"} />
        <Button text={"Vanlose"} />
      </div>
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <Map
        ref={mapRef}
        onMove={handleMove}
        initialViewState={{
          longitude: 12.568337,
          latitude: 55.676098,
          zoom: zoom,
        }}
        style={{ width: 800, height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {pinsArray}
      </Map>
    </div>
  );
}
export default MyMap;
