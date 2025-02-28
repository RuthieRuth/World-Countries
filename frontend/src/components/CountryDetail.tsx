import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllCountries, selectAllCountries, selectCountriesError, selectCountriesLoading } from "../store/slices/countriesSlice";
import { useEffect } from "react";


const CountryDetail = () => {
    const {name} = useParams();
    const countries = useAppSelector(selectAllCountries);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);

    const country = countries.find((country) => country.name.common.toLowerCase() === decodeURIComponent(name || ""));

    console.log(name);
    console.log("countries: ", countries);
    console.log("country: ", country);


    useEffect(() => {
        if(!country){dispatch(fetchAllCountries())}
    }, [country, dispatch]);

    return (
        <div> Single Detail of a country </div>
    );
};

export default CountryDetail;