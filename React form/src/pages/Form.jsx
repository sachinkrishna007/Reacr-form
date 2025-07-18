import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useFormik } from "formik";
import CountrySelect from "../components/CountrySelect";
import CitySelect from "../components/CitySelect";
import IdNumberField from "../components/IdNumberField";
import EmailField from "../components/Email";
import MobileField from "../components/Mobile";
import FileUpload from "../components/FileUpload";
import OtpSection from "../components/OtpSection";
import { validationSchema } from "../utils/validationSchema";


export default function Form() {
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
    validationSchema,
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

        <CountrySelect formik={formik} />
        <CitySelect formik={formik} />
        <IdNumberField formik={formik} />
        <EmailField formik={formik} />
        <MobileField formik={formik} />
        <FileUpload
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          fileErrors={fileErrors}
          setFileErrors={setFileErrors}
        />
        <OtpSection
          otpSent={otpSent}
          otpMethod={otpMethod}
          setOtpMethod={setOtpMethod}
          otpInput={otpInput}
          setOtpInput={setOtpInput}
          otpError={otpError}
          sendOtp={sendOtp}
          verifyOtp={verifyOtp}
          otpVerified={otpVerified}
          isFormValid={formik.isValid}
        />

        {otpVerified && (
          <Alert severity="success" sx={{ mt: 2 }}>
            OTP Verified! You can now submit the form.
          </Alert>
        )}

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
          disabled={
            !otpVerified || !formik.isValid || selectedFiles.length === 0
          }
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
