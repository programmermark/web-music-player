import isEqual from "lodash/isEqual";
import type { PlayBackType } from "@/views/player/interface";

/**
 * 随机算法
 * @param arr 原始数组
 * @returns
 */
export const shuffle = function (arr: []) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = arr[randomIndex];

    arr[randomIndex] = arr[i];
    arr[i] = itemAtIndex;
  }
  return arr;
};

/**
 *
 * @param arr 原始数组
 * @param current 当前的数组元素
 * @returns
 */
export function playerShuffle<T>(arr: T[], current: T) {
  /** 随机除去当前元素之外的部分 */
  const rangeArray = arr.filter((item) => !isEqual(item, current));
  for (let i = rangeArray.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = rangeArray[randomIndex];

    rangeArray[randomIndex] = rangeArray[i];
    rangeArray[i] = itemAtIndex;
  }
  return rangeArray[0];
}

/**
 * 返回下一首歌曲
 * @param arr 原始数组
 * @param current 当前的数组元素
 * @param playBackType 播放类型
 */
export function playerNextReOrder<T>(
  arr: T[],
  current: T,
  playBackType: PlayBackType
): T | undefined {
  const findIndex = arr.findIndex((item) => isEqual(item, current));
  if (findIndex === -1) {
    return arr[0];
  }
  const isLastOne = findIndex === arr.length - 1;

  /** 顺序播放 */
  if (playBackType === "in-order") {
    if (isLastOne) {
      return undefined;
    }
    return arr[findIndex + 1];
  } else if (playBackType === "list-loop" || playBackType === "single-cycle") {
    /** 列表循环或者单曲循环 */
    if (isLastOne) {
      return arr[0];
    }
    return arr[findIndex + 1];
  } else if (playBackType === "shuffle") {
    return playerShuffle(arr, current);
  }
}
