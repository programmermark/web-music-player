import { computed, reactive, Ref } from "vue";
import { ElMessage } from "element-plus";
import { IPlayerState, ISongState, IUsePlayerState } from "../interface";
import { IUseAudioReturn } from "./interface";
import { useStore } from "@/store";
import _ from "lodash";

export const useAudio = (
  audioRef: Ref<HTMLAudioElement>,
  songState: ISongState,
  playNext: () => void,
  autoEndedPlayNext: () => void
): IUseAudioReturn => {
  const store = useStore();

  /** 播放器是否暂停 */
  const isPause = computed(() => store.state.player.isPause);

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
    /** 当 paused 属性由 true 转换为 false 时触发 play 事件，事件触发原因一般为 play() 方法调用，或者 autoplay 标签设置。 */
    // 开始播放音乐
    ele.onplay = (ev: Event) => {};
    // 获取当前播放时间
    ele.ontimeupdate = () => {
      _.debounce(() => {
        store.commit("player/setCurrentTime", ele.currentTime.toFixed(3));
      }, 1000)();

      songState.playedSongDuration = ele.currentTime;
      songState.playRate = ele.currentTime / ele.duration;
    };
    // 当前音乐播放完毕
    ele.onended = () => {
      /** 单曲循环的时候，自动播放下一首应该重新播放当前歌曲 */
      autoEndedPlayNext();
    };
    // 音乐播放出错
    ele.onerror = () => {
      if (!isPause.value) {
        ElMessage({
          showClose: true,
          message: "当前音乐不可播放，已自动播放下一曲",
          type: "error",
          duration: 2000,
        });
        const timer = setTimeout(() => {
          clearTimeout(timer);
          playNext();
        }, 1000);
      }

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
      console.log("音频数据不可用时");

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

/** 播放器状态hooks */
export const usePlayerState = (): IUsePlayerState => {
  const playerState = reactive<IPlayerState>({
    showLyrics: false,
    expandSong: false,
  });

  /** 展开｜关闭 播放列表 */
  const toggleExpandSong = (state: boolean | undefined = undefined) => {
    if (state !== undefined) {
      playerState.expandSong = state;
    } else {
      playerState.expandSong = !playerState.expandSong;
    }
  };

  return {
    playerState,
    toggleExpandSong,
  };
};
