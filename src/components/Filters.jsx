import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const fanTypes = ["Ceiling Fan", "Table Fan", "Exhaust Fan", "Wall Fan"];
const brands = ["Crompton", "Havells", "Usha", "Orient", "Bajaj"];
const priceRanges = ["Below ₹1000", "₹1000 - ₹3000", "Above ₹3000"];

export const FilterPanel = ({ onChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    brand: [],
    price: [],
  });

  const handleCheckboxChange = (category, value) => {
    const updated = selectedFilters[category].includes(value)
      ? selectedFilters[category].filter((v) => v !== value)
      : [...selectedFilters[category], value];

    const updatedFilters = { ...selectedFilters, [category]: updated };
    setSelectedFilters(updatedFilters);
    onChange(updatedFilters); // Emit to parent
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Type Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            {fanTypes.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selectedFilters.type.includes(type)}
                    onChange={() => handleCheckboxChange("type", type)}
                  />
                }
                label={type}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Brand Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedFilters.brand.includes(brand)}
                    onChange={() => handleCheckboxChange("brand", brand)}
                  />
                }
                label={brand}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            {priceRanges.map((price) => (
              <FormControlLabel
                key={price}
                control={
                  <Checkbox
                    checked={selectedFilters.price.includes(price)}
                    onChange={() => handleCheckboxChange("price", price)}
                  />
                }
                label={price}
              />
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
