import React, { useState } from "react";
import UrlInputForm from "../components/UrlInputForm";
import UrlCard from "../components/UrlCard";
import { Container, Typography } from "@mui/material";

export default function ShortenerPage() {
  const [shortened, setShortened] = useState([]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <UrlInputForm onShorten={(data) => setShortened(data)} />
      {shortened.map((url, i) => (
        <UrlCard key={i} url={url} />
      ))}
    </Container>
  );
}
