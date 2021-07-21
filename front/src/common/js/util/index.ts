/** 返回指定类型的对象的键名数组 */
export function keysOf<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}
