import type {
  IPlayListSubscriber,
  ISongDetail,
} from "@/stores/interface/player";
import type { IPlaylistInfo } from "./playDetail";

export interface IPlaylistDetailState {
  playlistInfo?: IPlaylistInfo;
  songList: ISongDetail[];
  subscribers: IPlayListSubscriber[];
}
