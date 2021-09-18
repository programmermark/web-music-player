import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import "./assets/css/popover.scss";
import "./assets/css/notification.scss";
import "./common/css/common.scss";
import "./common/css/tailwind.css";

const app = createApp(App);

app.use(store, key).use(router).use(ElementPlus).mount("#app");
