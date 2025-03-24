import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchAllCountries,
  selectAllCountries,
  selectCountriesError,
  selectCountriesLoading,
} from "../store/slices/countriesSlice";
import { useEffect, useState } from "react";
import { Country } from "../types/country";
import { Typography } from "@mui/material";

const CountryRegion = () => {
   
  const {region} = useParams();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);
  const params = useParams();
  const [filteredRegions, setFilteredRegions] = useState<Country[]>([]);


    useEffect(() => {
      if (countries.length === 0) {
        dispatch(fetchAllCountries());
      }
    }, [countries, dispatch]);

  console.log("region", params.region);
  console.log("countries", countries);

  useEffect(() => {
    if (countries.length > 0) {
      const filtered = countries.filter(
        (country) => country.region.toLowerCase() === region?.toLowerCase()
      );
      setFilteredRegions(filtered);
    }
  }, [countries, region]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <Typography variant="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
          Continent: {region?.toUpperCase()}
        </Typography>

        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', listStyle: 'none', padding: 0 }}>
        {filteredRegions.map((country) => (
        <Link to={`/countries/${encodeURIComponent(country.name.common)}`}> 
          <li key={country.name.common} >
            {country.name.common}
          </li>
        </Link>
        ))}
        </ul>
    </div>
  );
};

export default CountryRegion;

 /* useEffect(() => {
    if (countries.length > 0) {
      const filtered = countries.filter(
        (country) => country.region.toLowerCase() === region?.toLowerCase()
      );
      setFilteredRegions(filtered);
    }
  }, [countries, region]);
 */
//   const filteredRegions = countries.filter(
//     (country) => country.region.toLowerCase() === params.region
//   );
//   console.log("filteredRegions", filteredRegions);

 /*  const filteredRegions = () => {
    const region = countries.filter((country) => country.region === 'Africa');
    console.log('region', region);
    } */
