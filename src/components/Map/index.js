import React from "react";
import "./styles.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

function Map({ countries, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap countries={countries} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
    </div>
  )
}

export default Map;
