import PersonalRecommendApis from "./right-content/personal-recommend/index";
import PlaylistApis from "./right-content/playlist/index";
import LoginBoxApis from "./left-content/login-box/index";
import UserPlayListApis from "./left-content/playlist/index";

const apis = {
  ...PersonalRecommendApis,
  ...PlaylistApis,
  ...LoginBoxApis,
  ...UserPlayListApis,
};

export { apis };
