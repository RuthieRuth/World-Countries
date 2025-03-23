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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <h2>Continent: {region?.toUpperCase()}</h2>
        {filteredRegions.map((country) => (
        <Link to={`/countries/${encodeURIComponent(country.name.common)}`}> <li key={country.name.common}>{country.name.common}</li></Link>
   
        ))}
    </div>
  );
};

export default CountryRegion;
