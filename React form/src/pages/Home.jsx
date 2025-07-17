import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const countryCityMap = {
  UAE: ["Dubai", "Abu Dhabi"],
  India: ["Mumbai", "Delhi"],
  USA: ["New York", "Los Angeles"],
};

const mobileRegex = /^\d{10}$/;
const MAX_FILES = 5;
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];



export default function DynamicFormWithOTP() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMethod, setOtpMethod] = useState("email");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");

  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      idNumber: "",
      email: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      idNumber: Yup.string()
        .required("ID Number is required")
        .test("idNumber-format", function (value) {
          const { country } = this.parent;
          if (!value) return false;

          if (country === "India") {
        const aadhaarRegex = /^\d{12}$/;
        if (!aadhaarRegex.test(value)) {
          return this.createError({ message: "Aadhaar must be exactly 12 digits" });
        }
      }

         else if (country === "UAE") {
        const emiratiIdRegex = /^\d{3}-\d{4}-\d{7}-\d{1}$/;
        if (!emiratiIdRegex.test(value)) {
          return this.createError({
            message: "Emirates ID must be in format 000-0000-0000000-0",
          });
        }
      }

      else if (country === "USA") {
        const ssnRegex = /^\d{9}$/;
        if (!ssnRegex.test(value)) {
          return this.createError({ message: "SSN must be exactly 9 digits" });
        }
      }
          return true;
        }),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(mobileRegex, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    }),
    onSubmit: () => {
      alert("Form submitted successfully!");
      formik.resetForm();
      setSelectedFiles([]);
      setFileErrors([]);
      setOtpSent(false);
      setOtpVerified(false);
      setOtpInput("");
      setOtpMethod("email");
    },
  });

 
  useEffect(() => {
    formik.setFieldValue("city", "");
    formik.setFieldValue("idNumber", "");
  }, [formik.values.country]);


  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const errors = [];

    if (files.length > MAX_FILES) {
      errors.push(`You can upload up to ${MAX_FILES} files only.`);
    }

    files.forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`${file.name} is not a supported format.`);
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds 1MB size limit.`);
      }
    });

    if (errors.length > 0) {
      setFileErrors(errors);
      setSelectedFiles([]);
    } else {
      setFileErrors([]);
      setSelectedFiles(files);
    }
  };

 
  const sendOtp = () => {
    if (!formik.isValid) {
      formik.setTouched({
        country: true,
        city: true,
        idNumber: true,
        email: true,
        mobile: true,
      });
      return;
    }
    setOtpSent(true);
    setOtpVerified(false);
    setOtpInput("");
    setOtpError("");
    alert(
      `OTP sent to your ${
        otpMethod === "email" ? formik.values.email : formik.values.mobile
      } (For demo, OTP is 123456)`
    );
  };


  const verifyOtp = () => {
    if (otpInput === "123456") {
      setOtpVerified(true);
      setOtpError("");
    } else {
      setOtpError("Invalid OTP, please try again.");
      setOtpVerified(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <form style={{ width: 400 }} onSubmit={formik.handleSubmit} noValidate>
        <Typography variant="h5" mb={3} textAlign="center">
React Form
        </Typography>

        {/* Country */}
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

        {/* City */}
        <FormControl
          fullWidth
          margin="normal"
          error={formik.touched.city && Boolean(formik.errors.city)}
          disabled={!formik.values.country}
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
            {formik.values.country &&
              countryCityMap[formik.values.country].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
          </Select>
          {formik.touched.city && formik.errors.city && (
            <FormHelperText>{formik.errors.city}</FormHelperText>
          )}
        </FormControl>

        {/* Dynamic ID Field */}
        {formik.values.country && (
          <TextField
            fullWidth
            margin="normal"
            id="idNumber"
            name="idNumber"
            label={
              formik.values.country === "India"
                ? "Aadhaar Number"
                : formik.values.country === "UAE"
                ? "Emirates ID (format: 000-0000-0000000-0)"
                : "SSN"
            }
            value={formik.values.idNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
            helperText={formik.touched.idNumber && formik.errors.idNumber}
          />
        )}

        {/* Email */}
        <TextField
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* Mobile */}
        <TextField
          fullWidth
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

        {/* File Upload */}
        <Box mt={2} mb={1}>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept=".pdf,image/jpeg,image/png,.doc,.docx"
            multiple
            onChange={handleFileChange}
            style={{ display: "block", marginBottom: 8 }}
          />
          {fileErrors.length > 0 &&
            fileErrors.map((err, idx) => (
              <Typography
                key={idx}
                variant="caption"
                color="error"
                display="block"
              >
                {err}
              </Typography>
            ))}
          {selectedFiles.length > 0 && (
            <Typography variant="body2" color="textSecondary">
              Selected Files: {selectedFiles.map((f) => f.name).join(", ")}
            </Typography>
          )}
        </Box>

        {/* OTP Method Selection */}
        {!otpSent && (
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Choose OTP delivery method:
            </Typography>
            <RadioGroup
              row
              name="otpMethod"
              value={otpMethod}
              onChange={(e) => setOtpMethod(e.target.value)}
            >
              <FormControlLabel value="email" control={<Radio />} label="Email" />
              <FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
            </RadioGroup>
          </FormControl>
        )}

        {/* Send OTP button */}
        {!otpSent && (
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={sendOtp}
            disabled={!formik.isValid}
          >
            Send OTP
          </Button>
        )}

        {/* OTP Input and Verify */}
        {otpSent && !otpVerified && (
          <Box mt={2}>
            <TextField
              fullWidth
              label="Enter OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              error={Boolean(otpError)}
              helperText={otpError || "Enter the 6-digit OTP sent to you"}
              inputProps={{ maxLength: 6 }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={verifyOtp}
              disabled={otpInput.length !== 6}
            >
              Verify OTP
            </Button>
          </Box>
        )}

        {/* OTP verified message */}
        {otpVerified && (
          <Alert severity="success" sx={{ mt: 2 }}>
            OTP Verified! You can now submit the form.
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
          disabled={!otpVerified || !formik.isValid || selectedFiles.length === 0}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
