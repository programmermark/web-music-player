import { IArtistListState } from "./artistlist";
import { IBulletinState } from "./bulletin";
import { ICatListState } from "./catlist";
import { ILatestMusicState } from "./latest-music";
import { ILoginState } from "./login";
import { IPlayerState } from "./player";
import { IPlaylistState } from "./playlist";
import { IRankListState } from "./ranklist";
import { IRecommendState } from "./recommend";

export interface IRootStateTypes {
  player: IPlayerState;
  login: ILoginState;
  playlist: IPlaylistState;
  catList: ICatListState;
  rankList: IRankListState;
  artistList: IArtistListState;
  recommend: IRecommendState;
  bulletin: IBulletinState;
  latestMusic: ILatestMusicState;
}
export interface IAllStateTypes extends IRootStateTypes {
  ModulePlayer: IPlayerState;
  ModuleLogin: ILoginState;
  ModulePlaylist: IPlaylistState;
  ModuleCatList: ICatListState;
  ModuleRankList: IRankListState;
  ModuleArtistList: IArtistListState;
  ModuleRecommend: IRecommendState;
  ModuleBulletin: IBulletinState;
  ModuleLatestMusic: ILatestMusicState;
}
