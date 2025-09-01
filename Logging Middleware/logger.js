import axios from "axios";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuaXNoYW50aF8yMmNzYjExQGtna2l0ZS5hYy5pbiIsImV4cCI6MTc1NjcxMzU0NSwiaWF0IjoxNzU2NzEyNjQ1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTY2NmNjMWQtOWNiYS00NGMxLTgzNGYtYTM4YmViOTFhMmFjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibmlzaGFudGggciIsInN1YiI6IjgwZTk3YzhjLWE4ZjMtNGRmZi1iMGM4LTQyMTEyOGViNjM4YyJ9LCJlbWFpbCI6Im5pc2hhbnRoXzIyY3NiMTFAa2draXRlLmFjLmluIiwibmFtZSI6Im5pc2hhbnRoIHIiLCJyb2xsTm8iOiIyMmNzYjExIiwiYWNjZXNzQ29kZSI6ImRxWHV3WiIsImNsaWVudElEIjoiODBlOTdjOGMtYThmMy00ZGZmLWIwYzgtNDIxMTI4ZWI2MzhjIiwiY2xpZW50U2VjcmV0IjoiV3NCTWNKblpCRlVhenRQaCJ9.uDm4O1UvBdgQEIJHLXe8VEn2x8-rlC3UJqqAg-mgQBo";

export async function Log(stack, level, pkg, message) {
  try {
    const res = await axios.post(
      LOG_API,
      {
        stack,   // "backend" | "frontend"
        level,   // "debug" | "info" | "warn" | "error" | "fatal"
        package: pkg, // "handler", "db", "api", etc.
        message, // string
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Log failed:", err.response?.data || err.message);
  }
}
