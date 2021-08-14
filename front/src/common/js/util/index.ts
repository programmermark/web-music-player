import { IArtist } from "@/store/modules/interface/artistlist";
import { IDateFormat } from "./interface";

/**
 * 实现路由懒加载的工具函数
 * @param {string} viewPath  view的相对路径，相对于src目录
 */
export function lazyLoad(viewPath: string) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${viewPath}.vue`);
}

/** 返回指定类型的对象的键名数组 */
export function keysOf<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * 转换传入的时间为指定的格式
 * @param timestamp 时间戳(支持字符串和数字)
 * @param pattern 时间格式，如: yyyy-MM-dd
 * @returns
 */
export function formatTime(
  timestamp: number | string = 1585734546,
  pattern = "yyyy-MM-dd hh:mm:ss"
): string {
  let dateObj;
  if (typeof timestamp === "number") {
    dateObj = new Date(timestamp);
  } else if (typeof timestamp === "string") {
    if (!isNaN(Number(timestamp))) {
      dateObj = new Date(Number(timestamp));
    } else {
      const timeString = timestamp.replace(/-/g, "/");
      dateObj = new Date(Date.parse(timeString));
    }
  } else {
    return "请传入时间戳或者时间字符串";
  }
  return dateFormat(dateObj, pattern);
}

/**
 * 把时间对象转换成指定的格式
 * @param date 时间对象
 * @param pattern 时间格式，如: yyyy-MM-dd
 * @returns
 */
function dateFormat(date: Date, pattern: string) {
  if (date instanceof Date) {
    const o: IDateFormat = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        const replaceStr =
          RegExp.$1.length === 1
            ? String(o[k])
            : `00${o[k]}`.substr(String(o[k]).length);
        pattern = pattern.replace(RegExp.$1, replaceStr);
      }
    }
    return pattern;
  } else {
    return date;
  }
}

export function formatNo(no: number): string {
  let result = `${no}`;
  if (no > 0 && no < 10) {
    result = `0${no}`;
  }
  return result;
}

/**
 * 把秒数转换为分钟数
 * @param secondCount 秒数(0-3600)
 * @returns
 */
export const transformSecondToMinute = (secondCount: number): string => {
  if (secondCount > 0 && secondCount < 3600) {
    const minutePartCount = Math.floor(secondCount / 60);
    const secondPartCount = Math.floor(secondCount % 60);
    let minuteStr = String(minutePartCount);
    let secondStr = String(secondPartCount);
    if (minutePartCount < 10) {
      minuteStr = `0${minutePartCount}`;
    }
    if (secondPartCount < 10) {
      secondStr = `0${secondPartCount}`;
    }
    return `${minuteStr}:${secondStr}`;
  }
  return "00:00";
};

/** 转换播放量数量为显示值 */
export const translatePlayCount = (count: number): string | number => {
  if (count > 100000) {
    return Math.ceil(count / 10000) + "万";
  } else {
    return count;
  }
};

/**
 * 格式化歌手数组为字符串
 * @param artists 歌手数组
 * @returns
 */
export const formatArtistListToString = (artists: IArtist[]): string => {
  return artists
    .map((artist) => artist.name)
    .reduce((initValue, currentValue) => initValue + "/" + currentValue);
};
