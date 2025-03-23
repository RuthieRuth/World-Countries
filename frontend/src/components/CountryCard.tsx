//import { Box, Stack } from "@mui/material";
//import { Button } from "@mui/material";

import { Card, CardActionArea, CardActions, CardContent, CardMedia } from "@mui/material";
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
  console.log("Country from CountryCard:", country)

  // i want to display every card to be of the same height and width and have them displyed 3 or 4 cards in a row

  return (
    <Card 
      style={{
      height: "350px",
      width: "250px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "10px",
      }}
    >
      <CardMedia
      component="img"
      height="140"
      image={country.flags.png}
      alt={`${country.name.common} flag`}
      sx={{
        objectFit: "cover",
        borderBottom: "1px solid #ddd",
      }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
      <CardActionArea>
        <Link
        to={`/countries/${encodeURIComponent(country.name.common)}`}
        key={country.name.common}
        >
        <div>
          <h2>{country.name.common}</h2>
          <p>Population: {country.population}</p>
          <p>Capital: {country.capital}</p>
        </div>
        </Link>
      </CardActionArea>
      </CardContent>
      <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
      <FavouriteButton country={country} />
      </CardActions>
    </Card>
  );
};

export default CountryCard;
