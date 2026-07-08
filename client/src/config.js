const apiURL = import.meta.env.VITE_API_URL;

if (!apiURL) {
  const errMsg = "VITE_API_URL environment variable is missing! Please configure VITE_API_URL in your client/.env file or deployment settings.";
  console.error("CRITICAL CONFIGURATION ERROR:", errMsg);
  throw new Error(errMsg);
}

export const API_URL = apiURL;
