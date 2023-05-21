const API_URL = process.env.API_URL as string;
const isProd = process.env.NODE_ENV === "production";
const HOST = isProd ? process.env.HOST : "http://localhost:3000";
const GOOGLE_SITE_VERIFICATION = isProd ? process.env.GOOGLE_SITE_VERIFICATION : "";

export { API_URL, isProd, GOOGLE_SITE_VERIFICATION, HOST };
