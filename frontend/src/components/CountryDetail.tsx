import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllCountries, selectAllCountries, selectCountriesError, selectCountriesLoading } from "../store/slices/countriesSlice";
import { useEffect } from "react";
import { Button } from "@mui/material";
import CountryCard from "./CountryCard";



const CountryDetail = () => {
    const {name} = useParams();
    const countries = useAppSelector(selectAllCountries);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);
     
    const navigate= useNavigate();


    const country = countries.find((country) => country.name.common.toLowerCase() === decodeURIComponent(name || "").toLowerCase());

    console.log(name);
    console.log("countries: ", countries);
    console.log("country: ", country);


    useEffect(() => {
        if(!country){dispatch(fetchAllCountries())}
    }, [country, dispatch]);

    if(loading){return <div>Loading...</div>}
    if(error){return <div>Error: {error}</div>}

    const goBack = () => {
        navigate(-1); // go back to the previous page
    };
   
    console.log("Country from state:", country);

    return (
        <div> 
           <Button variant="contained" color="primary"onClick={goBack}>Back</Button>

            <CountryCard 
                country={{
                    name: country.name.common,
                    population: country.population,
                    flag: country.flags?.png || "",
                }}
            />
        </div>
    );
};

export default CountryDetail;