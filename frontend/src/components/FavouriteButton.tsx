// find out if the country is a favourite n can be imported into the country card

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Country } from "../types/country";
import { favouritesApi } from "../api/services/favourites";
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface FavouriteButtonProps {
  country: Country;
  onToggle?: (isFavourite: boolean) => void;
}
const FavouriteButton = ({ country, onToggle }: FavouriteButtonProps) => {
  const { user } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsIntialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || isInitialized) return;

    const checkFavouriteStatus = async () => {
      try {
        const status = await favouritesApi.isFavorite(country.name.common);
        setIsFavourite(status);
        setIsIntialized(true);
      } catch (error: any) {
        console.error("Error checking favourite status:", error);
        // Don't show error for table not found on initial check
        // Only log it
        setIsIntialized(true);
      }
    };
    checkFavouriteStatus();
  }, [country.name.common, isInitialized, user]);

  //handling toggling of favourites
  const handleToggleFavourites = async () => {
    if (!user) {
      setError("Please log in to add favorites");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (isFavourite) {
        await favouritesApi.removeFavourite(country.name.common);
        setIsFavourite(false);
        console.log("Removed from favorites:", country.name.common);
      } else {
        await favouritesApi.addFavourite(country);
        setIsFavourite(true);
        console.log("Added to favorites:", country.name.common);
      }

      // Clear cache to refresh favorites list
      favouritesApi.clearCache();

      if (onToggle) {
        onToggle(!isFavourite);
      }
    } catch (error: any) {
      console.error("Error toggling favourite:", error);
      const errorMessage = error?.message || "Failed to update favorite. Please check if the table exists in Supabase.";
      setError(errorMessage);
      
      // If it's a table not found error, provide helpful message
      if (error?.message?.includes("table") || error?.message?.includes("country_favorites")) {
        setError("Favorites table not found. Please create the 'country_favorites' table in Supabase.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <Tooltip
        title={isFavourite ? "Remove from favourites" : "Add to favourites"}
      >
        <IconButton
          onClick={handleToggleFavourites}
          disabled={loading}
          color="primary"
          aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavourite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
export default FavouriteButton;
