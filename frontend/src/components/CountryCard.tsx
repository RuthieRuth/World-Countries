//import { Box, Stack } from "@mui/material";

//import { Button } from "@mui/material";

interface CountryCardProps {
    country:{ 
            flag: string;
            name: string;
            population: number;
        }
}

const CountryCard: React.FC<CountryCardProps> = ({country}) => {

    return (

        <div>
            <img src={country.flag} alt={`${country.name}`} />
            <h2>{country.name}</h2>
            <p>Population: {country.population}</p>
        </div>
    );
}

export default CountryCard;