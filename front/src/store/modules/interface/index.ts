import { ICatListState } from "./catlist";
import { ILoginState } from "./login";
import { IPlayerState } from "./player";
import { IPlaylistState } from "./playlist";
import { IRankListState } from "./ranklist";

export interface IRootStateTypes {
  player: IPlayerState;
  login: ILoginState;
  playlist: IPlaylistState;
  catList: ICatListState;
  rankList: IRankListState;
}
export interface IAllStateTypes extends IRootStateTypes {
  ModulePlayer: IPlayerState;
  ModuleLogin: ILoginState;
  ModulePlaylist: IPlaylistState;
  ModuleCatList: ICatListState;
  ModuleRankList: IRankListState;
}
