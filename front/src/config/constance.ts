const API_URL = process.env.API_URL as string;
const isProd = process.env.NODE_ENV === "production";

export { API_URL, isProd };
