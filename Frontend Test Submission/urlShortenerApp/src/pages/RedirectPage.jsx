import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { CircularProgress, Container, Typography } from "@mui/material";

export default function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await api.get(`/redirect/${shortcode}`);
        if (res.data?.longUrl) {
          window.location.href = res.data.longUrl;
        }
      } catch {
        console.error("Redirection failed");
      }
    };
    redirect();
  }, [shortcode]);

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <CircularProgress />
      <Typography>Redirecting...</Typography>
    </Container>
  );
}
