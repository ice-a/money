<!-- 编码: UTF-8 -->
<!-- 相对路径: ./src/App.vue -->
<!-- 文件名: App.vue -->
<!-- 主应用组件 - 配置整体页面布局和路由视图 -->

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// 主应用组件，提供路由视图容器
</script>

<style>
/* 全局样式 */
#app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Element Plus 组件样式覆盖 */
.el-container {
  min-height: 80vh;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.el-aside {
  background-color: #fff;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.el-main {
  background-color: #f5f5f5;
  padding: 20px;
}

.el-footer {
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  text-align: center;
  line-height: 60px;
}
</style>