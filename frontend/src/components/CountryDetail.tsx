import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAllCountries,
  selectAllCountries,
  selectCountriesError,
  selectCountriesLoading,
} from "../store/slices/countriesSlice";
import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import WeatherReport from "./WeatherReport";
import CountryMap from "./CountryMap";
import SingleCountryLeafletMap from "./CountryMap";

const CountryDetail = () => {
  const { name } = useParams();
  const countries = useAppSelector(selectAllCountries);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);
  const navigate = useNavigate(); // hook to navigate to other pages

  const country = countries.find(
    (country) =>
      country.name.common.toLowerCase() ===
      decodeURIComponent(name || "").toLowerCase()
  );

  //testing phase
  //console.log(name);
  //console.log("countries: ", countries);
  //console.log("country: ", country);
  //console.log("capital: ", country.capital);

  useEffect(() => {
    if (!country) {
      dispatch(fetchAllCountries());
    }
  }, [country, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!country) {
    return <div>Country not found</div>;
  }

  //Button to go back
  const goBack = () => {
    navigate(-1); // go back to the previous page
  };

  //console.log("Country from state:", country);
  console.log(`location: ${country.latlng}`); //straight forward
  console.log(`what: ${country.maps?.googleMaps}`); //straight forward
  //console.log(`Latitude: ${country.latlng[0]}, Longitude: ${country.latlng[1]}`); // detailed

  return (
    <Container>
      <Button variant="contained" onClick={goBack} sx={{ mt: 2 }}>
        Go back
      </Button>
  <Box sx={{ maxWidth: 1000, m: "auto", textAlign: "center" }}>
    <Box
      component="img"
      src={country.flags.svg}
      alt={country.flags.alt || `Flag of ${country.name.common}`}
      sx={{ height: 150, width: "30%",  m: "auto", borderRadius: 8 }}
      // objectFit: "contain",
    />

    <Typography variant="h4" gutterBottom sx={{ textTransform: "uppercase" }}>{country.name.common}</Typography>
    <Typography variant="h6" gutterBottom>Official name: {country.name.official}</Typography>

    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-start"
      gap={10}
      mt={3}
    >
      <Box>
        <Typography variant="body1">Population: {country.population}</Typography>
        <Typography variant="body1">Capital: {country.capital?.join(", ")}</Typography>
        <Typography variant="body1">Region: {country.region}</Typography>
        <Typography variant="body1">Subregion: {country.subregion}</Typography>
        <Typography variant="body1">Country Abbreviation: {country.cca3}</Typography>
        <Typography variant="body1">
          Currency:{" "}
          {Object.values(country.currencies || {})
            .map((currency) => currency.name)
            .join(", ")}
        </Typography>
      </Box>

      <Box mt={3} mb={3}>
        <Typography variant="body1">{<WeatherReport country={country} />}</Typography>
      </Box>
    </Box>

    <Box mt={4}>
      <Typography variant="body1">{<CountryMap country={country} />}</Typography>
    </Box>
  </Box>
</Container>

  );
};

export default CountryDetail;
