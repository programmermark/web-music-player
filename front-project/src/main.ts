import { createApp } from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/common/css/tailwind.css";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

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

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
