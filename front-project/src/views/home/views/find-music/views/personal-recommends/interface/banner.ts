export interface IBanner {
  imageUrl: string /** 图片地址 */;
  targetId: number;
  targetType: number;
  exclusive: boolean /** 是否独家，但是字段应该是废弃 */;
  titleColor: string /** 底部水印标题的文字颜色 */;
  typeTitle: string /** 底部水印标题的文字内容 */;
  encodeId: string;
  scm: string;
}
