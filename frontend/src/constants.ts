export const APP_COLOR = {};

const developmentBackendUrl = "http://127.0.0.1:8000";
const productionBackendUrl = "";

export const BACKEND_URL = process.env.NODE_ENV === "development" ? developmentBackendUrl : productionBackendUrl;

console.log(BACKEND_URL)