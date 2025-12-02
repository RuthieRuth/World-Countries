import React from "react";
//import { GoogleGeoCodingResponse } from "../types/map";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { googleMapAPI } from '../config/supabase';

const googleMapApiKey = googleMapAPI;

const CountryMap = ({ country }) => {

  if (!country.latlng) {
    return "No data";
  }
  // console.log("CountryMap", country).latlng[0];
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapApiKey,
  });

  const [map, setMap] = React.useState(null);

  const onMapLoad = React.useCallback((map) => {
    // Store the map instance
    setMap(map);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "100%" }}
      center={{ lat: country.latlng[0], lng: country.latlng[1] }}
      zoom={7}
      onLoad={onMapLoad} 
    >
      <Marker
        position={{ lat: country.latlng[0], lng: country.latlng[1] }}
        icon={{
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new window.google.maps.Size(40, 40),
        }}
/>
    </GoogleMap>
  );
};
export default React.memo(CountryMap);
