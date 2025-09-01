import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import api from "../api/api";
import { isValidUrl, isValidShortcode, isValidMinutes } from "../utils/validators";

export default function UrlInputForm({ onShorten }) {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [error, setError] = useState("");

  const handleChange = (i, field, value) => {
    const updated = [...urls];
    updated[i][field] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

    const handleSubmit = async () => {
      setError("");
      
      for (let i = 0; i < urls.length; i++) {
        const { longUrl, validity, shortcode } = urls[i];
        if (!isValidUrl(longUrl)) {
          setError(`Row ${i + 1}: Invalid URL`);
          return;
        }
        if (validity && !isValidMinutes(validity)) {
          Log("frontend", "warn", "utils", `Invalid validity period: ${validity}`);
          setError(`Row ${i + 1}: Invalid validity period`);
          return;
        }
        if (shortcode && !isValidShortcode(shortcode)) {
          Log("frontend", "warn", "utils", `Invalid shortcode format: ${shortcode}`);
          setError(`Row ${i + 1}: Invalid shortcode`);
          return;
        }
      }

      try {
        Log("frontend", "debug", "api", `Sending request to shorten ${urls.length} URLs`);
        const res = await api.post("/shorten", { urls });
        Log("frontend", "info", "api", `Successfully shortened ${urls.length} URLs`);
        onShorten(res.data);
      } catch (err) {
        Log("frontend", "error", "api", `URL shortening failed: ${err.message}`);
        setError("Failed to shorten URLs. Try again.");
      }
    };

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Shorten URLs</Typography>
      {urls.map((u, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Long URL"
            value={u.longUrl}
            onChange={(e) => handleChange(i, "longUrl", e.target.value)}
          />
          <TextField
            label="Validity (min)"
            value={u.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
          />
          <TextField
            label="Shortcode"
            value={u.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
          />
        </Box>
      ))}
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
        <Button variant="outlined" onClick={addField}>Add More</Button>
      </Box>
    </Paper>
  );
}
