import { Box, Card, Grid2, Typography } from "@mui/material";
import asia from "../images/asia.svg";
import africa from "../images/africa.svg";
import europe from "../images/europe.svg";
import oceania from "../images/oceania.svg";
import americas from "../images/americas.svg";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const filterRegion = (region: string) => {
    console.log("Filter by region");
    navigate(`/countries/region/${region}`);
  };

  return (
    <div>
      <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>

      <h2 className="text-center" style={{ textAlign: "center" }}>Welcome to ONE WORLD</h2>
        <Box sx={{ maxWidth: '50%', margin: '0 auto', marginBottom: 2 }}>
        <Typography sx={{ marginBottom: 6 }} >Here you can find information about countries all over the world. 
          Click on the countries tab to see a list of all countries, click on a continent to display countries represented by their flags. Also access countries from this page by picking the continent of your choice. Search for a specific country and even have your favourite countries saved. Explore and enjoy!
        </Typography>
        </Box>

        <Grid2
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          spacing={10}
          columns={{ xs: 1, sm: 2, md: 3 }}
          
        >
          <Card
            component="img"
            src={asia}
            sx={{ width: "200px", height: "200px" , border: '2px solid' }}
            alt="asia"
            onClick={() => filterRegion("asia")}
          />
          <Card
            component="img"
            src={africa}
            sx={{ width: "200px", height: "200px", border: '2px solid'  }}
            alt="africa"
            onClick={() => filterRegion("africa")}
          />
          <Card
            component="img"
            src={europe}
            sx={{ width: "200px", height: "200px", border: '2px solid'  }}
            alt="europe"
            onClick={() => filterRegion("europe")}
          />
          <Card
            component="img"
            src={oceania}
            sx={{ width: "200px", height: "200px", border: '2px solid'  }}
            alt="oceania"
            onClick={() => filterRegion("oceania")}
          />
          <Card
            component="img"
            src={americas}
            sx={{ width: "200px", height: "200px", border: '2px solid'  }}
            alt="northAmerica"
            onClick={() => filterRegion("americas")}
          />
        </Grid2>
      </Box>
    </div>
  );
};

export default Home;
