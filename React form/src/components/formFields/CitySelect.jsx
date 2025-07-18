import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { countryCityMap } from "../../Constants/CountryCity";


export default function CitySelect({ formik }) {
  const country = formik.values.country;
  return (
    <FormControl
      fullWidth
      margin="normal"
      disabled={!country}
      error={formik.touched.city && Boolean(formik.errors.city)}
    >
      <InputLabel id="city-label">City</InputLabel>
      <Select
        labelId="city-label"
        id="city"
        name="city"
        value={formik.values.city}
        label="City"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {country &&
          countryCityMap[country].map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
      </Select>
      {formik.touched.city && formik.errors.city && (
        <FormHelperText>{formik.errors.city}</FormHelperText>
      )}
    </FormControl>
  );
}
