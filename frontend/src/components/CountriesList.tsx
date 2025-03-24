import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectAllCountries,
  fetchAllCountries,
  selectCountriesLoading,
  selectCountriesError,
} from "../store/slices/countriesSlice";
import {
  Box,
  Container,
  Grid,
  Grid2,
  Pagination,
  TextField,
} from "@mui/material";
import CountryCard from "./CountryCard";

import { Country } from "../types/country";

import FilterDropDown from "./Filter";

//import { useNavigate } from "react-router-dom";

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

  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  //const navigate = useNavigate();
  const [page, setPage] = useState(1); // why 1? because we want to start from page
  const countriesPerPage = 20;

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  // Search manually typed country
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const searchInput = event.target.value;
    setSearchInput(searchInput);
    console.log(searchInput);

    if (searchInput === "") {
      dispatch(fetchAllCountries());
    } else {
      const filteredCountries = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredCountries(filteredCountries);
    }
  };

  // Filter by dropdown
  const handleFilter = (sortedCountries: Country[]) => {
    setFilteredCountries(sortedCountries);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  //Pagination
  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("clicked");

    setPage(value);
    // navigate(`/?page=${value}`);
  };

  const indexOfLastCountry = page * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  console.log(currentCountries);

  return (
    <div>
      {/* <Typography variant="h4" component="h1" gutterBottom> Countries </Typography> */}
      <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          
        }}
      >
        <TextField
          type="text"
          label="search"
          value={searchInput}
          onChange={handleSearch}
          sx={{width: "80%"}}
        ></TextField>

        <FilterDropDown onFilter={handleFilter} />
      </Box>
      

      <Grid2 container justifyContent="center" alignItems="center">
        <Pagination
          count={Math.ceil(filteredCountries.length / countriesPerPage)}
          color="primary"
          onChange={pageChange}
          page={page}
          sx={{ mb: 5 }}
        />
      </Grid2>

      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {currentCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid2>

      <Grid2 container justifyContent="center" alignItems="center">
        <Pagination
          count={Math.ceil(filteredCountries.length / countriesPerPage)}
          color="primary"
          onChange={pageChange}
          page={page}
          sx={{ mt: 5 }}
        />
      </Grid2>
      </Container>
    </div>
  );
};

export default CountriesList;
