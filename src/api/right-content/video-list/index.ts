import { baseUrl } from "@/api/common";

export default {
  /** 获取视频标签列表 */
  videoGroupList: baseUrl + "/video/group/list",
  /** 获取视频分类列表 */
  videoCategoryList: baseUrl + "/video/category/list",
  /** 获取全部类型视频 */
  allVideoList: baseUrl + "/video/timeline/all",
  /** 获取视频标签/分类下的视频 */
  VideoListByCategory: baseUrl + "/video/group",
};
