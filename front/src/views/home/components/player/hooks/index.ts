import { Ref } from "vue";
import { ISongState } from "../interface";
import { IUseAudioReturn } from "./interface";

export const useAudio = (
  audioRef: Ref<HTMLAudioElement>,
  songState: ISongState,
  playNext: () => void
): IUseAudioReturn => {
  /** 初始化音乐播放器 */
  const initAudio = () => {
    const ele = audioRef.value;

    // 音频缓冲事件
    ele.onprogress = () => {
      try {
        if (ele.buffered.length > 0) {
          songState.songDuration = ele.duration;
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    // 开始播放音乐
    ele.onplay = () => {
      songState.isPause = false;
    };
    // 获取当前播放时间
    ele.ontimeupdate = () => {
      songState.playedSongDuration = ele.currentTime;
      songState.playRate = ele.currentTime / ele.duration;
    };
    // 当前音乐播放完毕
    ele.onended = () => {
      console.log("歌曲播放完毕");
      // if (that.mode === playMode.loop) {
      //   that.loop();
      // } else {
      //   that.next();
      // }
      playNext();
    };
    // 音乐播放出错
    ele.onerror = () => {
      // if (retry === 0) {
      //   let toastText = "当前音乐不可播放，已自动播放下一曲";
      //   if (that.playlist.length === 1) {
      //     toastText = "没有可播放的音乐哦~";
      //   }
      //   that.$mmToast(toastText);
      //   that.next(true);
      // } else {
      //   // eslint-disable-next-line no-console
      //   console.log("重试一次");
      //   retry -= 1;
      //   ele.url = that.currentMusic.url;
      //   ele.load();
      // }
      // console.log('播放出错啦！')
    };
    // 音乐进度拖动大于加载时重载音乐
    ele.onstalled = () => {
      // ele.load();
      // that.setPlaying(false);
      // let timer;
      // clearTimeout(timer);
      // timer = setTimeout(() => {
      //   that.setPlaying(true);
      // }, 10);
    };
    // 将能播放的音乐加入播放历史
    ele.oncanplay = () => {
      // retry = 1;
      // if (
      //   that.historyList.length === 0 ||
      //   that.currentMusic.id !== that.historyList[0].id
      // ) {
      //   that.setHistory(that.currentMusic);
      // }
    };
    // 音频数据不可用时
    ele.onstalled = () => {
      // ele.load();
      // that.setPlaying(false);
      // let timer;
      // clearTimeout(timer);
      // timer = setTimeout(() => {
      //   that.setPlaying(true);
      // }, 10);
    };
    // 当音频已暂停时
    ele.onpause = () => {
      // that.setPlaying(false);
    };
  };

  return {
    initAudio,
  };
};
