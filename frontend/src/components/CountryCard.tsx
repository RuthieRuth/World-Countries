//import { Box, Stack } from "@mui/material";
//import { Button } from "@mui/material";

import { Card, CardActionArea, CardActions } from "@mui/material";
import FavouriteButton from "./FavouriteButton";
import { Link } from "react-router-dom";
import { Country } from "../types/country";

// interface CountryCardProps {
//   country: {
//     flags: { svg: string };
//     name: string;
//     population: number;
//     capital?: string[];
//     location?: string;
//     latlng?: number[];
//   };
// }

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  console.log("Country from CountryCard:", country);
  return (
    <Card style={{ height: '450px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardActionArea>
        <Link
          to={`/countries/${encodeURIComponent(country.name.common)}`}
          key={country.name.common}
        >
          <div>
            <img src={country.flags.png} alt={`${country.name}`} />
            <h2>{country.name.common}</h2>
            <p>Population: {country.population}</p>

            <p>Capital: {country.capital}</p>
            {/* <p>Position: {country.}</p> */}
          </div>
        </Link>
      </CardActionArea>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
        <FavouriteButton country={country} />
      </CardActions>
    </Card>
  );
};

export default CountryCard;
