import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import { useAppSelector } from "../store/hooks";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { Country } from "../types/country";
//import { RootState } from './store';

/* interface FilterDropDownProps {
  options: string[];
  onSelect?: (option: string) => void; 
} */

interface FilterDropDownProps {
  onFilter: (sortedCountries: Country[]) => void;
}

const FilterDropDown: React.FC<FilterDropDownProps> = ({ onFilter }) => {
  const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const countries = useAppSelector(selectAllCountries);

  /*  return (
    <div>
      <Button onClick={() => setIsExpanded(!isExpanded)} variant="contained">
        Filter
      </Button>

      {isExpanded && (
        <ul>
          {options.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  ); */

  // Handle clicks on filter button
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setanchorEl(event.currentTarget); // open menu at button
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  // Sort countries in ascending order
  const ascendingOrder = () => {
    console.log("Ascending order");
    const aTOz = [...countries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    console.log(aTOz);
    //dispatch(fetchAllCountries(aTOz));
    onFilter(aTOz);
    handleClose();
  };

  // Sort countries in descending order
  const descendingOrder = () => {
    console.log("Descending order");
    const zToa = [...countries].sort((a, b) =>
      b.name.common.localeCompare(a.name.common)
    );
    console.log(zToa);
    //dispatch(fetchAllCountries(aTOz));
    onFilter(zToa);
    handleClose();
  };

  // Sort countries by region
  const byRegion = () => {
    console.log("region");
    const region = [...countries].sort((a, b) =>
      a.region.localeCompare(b.region)
    );
    console.log(region);
    onFilter(region);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="primary" >
        Filter
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={ascendingOrder}>A - Z</MenuItem>
        <MenuItem onClick={descendingOrder}>Z - A</MenuItem>
        <MenuItem onClick={byRegion}>Region/ continent</MenuItem>
      </Menu>
    </div>
  );
};

export default FilterDropDown;
