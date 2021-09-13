import { Ref } from "vue";

export interface IUseAudioParams {
  audioRef: Ref<HTMLAudioElement>;
  playNext: () => void;
}

export interface IUseAudioReturn {
  initAudio: () => void /** 初始化音乐播放器 */;
}
