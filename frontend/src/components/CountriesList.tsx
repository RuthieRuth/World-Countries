import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector} from "../store/hooks";
import { selectAllCountries, fetchAllCountries, selectCountriesLoading, selectCountriesError } from "../store/slices/countriesSlice";
import { TextField, Typography } from "@mui/material";
import CountryCard from "./CountryCard";
import { Form, Link } from "react-router-dom";
import { Country } from "../types/country";


const CountriesList = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector(selectAllCountries);
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);

    useEffect(() => {
        dispatch(fetchAllCountries());
    }, [dispatch]);

    console.log(countries);

    
     const [searchInput, setSearchInput] = useState<string>('');
     const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

    useEffect(() => {
        setFilteredCountries(countries);
    }
    , [countries]);

     //const handleSearch
     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            const searchInput = event.target.value;
            setSearchInput(searchInput);
            console.log(searchInput);

            if(searchInput === ""){
                dispatch(fetchAllCountries());
            }
            else{
                const filteredCountries = countries.filter((country) => {
                    return country.name.common.toLowerCase().includes(searchInput.toLowerCase());
                });
                setFilteredCountries(filteredCountries);
            }
     }

    return (
        <div> 
        <Typography variant="h4" component="h1" gutterBottom> Countries </Typography>

        <TextField type="text" label="search" value={searchInput} onChange={handleSearch}></TextField>


        {filteredCountries.map((country)=> 
            <Link to={`/countries/${encodeURIComponent(country.name.common)}`} key={country.name.common}>
                <CountryCard country={{
                    name:country.name.common,
                    population:country.population,
                    flag:country.flags.png //country.flag.svg
                    }} />
            </Link>
        )}
      
        </div>
    );

};

export default CountriesList;