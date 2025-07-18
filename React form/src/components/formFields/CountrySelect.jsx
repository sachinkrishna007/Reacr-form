import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { countryCityMap } from "../../Constants/CountryCity";


export default function CountrySelect({ formik }) {
  return (
    <FormControl
      fullWidth
      margin="normal"
      error={formik.touched.country && Boolean(formik.errors.country)}
    >
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        name="country"
        value={formik.values.country}
        label="Country"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {Object.keys(countryCityMap).map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      {formik.touched.country && formik.errors.country && (
        <FormHelperText>{formik.errors.country}</FormHelperText>
      )}
    </FormControl>
  );
}