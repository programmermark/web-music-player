import PersonalRecommendApis from "./right-content/personal-recommend/index";
import LoginBox from "./left-content/login-box/index";
import UserPlayList from "./left-content/playlist/index";

const apis = {
  ...PersonalRecommendApis,
  ...LoginBox,
  ...UserPlayList,
};

export { apis };
