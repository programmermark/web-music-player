import { ISong } from "@/store/modules/interface/latest-music";
import { ISongDetail } from "@/store/modules/interface/player";
import { IAlbum } from "../../artist-detail/interface";

export interface IAlbumDetailState {
  albumInfo?: IAlbum;
  songList: ISong[];
}

export interface IAlbumDetail {
  album: IAlbum /** 专辑详情 */;
  songs: ISongDetail[] /** 专辑歌曲列表 */;
}
