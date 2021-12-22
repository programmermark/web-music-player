import router from "@/router";

/** 跳转到MV详情 */
export const gotoMVDetail = (id?: number | string) => {
  if (id) {
    router.push(`/mv/${id}`);
  }
};

/** 跳转到歌手详情 */
export const gotoArtistDetail = (id?: number) => {
  if (id) {
    router.push(`/artist/${id}`);
  }
};

/** 前往专辑详情 */
export const gotoAlbumDetail = (id?: number) => {
  if (id) {
    router.push(`/albumDetail/${id}`);
  }
};

/** 跳转到歌单详情页面 */
export const gotoPlaylistDetail = (id?: number) => {
  if (id) {
    router.push(`/playlistDetail/${id}`);
  }
};

/** 跳转到搜索结果页面 */
export const gotoSearchContent = (keywords: string) => {
  router.push(`/search-content/${keywords}`);
};

/** 跳转到歌手排行榜详情 */
export const gotoArtistRankList = (type?: number) => {
  let url = "/artistRankList";
  if (type) {
    url = `/artistRankList?type=${type}`;
  }
  router.push(url);
};

/** 跳转到电台详情 */
export const gotoDjDetail = (id?: number) => {
  console.log("前往电台详情页面，电台id：" + id);
};

/** 跳转至歌手详情页面 */
export const gotoSingerDetail = (id?: number) => {
  if (id) {
    router.push(`/artist/${id}`);
  }
};

/** 跳转到歌单详情 */
export const gotoPlayListDetail = (id?: number) => {
  if (id) {
    router.push(`/playlistDetail/${id}`);
  }
};

/** 跳转到歌单列表 */
export const gotoPlaylistPage = (tagName: string) => {
  router.push(`/playlist?cat=${tagName}`);
};
