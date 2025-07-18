import React from "react";
import { Box, Button, Typography, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function OtpSection({
  otpSent,
  otpMethod,
  setOtpMethod,
  otpInput,
  setOtpInput,
  otpError,
  sendOtp,
  verifyOtp,
  otpVerified,
  isFormValid,
}) {
  return (
    <>
      {!otpSent && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Choose OTP delivery method:
          </Typography>
          <RadioGroup row value={otpMethod} onChange={(e) => setOtpMethod(e.target.value)}>
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="mobile" control={<Radio />} label="Mobile" />
          </RadioGroup>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={sendOtp}
            disabled={!isFormValid}
          >
            Send OTP
          </Button>
        </Box>
      )}

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
    </>
  );
}