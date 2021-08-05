const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player.immortalboy.cn/"
    : "";
const imgServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://image.web-music-player.cn/"
    : "";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player.immortalboy.cn/"
    : "";

export { baseUrl, serverUrl, imgServerUrl };
