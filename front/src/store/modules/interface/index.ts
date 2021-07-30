import { ILoginState } from "./login";
import { IPlayerState } from "./player";

export interface IRootStateTypes {
  player: IPlayerState;
  login: ILoginState;
}
export interface IAllStateTypes extends IRootStateTypes {
  ModulePlayer: IPlayerState;
  ModuleLogin: ILoginState;
}
