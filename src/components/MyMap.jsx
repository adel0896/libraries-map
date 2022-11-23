import React, { useRef, useEffect, useState, useMemo } from "react";
import Map, { GeolocateControl, Marker, NavigationControl, FullscreenControl, ScaleControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { render } from "react-dom";
import styles from "./css-modules/myMap.module.css";
import Filters from "./Filters";
import Pin from "./Pin";
import axios from "axios";
function MyMap() {
  //   const geojson = {
  //     type: "FeatureCollection",
  //     features: [
  //       {
  //         type: "Feature",
  //         geometry: {
  //           type: "Point",
  //           coordinates: [-77.032, 38.913],
  //         },
  //         properties: {
  //           title: "Mapbox",
  //           description: "Washington, D.C.",
  //         },
  //       },
  //       {
  //         type: "Feature",
  //         geometry: {
  //           type: "Point",
  //           coordinates: [-122.414, 37.776],
  //         },
  //         properties: {
  //           title: "Mapbox",
  //           description: "San Francisco, California",
  //         },
  //       },
  //     ],
  //   };

  //   second try
  //   const getData = () => {
  //     fetch("https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:biblioteker&outputFormat=json&SRSNAME=EPSG:4326", {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         "Access-Control-Expose-Headers": "Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Credentials",
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     })
  //       .then(function (response) {
  //         console.log(response);
  //         return response.json();
  //       })
  //       .then(function (myJson) {
  //         console.log(myJson);
  //       });
  //   };
  //   useEffect(() => {
  //     getData();
  //   }, []);

  //   third try

  const [geojson, setGeoJson] = useState(null);
  //   const [pins, setPins] = useState("");

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

  // add markers to map

  return (
    <div>
      <Filters />
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
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
