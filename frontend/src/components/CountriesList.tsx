import { useEffect } from "react";
import { useAppDispatch, useAppSelector} from "../store/hooks";
import { selectAllCountries, fetchAllCountries, selectCountriesLoading, selectCountriesError } from "../store/slices/countriesSlice";
import { CardMedia, Typography } from "@mui/material";
import CountryCard from "./CountryCard";


const CountriesList = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector(selectAllCountries);
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);

    useEffect(() => {
        dispatch(fetchAllCountries());
    }, [dispatch]);

    console.log(countries);

    return (
        <div> 
        <Typography variant="h4" component="h1" gutterBottom> Countries </Typography>

        {countries.map((country)=> 
            <CountryCard sx = {{height:250}} 
            name={country.name.common} 
            population={country.population}
            flag={country.flags.png}    
            />
        )}
        
        </div>

        

    );

};

export default CountriesList;