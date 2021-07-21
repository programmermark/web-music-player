const serverUrl =
  process.env.NODE_ENV === "production" ? "https://immortalboy.cn" : "";
const imgServerUrl =
  process.env.NODE_ENV === "production" ? "https://image.immortalboy.cn" : "";
const baseUrl =
  process.env.NODE_ENV === "production" ? "https://immortalboy.cn/" : "";

export { baseUrl, serverUrl, imgServerUrl };
