import type { ISong } from "@/stores/interface/latest-music";
import type { ISongDetail } from "@/stores/interface/player";
import type { IAlbum } from "../../artist-detail/interface";

export interface IAlbumDetailState {
  albumInfo?: IAlbum;
  songList: ISong[];
}

export interface IAlbumDetail {
  album: IAlbum /** 专辑详情 */;
  songs: ISongDetail[] /** 专辑歌曲列表 */;
}
