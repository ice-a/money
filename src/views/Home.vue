<!-- 编码: UTF-8 -->
<!-- 相对路径: ./src/views/Home.vue -->
<!-- 文件名: Home.vue -->
<!-- 主页面组件 - 配置整体布局，包含Header、Sider、Content、Footer组件 -->

<template>
  <el-container class="layout-container">
    <!-- 头部组件 - 固定在顶部5%位置 -->
    <el-header height="5vh" class="fixed-header">
      <HeaderComponent />
    </el-header>
    
    <!-- 中间内容区域 - 填充剩余空间 -->
    <el-container class="main-container">
      <!-- 侧边栏组件 -->
      <el-aside width="250px" class="main-aside">
        <SiderComponent 
          :current-type="currentType" 
          @type-change="handleTypeChange"
        />
      </el-aside>
      
      <!-- 主内容区域 -->
      <el-main class="main-content">
        <ContentComponent 
          :current-type="currentType" 
          :config-data="configData"
        />
      </el-main>
    </el-container>
    
    <!-- 底部组件 - 固定在底部5%位置 -->
    <el-footer height="5vh" class="fixed-footer">
      <FooterComponent />
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import HeaderComponent from '../components/HeaderComponent.vue'
import SiderComponent from '../components/SiderComponent.vue'
import ContentComponent from '../components/ContentComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

// 响应式数据
const currentType = ref('VPN') // 默认选中VPN类型
const configData = ref([]) // 配置数据

// 处理类型切换
const handleTypeChange = (type) => {
  currentType.value = type
}

// 加载配置数据
const loadConfigData = async () => {
  try {
    const response = await axios.get('/config.json')
    configData.value = response.data
    console.log('配置数据加载成功:', configData.value)
  } catch (error) {
    console.error('加载配置数据失败:', error)
    // 如果加载失败，使用默认数据
    configData.value = [
      {
        "id": "1",
        "type": "VPN",
        "name": "bigme",
        "url": "https://1s.bigmeok.me/user#/register?code=ZTrIUOBr",
        "desc": "速度较快"
      },
      {
        "id": "2",
        "type": "server",
        "name": "腾讯云服务器",
        "url": "https://curl.qcloud.com/JgTpb4jm",
        "desc": "国内较好的一个服务器提供商"
      },
      {
        "id": "3",
        "type": "VPN",
        "name": "赔钱机场",
        "url": "https://pqjc.site/#/register?code=VX5cofnG",
        "desc": "国内较好的一个服务器提供商"
      }
    ]
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadConfigData()
})
</script>

<style scoped>
/* 主页面样式 */
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5vh !important;
  z-index: 1000;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-container {
  position: absolute;
  top: 5vh;
  bottom: 5vh;
  left: 0;
  right: 0;
  display: flex;
  overflow: hidden;
}

.main-aside {
  height: 100%;
  overflow-y: auto;
  flex-shrink: 0;
}

.main-content {
  height: 100%;
  overflow-y: auto;
  flex: 1;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5vh !important;
  z-index: 1000;
  padding: 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.el-header {
  padding: 0;
}

.el-aside {
  border-right: 1px solid #e4e7ed;
}

.el-main {
  padding: 0;
  background-color: #f8f9fa;
}

.el-footer {
  padding: 0;
}
</style>