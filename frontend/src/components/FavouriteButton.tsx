// find out if the country is a favourite n can be imported into the country card

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Country } from "../types/country";
import { favouritesApi } from "../api/services/favourites";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface FavouriteButtonProps {
  country: Country;
  onToggle?: (isFavourite: boolean) => void;
}
const FavouriteButton = ({ country, onToggle }: FavouriteButtonProps) => {
  const { user } = useAuth();
  //if(!user) return null; // not needed
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsIntialized] = useState(false);

  useEffect(() => {
    if (!user || isInitialized) return;

    const checkFavouriteStatus = async () => {
      try {
        const status = await favouritesApi.isFavorite(country.name.common);
        setIsFavourite(status);
        setIsIntialized(true);
      } catch (error) {
        console.log("Error checking favourite status:", error);
      }
    };
    checkFavouriteStatus();
  }, [country.name.common, isInitialized, user]);

  //handling toggling of favourites
  const handleToggleFavourites = async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (isFavourite) {
        await favouritesApi.removeFavourite(country.name.common);
        setIsFavourite(false);
      } else {
        await favouritesApi.addFavourite(country);
        setIsFavourite(true);
      }

      if (onToggle) {
        onToggle(!isFavourite);
      }
    } catch (error) {
      console.log("Error toggling favourite:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Tooltip
      title={isFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      <IconButton
        onClick={handleToggleFavourites}
        disabled={loading}
        color="primary"
      >
        {isFavourite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};
export default FavouriteButton;
