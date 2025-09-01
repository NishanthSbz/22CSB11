import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import api from "../api/api";

export default function StatsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats");
        setStats(res.data);
      } catch {
        setStats([]);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Shortened URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.longUrl}</TableCell>
                <TableCell>{s.shortUrl}</TableCell>
                <TableCell>{s.createdAt}</TableCell>
                <TableCell>{s.clicks}</TableCell>
                <TableCell>{s.expiration}</TableCell>
                <TableCell>{s.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
