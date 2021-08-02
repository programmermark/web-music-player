import { ISongDetail } from "@/store/modules/interface/player";
import { IPlaylistInfo } from "./playDetail";

export interface IPlaylistDetailState {
  playlistInfo?: IPlaylistInfo;
  songList: ISongDetail[];
}
