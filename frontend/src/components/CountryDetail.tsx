import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllCountries, selectAllCountries, selectCountriesError, selectCountriesLoading } from "../store/slices/countriesSlice";
import { useEffect } from "react";
import { Button, Grid2 } from "@mui/material";
import CountryCard from "./CountryCard";
import WeatherComponent from "./WeatherReport";



const CountryDetail = () => {
    const {name} = useParams();
    const countries = useAppSelector(selectAllCountries);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);

    const {capital} = useParams();
     
    const navigate= useNavigate();


    const country = countries.find((country) => country.name.common.toLowerCase() === decodeURIComponent(name || "").toLowerCase());

    console.log(name);
    //console.log("countries: ", countries);
    console.log("country: ", country);
    console.log("capital: ", capital);


    useEffect(() => {
        if(!country){dispatch(fetchAllCountries())}
    }, [country, dispatch]);

    if(loading){return <div>Loading...</div>}
    if(error){return <div>Error: {error}</div>}

    const goBack = () => {
        navigate(-1); // go back to the previous page
    };

    //weather api
//    const WeatherReport = () => {
//     const [weather, setWeather] = useState<Weather | null>(null);

//    };
   
    console.log("Country from state:", country);


console.log(`${country.latlng}`); //straight forward
console.log(`Latitude: ${country.latlng[0]}, Longitude: ${country.latlng[1]}`); // detailed

    return (
        <div> 
           <Button variant="contained" color="primary"onClick={goBack}>Back</Button>

            <Grid2 container justifyContent="center" alignItems="center" >
                <CountryCard  
                    country={{
                        name: country.name.common,
                        population: country.population,
                        flag: country.flags?.png || "",
                        location: country.capital?.[0],
                        // latlng: country.location?.latlng[0]
                        
                    }}
                />
                {/* <WeatherComponent /> */}
            </Grid2>
        </div>
    );
};

export default CountryDetail;