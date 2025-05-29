<!-- 编码: UTF-8 -->
<!-- 相对路径: ./src/components/HeaderComponent.vue -->
<!-- 文件名: HeaderComponent.vue -->
<!-- 头部组件 - 显示网站信息和图片轮播幻灯片 -->

<template>
  <div class="header-container">
    <!-- 网站标题和信息 -->
    <div class="header-info">
      <h1 class="site-title">
        <el-icon class="title-icon"><Star /></el-icon>
        自定义导航系统
      </h1>
      <p class="site-description">一站式服务导航平台</p>
    </div>
    
    <!-- 一言显示区域 -->
    <div class="hitokoto-container">
      <div class="hitokoto-content" v-if="hitokotoText">
        <span class="hitokoto-text">『{{ hitokotoText }}』</span>
        <span class="hitokoto-from" v-if="hitokotoFrom">—— {{ hitokotoFrom }}</span>
      </div>
      <div class="hitokoto-content" v-else>
        <span class="hitokoto-text">『加载中...』</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Star, Monitor, Setting, DataAnalysis, Connection } from '@element-plus/icons-vue'
import axios from 'axios'

// 一言数据
const hitokotoText = ref('')
const hitokotoFrom = ref('')

// 获取一言数据
const fetchHitokoto = async () => {
  try {
    const response = await axios.get('https://v1.hitokoto.cn/')
    hitokotoText.value = response.data.hitokoto
    hitokotoFrom.value = response.data.from
  } catch (error) {
    console.error('获取一言数据失败:', error)
    hitokotoText.value = '人生最曼妙的风景，是内心的淡定与从容。'
    hitokotoFrom.value = '一言'
  }
}

// 组件挂载时获取一言
onMounted(() => {
  fetchHitokoto()
})
</script>

<style scoped>
/* 头部容器样式 */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  padding: 0 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* 网站信息样式 */
.header-info {
  flex: 1;
}

.site-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  font-size: 1.4rem;
  color: #FFD700;
}

.site-description {
  font-size: 0.7rem;
  margin: 0;
  opacity: 0.9;
  font-weight: 300;
}

/* 一言容器样式 */
.hitokoto-container {
  width: 300px;
  height: 3vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.hitokoto-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  max-width: 100%;
}

.hitokoto-text {
  font-size: 0.7rem;
  font-style: italic;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
}

.hitokoto-from {
  font-size: 0.6rem;
  opacity: 0.8;
  color: white;
  text-align: right;
  margin-top: 2px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 10px;
    gap: 10px;
  }
  
  .hitokoto-container {
    width: 100%;
    justify-content: center;
  }
  
  .hitokoto-content {
    align-items: center;
    text-align: center;
    max-width: 90%;
  }
  
  .hitokoto-text {
    max-width: 100%;
  }
  
  .site-title {
    font-size: 1rem;
    text-align: center;
  }
  
  .site-description {
    text-align: center;
    font-size: 0.6rem;
  }
}
</style>