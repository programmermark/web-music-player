const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://web-music-player.cn/player"
    : "";
const imgServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://image.web-music-player.cn/player"
    : "";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://web-music-player.cn/player"
    : "";

export { baseUrl, serverUrl, imgServerUrl };
