import type { ArtistAreaLabel } from "./artist-rank-card";

export interface IPageState {
  limit: number /** 每页条数 */;
  offset: number /** 分页偏移量 */;
}

/**
 * 语种类别option
 */
export interface ILanguageCatOption<K = ArtistAreaLabel, V = string | number> {
  label: K;
  value: V;
}
