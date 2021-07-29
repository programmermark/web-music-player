import { createApp } from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/popover.css";

const app = createApp(App);

const requireComponent = require.context(
  // 组件文件夹的相对路径
  "./components",
  // 是否查找子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName: string) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 名
  const componentName = upperFirst(
    camelCase(
      // 获取目录深度无关的文件名
      (fileName.split("/").pop() as string).replace(/\.\w+$/, "")
    )
  );

  app.component(
    componentName,
    // 在 `.default` 上查找组件选项。
    // 如果组件导出了 `export default` 的话，该选项会存在。
    // 否则回退到模块的根。
    componentConfig.default || componentConfig
  );
});

app.use(store).use(router).use(ElementPlus).mount("#app");
