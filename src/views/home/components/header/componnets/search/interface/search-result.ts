export interface ISearchSuggestArtist {
  id: number;
  name: string /** 歌手名 */;
}

export interface ISearchSuggestSong {
  id: number;
  name: string /** 歌曲名 */;
  artists: ISearchSuggestArtist[];
}

export interface ISearchSuggestAlbum {
  id: number;
  name: string /** 专辑名 */;
  artist: ISearchSuggestArtist;
}

export interface ISearchSuggestPlaylist {
  id: number;
  name: string /** 歌单名 */;
}

export interface ISearchSuggest {
  albums?: ISearchSuggestAlbum[] /** 专辑列表 */;
  songs?: ISearchSuggestSong[] /** 歌曲列表 */;
  artists?: ISearchSuggestArtist[] /** 歌手列表 */;
  playlists?: ISearchSuggestPlaylist[] /** 歌单列表 */;
}
