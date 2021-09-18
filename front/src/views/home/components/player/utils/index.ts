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
