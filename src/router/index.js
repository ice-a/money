// 编码: UTF-8
// 相对路径: ./src/router/index.js
// 文件名: index.js
// Vue Router路由配置 - 配置应用的路由规则

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '自定义导航系统'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router