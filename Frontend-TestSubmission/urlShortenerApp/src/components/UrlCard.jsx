import React from "react";
import { Card, CardContent, Typography, Link } from "@mui/material";

export default function UrlCard({ url }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1"><b>Original:</b> {url.longUrl}</Typography>
        <Typography variant="body1">
          <b>Shortened:</b> <Link href={url.shortUrl} target="_blank">{url.shortUrl}</Link>
        </Typography>
        <Typography variant="body2"><b>Expires:</b> {url.expiration || "30 min default"}</Typography>
      </CardContent>
    </Card>
  );
}
