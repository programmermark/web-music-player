const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player.immortalboy.cn/player"
    : "";
const imgServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player.immortalboy.cn/player"
    : "";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player.immortalboy.cn/player"
    : "";

export { baseUrl, serverUrl, imgServerUrl };
