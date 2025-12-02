import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import ProtectedTestData from "./components/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import Favourites from "./components/Favourites";
//import { Home } from "@mui/icons-material";
import Home from "./components/Home";
import CountryRegion from "./components/CountryRegion";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route
                path="/login"
                element={
                  <>
                    <AuthRedirect />
                    <Login />
                  </>
                }
              />
              <Route path="/test" element={<TestData />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedTestData />
                  </ProtectedRoute>
                }
              />
              {/* Other routes... */}
              <Route
                path="/favourites"
                element={
                  <ProtectedRoute>
                    <Favourites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/countries"
                element={
                  <>
                    <CountriesList />
                  </>
                }
              />
              <Route
                path="/countries/region/:region"
                element={
                  <>
                    <CountryRegion />
                  </>
                }
              />
              <Route
                path="/countries/:name"
                element={
                  <>
                    <CountryDetail />
                  </>
                }
              />

              {/* Add a new route for the region  but it routes to countryDetail cos of arrangement*/}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
