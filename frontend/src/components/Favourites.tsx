import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAppSelector } from "../store/hooks";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { CountryFavorite } from "../types/favourites";
import { favouritesApi } from "../api/services/favourites";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import CountryCard from "./CountryCard";



const Favourites = () => {

    const {user} = useAuth(); //is there a user logged in? then continue with useEffect
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favourites, setFavourites] = useState<CountryFavorite[]>([]); // somewhere to store favourites

    const allCountries = useAppSelector(selectAllCountries); // get all countries

    useEffect(() => {
        if (!user) return // cant we do a next line return in curly braces?

        const fetchFavourites = async () => {
            setLoading(true);
            setError(null); // clear previous errors

            try{
                const data = await favouritesApi.getFavorites();
                setFavourites(data);
            }
            catch(error){
                console.log("Error fetching favourites:", error);
                setError("Error fetching favourites. Please try again later.");
            }
            finally{
                setLoading(false);
            }
        };
        fetchFavourites();
    }, [user]);


    //
    const convertToCountry = (favourite: CountryFavorite) => {
        const fullCountry = allCountries.find((country) => country.name.common === favourite.country_name);

        if(fullCountry){return fullCountry;} // if the country is found, return it
        return{
            name: {
                common: favourite.country_name,
                official: favourite.country_name
            },
            cca3: favourite.country_code,
            flags: {
                png: favourite.country_flag,
                svg: favourite.country_flag
            },
            region: "Favourites",
            subregion: "Favorites",
            population: 0,
            capital : ["Favourites"],
            currencies: {
                FAV:{
                    name: "Favourite Currency",
                    symbol: "FAV" // some random symbol use unicode character command, control space
                },
            },
            languages: {
                FAV:"Favourite Language"
            },
        };
    };

    if (!user) {
        return <div>Log in to view your favourites.</div>;
    }

    if (loading){
        return <Box sx={{display: "flex", justifyContent: "center", p:4}}>Loading...
            <CircularProgress />
        </Box>;
    }
    return(
        <Box sx={{p:3}}>
            <Typography variant="h4" gutterBottom>
                My Favourite Countries
            </Typography>

            {error && (
                <Alert severity="error" sx={{mb:3}}>
                    {error}
                </Alert>
            )}

            {
            favourites.length === 0 
            ? (<Alert severity="info">You have Favourites</Alert>) 
            : (<Grid container spacing={2}>
                {favourites.map((favourite) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={favourite.id}>
                        <CountryCard country={convertToCountry(favourite)} />
                    </Grid>
                ))}
            </Grid>)
            }
        </Box>

    )

 };

export default Favourites;