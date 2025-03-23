/* import { Google } from "@mui/icons-material";
import { Country } from "../types/country";

interface CountryMapProps {
  country: Country;
}

const CountryMap = ({ country }: CountryMapProps) => {

  return(
    <div className="container">Map is here
      <div className="map">
        <GoogleMap></GoogleMap>
      </div>
    </div>
  )
};
export default CountryMap; */

//import { useEffect, useState } from "react";
import React from "react";
//import { GoogleGeoCodingResponse } from "../types/map";
import { GoogleMap, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

const CountryMap = ({ country }) => {

  if (!country.latlng) {
    return "No data";
  }
  // console.log("CountryMap", country).latlng[0];
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDlrVkUsg50vhVoAJJnlsqh-i9CqZml8AA",
  });

  const [map, setMap] = React.useState(null);

  const onMapLoad = React.useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({
      lat: country.latlng[0],
      lng: country.latlng[1],
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%" }}
      center={{ lat: country.latlng[0], lng: country.latlng[0] }} //or center={{ lat: country.latlng[0], lng: country.latlng[0] }}
      zoom={4}
      onLoad={onMapLoad} 
    >
    </GoogleMap>
  );
};
export default React.memo(CountryMap);
