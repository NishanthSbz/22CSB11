import { Log } from "../../../../Logging Middleware/logger";

export const isValidUrl = (url) => {
  const pattern = /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/.*)?$/;
  const isValid = pattern.test(url);
  if (!isValid) {
    Log("frontend", "debug", "utils", `URL validation failed for: ${url}`);
  }
  return isValid;
};

export const isValidShortcode = (code) => {
  const isValid = /^[a-zA-Z0-9]{6,10}$/.test(code);
  if (!isValid) {
    Log("frontend", "debug", "utils", `Shortcode validation failed: ${code}`);
  }
  return isValid;
};

export const isValidMinutes = (val) => {
  const isValid = Number.isInteger(Number(val)) && Number(val) >= 0 && Number(val) <= 1440;
  if (!isValid) {
    Log("frontend", "debug", "utils", `Minutes validation failed: ${val}`);
  }
  return isValid;
};
