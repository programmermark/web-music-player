import type { IArtist } from "@/views/home/views/find-music/views/artist-detail/interface";
import type { ILyric } from "@/views/song-detail/interface/song-lyric";
import type { IDateFormat } from "./interface";

/** 返回指定类型的对象的键名数组 */
export function keysOf<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * 转换传入的时间为指定的格式
 * @param timestamp 时间戳(支持字符串和数字)
 * @param pattern 时间格式，如: yyyy-MM-dd hh:mm:ss
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

/**
 * 格式化月份
 * @param month 月份
 * @returns
 */
export const formatMonth = (month: number): string => {
  if (month < 10) {
    return `0${month}`;
  }
  return `${month}`;
};

/**
 * 格式化时间字符串为时间，时间单位为秒
 * @param timeString 时间字符串，格式为： mm:ss:ss, 如： 00:01:404
 * @returns
 */
export const formatTimeToNumber = (timeString: string) => {
  let time = 0;
  if (timeString) {
    const splitArr = timeString.split(":").map((item) => Number(item));
    return splitArr[0] * 60 + splitArr[1];
  }
  return time;
};

/**
 * 格式化歌词字符串为"时间-歌词"格式的数组
 * @param lyric 歌词字符串
 * @returns
 */
export const formatLyric = (lyric: string) => {
  const lyricParts = lyric.split("\n").filter((item) => item);
  return lyricParts.map((item) => {
    const splitItems = item.split("]");
    const lyricItem: ILyric = {
      time: formatTimeToNumber(splitItems[0].slice(1)),
      text: splitItems[1],
    };
    return lyricItem;
  });
};

/**
 * 根据关键词高亮字符串
 * @param keywords 关键词
 * @param targetString 被高亮的字符串
 * @param classString 高亮设置的class
 */
export const highLightKeywords = (
  keywords: string,
  targetString: string,
  classString = ""
) => {
  if (keywords === "") {
    return targetString;
  }
  return targetString.replaceAll(
    keywords,
    `<span class="${classString}">${keywords}</span>`
  );
};

/**
 * 格式化时间为文字：如10分钟前
 * @param {*} time 时间字符串或者时间戳
 * @param {*} isTimeStamp 是否为时间戳格式
 */
export const formatDateToText = (
  time: string | number,
  isTimeStamp = false
) => {
  let timeString = "";
  if (time) {
    let intervalTime = 0;
    if (!isTimeStamp) {
      intervalTime = Math.floor(
        (Date.now() - Date.parse(time as string)) / 1000
      );
    } else {
      intervalTime = Math.floor((Date.now() - (time as number)) / 1000);
    }
    if (intervalTime < 60) {
      timeString = "1分钟前";
    } else if (intervalTime >= 60 && intervalTime < 3600) {
      timeString = Math.floor(intervalTime / 60) + "分钟前";
    } else if (intervalTime >= 3600 && intervalTime < 3600 * 24) {
      timeString = Math.floor(intervalTime / 3600) + "小时前";
    } else if (intervalTime >= 3600 * 24 && intervalTime < 3600 * 24 * 7) {
      timeString = Math.floor(intervalTime / (3600 * 24)) + "天前";
    } else if (intervalTime >= 3600 * 24 * 7 && intervalTime < 3600 * 24 * 30) {
      timeString = Math.floor(intervalTime / (3600 * 24 * 7)) + "周前";
    } else if (
      intervalTime >= 3600 * 24 * 30 &&
      intervalTime < 3600 * 24 * 365
    ) {
      timeString = Math.floor(intervalTime / (3600 * 24 * 30)) + "个月前";
    } else if (intervalTime >= 3600 * 24 * 365) {
      timeString = Math.floor(intervalTime / (3600 * 24 * 365)) + "年前";
    }
  } else {
    timeString = "缺少时间参数";
  }
  return timeString;
};

/**
 * 歌曲评论格式化时间为文字
 * @param {*} time 时间字符串或者时间戳
 * @param {*} isTimeStamp 是否为时间戳格式
 * @returns
 */
export const formatDateToTextInCommentCase = (
  time: string | number,
  isTimeStamp = false
) => {
  let timeString = "";
  if (time) {
    let intervalTime = 0;
    if (!isTimeStamp) {
      intervalTime = Math.floor(
        (Date.now() - Date.parse(time as string)) / 1000
      );
    } else {
      intervalTime = Math.floor((Date.now() - (time as number)) / 1000);
    }
    if (intervalTime < 60) {
      timeString = "刚刚";
    } else if (intervalTime >= 60 && intervalTime < 3600) {
      timeString = Math.floor(intervalTime / 60) + "分钟前";
    } else if (intervalTime >= 3600 && intervalTime < 3600 * 24) {
      timeString = formatTime(time, "hh:mm");
    } else if (
      intervalTime >= 3600 * 24 &&
      new Date(time).getFullYear() < new Date().getFullYear()
    ) {
      timeString = `昨天 ${formatTime(time, "hh:mm")}`;
    } else {
      timeString = formatTime(time, "yyyy年MM月dd日 hh:mm");
    }
  } else {
    timeString = "缺少时间参数";
  }
  return timeString;
};
