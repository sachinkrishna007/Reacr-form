import React from "react";
import { TextField } from "@mui/material";
import { formatEmiratesId } from "../utils/Formatters";


export default function IdNumberField({ formik }) {
  const country = formik.values.country;
  const label =
    country === "India"
      ? "Aadhaar Number"
      : country === "UAE"
      ? "Emirates ID (format: 000-0000-0000000-0)"
      : "SSN";

  return (
    country && (
      <TextField
        fullWidth
        margin="normal"
        id="idNumber"
        name="idNumber"
        label={label}
        value={formik.values.idNumber}
        onChange={(e) => {
          let value = e.target.value;
          if (country === "UAE") {
            value = formatEmiratesId(value);
          }
          formik.setFieldValue("idNumber", value);
        }}
        onBlur={formik.handleBlur}
        error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
        helperText={formik.touched.idNumber && formik.errors.idNumber}
      />
    )
  );
}