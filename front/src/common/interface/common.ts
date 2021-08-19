/**
 * 通用的公共接口定义文件
 */

/**
 * label - value形式的通用接口定义
 */
export interface IOption<T = string | number> {
  label: string;
  value: T;
}
