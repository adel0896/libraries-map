import React, { useRef, useEffect, useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./css-modules/myMap.module.css";
import Filters from "./Filters";
function MyMap({ token }) {
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.032, 38.913],
        },
        properties: {
          title: "Mapbox",
          description: "Washington, D.C.",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.414, 37.776],
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California",
        },
      },
    ],
  };
  //   const map = new token.Map({
  //     container: "map",
  //     style: "mapbox://styles/mapbox/light-v11",
  //     center: [-96, 37.8],
  //     zoom: 3,
  //   });
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(12.568337);
  const [lat, setLat] = useState(55.676098);
  const [zoom, setZoom] = useState(10);
  const [marker, setMarker] = useState({ Marker });
  const initialViewState = {
    center: [lng, lat],
    zoom: zoom,
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new token.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    // map.current = new token.Marker({
    //   container: mapContainer.current,
    //   longitude: lng,
    //   latitude: lat,
    //   className: `${styles.marker}`,
    // });
    // console.log(map.current._canvas);
    // marker.addTo(map.current._canvas);
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // add markers to map

  return (
    <div>
      <Filters />
      <div className={styles.sidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      {/* <Map className={styles.mapContainer} initialViewState={initialViewState}>
        <Marker longitude={initialViewState.center[0]} latitude={initialViewState.center[1]} anchor="bottom"></Marker>
      </Map> */}
      <div ref={mapContainer} className={styles.mapContainer}>
        {/* <Marker longitude={lng} latitude={lan}>
          <circle r={8} fill="#F53" />
        </Marker> */}
      </div>
    </div>
  );
}
export default MyMap;
