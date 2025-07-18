import React from "react";
import { TextField } from "@mui/material";

export default function MobileField({ formik }) {
  return (
    <TextField
      margin="normal"
      id="mobile"
      name="mobile"
      label="Mobile Number"
      value={formik.values.mobile}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.mobile && Boolean(formik.errors.mobile)}
      helperText={formik.touched.mobile && formik.errors.mobile}
    />
  );
}
