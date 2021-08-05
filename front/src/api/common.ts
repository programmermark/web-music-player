const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player-server.immortalboy.cn"
    : "";
const imgServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player-server.immortalboy.cn"
    : "";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player-server.immortalboy.cn"
    : "";

export { baseUrl, serverUrl, imgServerUrl };
