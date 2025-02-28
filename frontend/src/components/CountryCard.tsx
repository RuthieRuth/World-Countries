//import { Box, Stack } from "@mui/material";

interface CountryCardProps {
    flag: string;
    name: string;
    population: number;
}

const CountryCard: React.FC<CountryCardProps> = ({ flag, name, population}) => {

    return (

        <div>
            <img src={flag} alt={`${name}`} />
            <h2>{name}</h2>
            <p>Population: {population}</p>
        </div>
    );
}

export default CountryCard;