import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector} from "../store/hooks";
import { selectAllCountries, fetchAllCountries, selectCountriesLoading, selectCountriesError } from "../store/slices/countriesSlice";
import { Button, Grid, Grid2, Menu, MenuItem, TextField, Typography } from "@mui/material";
import CountryCard from "./CountryCard";

import { Country } from "../types/country";

import FilterDropDown from "./Filter";


const CountriesList = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector(selectAllCountries);
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);

    //fetching and displaying all countries
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

     if(loading){return <div>Loading...</div>}
     if(error){return <div>Error: {error}</div>}

    

    return (
        <div> 
        <Typography variant="h4" component="h1" gutterBottom> Countries </Typography>


        <TextField type="text" label="search" value={searchInput} onChange={handleSearch}></TextField>

        {/* <Button id="filter" onClick={handleFilter}>Filter</Button> */}
        <FilterDropDown options={['Ascending order', 'Descending order', 'CurrencyType']}/>


        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {filteredCountries.map((country)=> 
            
                <Grid item xs={12} sm={6} md={4} lg={3}>
                <CountryCard country={country} />
                </Grid>
        
        )}
       </Grid2>
        </div>
    );

};

export default CountriesList;