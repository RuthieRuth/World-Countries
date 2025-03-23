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
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import WeatherReport from "./WeatherReport";
import CountryMap from "./CountryMap";
// import SingleCountryLeafletMap from "./CountryMap";

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

  //console.log(name);
  //console.log("countries: ", countries);
  console.log("country: ", country);
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

  // Map issue
  // const shortUrl = country.maps?.googleMaps;
  // if (!shortUrl) {
  //   console.error("Google Maps URL not available for this country.");
  // }

  // const convertToEmbedUrl = (shortURL) => {
  //   if (shortURL && shortURL.includes("goo.gl/maps/")) {
  //     // Convert it to embeddable Google Maps URL
  //     return `https://www.google.com/maps/embed?pb=${
  //       shortURL.split("goo.gl/maps/")[1]
  //     }`;
  //   }
  //   // If the URL is already an embed link, return it as is
  //   return shortURL;
  // };

  // const googleMapsUrl = country.maps?.googleMaps
  //   ? convertToEmbedUrl(country.maps.googleMaps)
  //   : null;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={goBack}
        sx={{ mb: 4 }}
      >
        Back
      </Button>

      <Container>
      <Card
        sx={{ maxWidth: 1000, m: "auto", justifyContent: "center", alignItems: "center"}}>
        <CardMedia
          component="img"
          image={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          sx={{ height: 150, width: "50%", objectFit: "contain", m: "auto" }}
         />
        <CardContent >
          <Typography variant="h4" gutterBottom>{country.name.common}{" "}</Typography>
          <Typography variant="h6" gutterBottom>Official name: {country.name.official}</Typography>
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
        </CardContent>
          {/* DELETE */}
          {/* <Typography variant="body1">Latitude: {country.latlng?.[0]}</Typography>
          <Typography variant="body1">Longitude: {country.latlng?.[1]}</Typography> */}

          <CardContent sx={{mt:3,mb:3}}> <Typography variant="body1">{<WeatherReport country={country} />} </Typography></CardContent>
          {/* <Typography variant="body1">{<WeatherReport country={country} />}</Typography> */}
          <Card sx={{m:"auto", }}><Typography variant="body1">{<CountryMap country={country} />}</Typography></Card>
       
      </Card>
      </Container>
    </div>
  );
};

export default CountryDetail;
