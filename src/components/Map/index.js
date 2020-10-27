import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import { showDataOnMap } from "../../util";

import "./styles.css";

function Map({ country, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          className="countryInfo"
        />
        {/* Loop trough countries and draw circles on the screen */}
        {showDataOnMap(country, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map;
