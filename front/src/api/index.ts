import LoginBoxApis from "./left-content/login-box/index";
import UserPlayListApis from "./left-content/playlist/index";
import HeaderApis from "./left-content/header/index";
import PersonalRecommendApis from "./right-content/personal-recommend/index";
import PlaylistApis from "./right-content/playlist/index";
import RankListApis from "./right-content/ranklist/index";
import ArtistListApis from "./right-content/artistlist/index";
import ArtistDetailApis from "./right-content/artist-detail/index";
import LatestSongsApis from "./right-content/latest-music/index";
import AlbumDetailApis from "./right-content/album-detail/index";
import ArtistRankListApis from "./right-content/artist-rank-list/index";
import ExclusiveBroadcastApis from "./right-content/exclusive-broadcast/index";
import MVDetailApis from "./common/mv-detail/index";
import SongDetailApis from "./common/song-detail/index";
import LoginStatusApis from "./common/login-status/index";

const apis = {
  ...HeaderApis,
  ...LoginBoxApis,
  ...UserPlayListApis,
  ...PersonalRecommendApis,
  ...PlaylistApis,
  ...RankListApis,
  ...ArtistListApis,
  ...ArtistDetailApis,
  ...LatestSongsApis,
  ...AlbumDetailApis,
  ...ArtistRankListApis,
  ...ExclusiveBroadcastApis,
  ...MVDetailApis,
  ...SongDetailApis,
  ...LoginStatusApis,
};

export { apis };
