// 编码: UTF-8
// 相对路径: ./src/main.js
// 文件名: main.js
// Vue3应用主入口文件 - 配置Element Plus、路由和全局设置

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建Vue应用实例
const app = createApp(App)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(ElementPlus)
app.use(router)

// 挂载应用
app.mount('#app')