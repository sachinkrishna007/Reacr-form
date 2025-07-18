import React from "react";
import { Box, Typography } from "@mui/material";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export default function FileUpload({ selectedFiles, setSelectedFiles, fileErrors, setFileErrors }) {
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

  return (
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
      {fileErrors.map((err, idx) => (
        <Typography key={idx} variant="caption" color="error" display="block">
          {err}
        </Typography>
      ))}
      {selectedFiles.length > 0 && (
        <Typography variant="body2" color="textSecondary">
          Selected Files: {selectedFiles.map((f) => f.name).join(", ")}
        </Typography>
      )}
    </Box>
  );
}
