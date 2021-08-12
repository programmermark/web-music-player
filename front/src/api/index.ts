import PersonalRecommendApis from "./right-content/personal-recommend/index";
import PlaylistApis from "./right-content/playlist/index";
import LoginBoxApis from "./left-content/login-box/index";
import UserPlayListApis from "./left-content/playlist/index";
import RankListApis from "./right-content/ranklist/index";
import ArtistListApis from "./right-content/artistlist/index";
import ArtistDetail from "./right-content/artist-detail/index";

const apis = {
  ...PersonalRecommendApis,
  ...PlaylistApis,
  ...LoginBoxApis,
  ...UserPlayListApis,
  ...RankListApis,
  ...ArtistListApis,
  ...ArtistDetail,
};

export { apis };
