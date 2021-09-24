import { createApp } from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
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

const modules = import.meta.glob("./components/**/MP[A-Z]w+.vue");
Object.keys(modules).forEach((fileName: string) => {
  // 获取组件配置
  const componentConfig = modules[fileName];

  // 获取组件的 PascalCase 名
  const componentName = upperFirst(
    camelCase(
      // 获取目录深度无关的文件名
      (fileName.split("/").pop() as string).replace(/\.\w+$/, "")
    )
  );

  app.component(
    componentName,
    // 否则回退到模块的根。
    componentConfig
  );
});

app.use(store, key).use(router).use(ElementPlus).mount("#app");
