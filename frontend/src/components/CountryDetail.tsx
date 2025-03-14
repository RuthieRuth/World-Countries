import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllCountries, selectAllCountries, selectCountriesError, selectCountriesLoading } from "../store/slices/countriesSlice";
import { useEffect } from "react";
import { Button, Card, CardContent, CardMedia,Typography } from "@mui/material";
import WeatherReport from "./WeatherReport";


const CountryDetail = () => {
    const {name} = useParams();
    const countries = useAppSelector(selectAllCountries);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);

    //const {capital} = useParams();
     
    const navigate= useNavigate();


    const country = countries.find((country) => country.name.common.toLowerCase() === decodeURIComponent(name || "").toLowerCase());

    //console.log(name);
    //console.log("countries: ", countries);
    console.log("country: ", country);
    //console.log("capital: ", country.capital);


    useEffect(() => {
        if(!country){dispatch(fetchAllCountries())}
    }, [country, dispatch]);

    if(loading){return <div>Loading...</div>}
    if(error){return <div>Error: {error}</div>}

    if(!country){return <div>Country not found</div>}

    
    const goBack = () => {
        navigate(-1); // go back to the previous page
    };
   
    //console.log("Country from state:", country);
    console.log(`${country.latlng}`); //straight forward
    //console.log(`Latitude: ${country.latlng[0]}, Longitude: ${country.latlng[1]}`); // detailed


    //weather api
    // const [weather, setWeather] = useState<Weather | null>(null);
    // const [weatherLoading, setWeatherLoading] = useState(false);
    // const [weatherError, setWeatherError] = useState<string | null>(null);

    // useEffect(()=> {
    //     const fetchWeather = async () => {
    //         if(!country?.capital?[0]) return;
    //         setWeatherLoading(true);
    //         setWeatherError(null);
    //     };
    //     fetchWeather();
    // }, [country]);

    return (
        <div> 
           <Button variant="contained" color="primary" onClick={goBack} sx={{mb:4}}>Back</Button>

           <Card >
                <CardMedia 
                    component="img"
                    height="300"
                    width="50"
                    image={country.flags.svg}
                    alt={country.flags.alt || `Flag of ${country.name.common}`}
                />
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>Country: {country.name.common}</Typography>
                    <Typography variant="h6" component="h2" gutterBottom>Official name: {country.name.official}</Typography>

                    <Typography variant="body1">Population: {country.population}</Typography>
                    <Typography variant="body1">Capital: {country.capital?.join(", ")}</Typography>
                    <Typography variant="body1">Region: {country.region}</Typography>
                    <Typography variant="body1">Subregion: {country.subregion}</Typography>
                    <Typography variant="body1">Country Code: {country.cca3}</Typography>
                    <Typography variant="body1">Currency: {Object.values(country.currencies || {}).map((currency) => currency.name).join(", ")}</Typography>
                    
                    <Typography variant="body1">Location: {country.location?.capital}</Typography>
                    <Typography variant="body1">Latitude: {country.latlng?.[0]}</Typography>
                    <Typography variant="body1">Longitude: {country.latlng?.[1]}</Typography>

                    <Typography variant="h6" component="h2" gutterBottom>Weather: </Typography>
                    <Typography variant="body1">Weather with component: {<WeatherReport country={country} />
                }</Typography>

                </CardContent>
            </Card>



              {/*  <Grid2 container justifyContent="center" alignItems="center" >

                
             <CountryCard  
                    country={{
                        name: country.name.common,
                        population: country.population,
                        flag: country.flags?.svg || "",
                        location: country.capital?.[0],
                        // latlng: country.location?.latlng[0]
                        
                    }}
                /> */}
                {/* <WeatherReport /> */}
            {/* </Grid2> */}
        </div>
    );
};

export default CountryDetail;