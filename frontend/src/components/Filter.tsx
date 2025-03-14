import { Button } from '@mui/material';
import { useState } from 'react';

interface FilterDropDownProps {
  options: string[];
}

const FilterDropDown = ({ options }: FilterDropDownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
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
  );
};

export default FilterDropDown;
