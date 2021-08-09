import PersonalRecommendApis from "./right-content/personal-recommend/index";
import PlaylistApis from "./right-content/playlist/index";
import LoginBoxApis from "./left-content/login-box/index";
import UserPlayListApis from "./left-content/playlist/index";
import RankListApis from "./right-content/ranklist/index";
import artistListApis from "./right-content/artistlist/index";

const apis = {
  ...PersonalRecommendApis,
  ...PlaylistApis,
  ...LoginBoxApis,
  ...UserPlayListApis,
  ...RankListApis,
  ...artistListApis,
};

export { apis };
