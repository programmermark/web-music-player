/**
 * 实现路由懒加载的工具函数
 * @param {string} viewPath  view的相对路径，相对于src目录
 */
export function lazyLoad(viewPath: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${viewPath}.vue`);
}
