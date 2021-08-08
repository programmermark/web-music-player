import { ICatListState } from "./catlist";
import { ILoginState } from "./login";
import { IPlayerState } from "./player";
import { IPlaylistState } from "./playlist";

export interface IRootStateTypes {
  player: IPlayerState;
  login: ILoginState;
  playlist: IPlaylistState;
  catList: ICatListState;
}
export interface IAllStateTypes extends IRootStateTypes {
  ModulePlayer: IPlayerState;
  ModuleLogin: ILoginState;
  ModulePlaylist: IPlaylistState;
  ModuleCatList: ICatListState;
}
