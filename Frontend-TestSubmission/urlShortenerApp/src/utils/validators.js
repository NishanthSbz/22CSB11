export const isValidUrl = (url) => {
  const pattern = /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/.*)?$/;
  return pattern.test(url);
};

export const isValidShortcode = (code) => /^[a-zA-Z0-9]{6,10}$/.test(code);

export const isValidMinutes = (val) => Number.isInteger(Number(val)) && Number(val) >= 0 && Number(val) <= 1440;
