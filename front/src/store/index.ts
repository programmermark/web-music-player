import { createStore } from "vuex";
import ModulePlayer from "./modules/player";

export default createStore({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    player: ModulePlayer,
  },
});
