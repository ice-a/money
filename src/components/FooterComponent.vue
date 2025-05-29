<!-- 编码: UTF-8 -->
<!-- 相对路径: ./src/components/FooterComponent.vue -->
<!-- 文件名: FooterComponent.vue -->
<!-- 底部组件 - 显示底部信息、备案信息等 -->

<template>
  <div class="footer-container">
    <!-- 底部主要内容 -->
    <div class="footer-content">
      <!-- 网站信息 -->
      <div class="footer-section">
        <div class="footer-info">
          <span class="footer-text">
            © 2024 自定义导航系统 - 一站式服务导航平台
          </span>
          <span class="footer-divider">|</span>
          <span class="footer-text">
            <el-icon class="footer-icon"><Location /></el-icon>
            为您提供优质的网络服务导航
          </span>
        </div>
      </div>
      
      <!-- 一言区域 -->
      <div class="footer-section hitokoto-section">
        <div class="hitokoto-content" v-if="hitokotoText">
          <span class="hitokoto-text">『{{ hitokotoText }}』</span>
          <span class="hitokoto-from" v-if="hitokotoFrom">—— {{ hitokotoFrom }}</span>
        </div>
        <div class="hitokoto-content" v-else>
          <span class="hitokoto-text">『加载中...』</span>
        </div>
      </div>
    </div>
    
    <!-- 底部状态栏 -->
    <div class="footer-status">
      <div class="status-item">
        <el-icon class="status-icon"><CircleCheck /></el-icon>
        <span class="status-text">服务正常运行</span>
      </div>
      <div class="status-item">
        <el-icon class="status-icon"><Timer /></el-icon>
        <span class="status-text">最后更新: {{ lastUpdateTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Location, Document, Lock, Message, CircleCheck, Timer } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

// 响应式数据
const lastUpdateTime = ref('')
const hitokotoText = ref('')
const hitokotoFrom = ref('')

// 获取一言数据
const fetchHitokoto = async () => {
  try {
    const response = await axios.get('https://v1.hitokoto.cn/')
    console.log('获取一言数据成功:', response)
    hitokotoText.value = response.data.hitokoto
    hitokotoFrom.value = response.data.from
  } catch (error) {
    console.error('获取一言数据失败:', error)
    hitokotoText.value = '人生最曼妙的风景，是内心的淡定与从容。'
    hitokotoFrom.value = '一言'
  }
}




// 格式化当前时间
const formatCurrentTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 组件挂载时设置更新时间和获取一言
onMounted(() => {
  lastUpdateTime.value = formatCurrentTime()
  fetchHitokoto()
})
</script>

<style scoped>
/* 底部容器样式 */
.footer-container {
  background: linear-gradient(135deg, #f8f9fc 0%, #e9ecef 100%);
  color: #333;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  min-height: 5vh;
  height: 5vh;
  border-top: 1px solid #e4e7ed;
}

/* 底部主要内容样式 */
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  flex: 1;
}

.footer-section {
  display: flex;
  align-items: center;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-text {
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.9;
}

.footer-icon {
  font-size: 0.8rem;
}

.footer-divider {
  color: rgba(255, 255, 255, 0.6);
  margin: 0 5px;
}

/* 一言区域样式 */
.hitokoto-section {
  max-width: 50%;
}

.hitokoto-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.hitokoto-text {
  font-size: 0.7rem;
  font-style: italic;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.hitokoto-from {
  font-size: 0.6rem;
  opacity: 0.7;
  margin-top: 2px;
}

/* 底部链接样式 */
.footer-links {
  display: flex;
  align-items: center;
  gap: 5px;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 5px;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.footer-link:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.footer-link .el-icon {
  font-size: 0.7rem;
}

/* 底部状态栏样式 */
.footer-status {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.6rem;
  opacity: 0.8;
}

.status-icon {
  font-size: 0.7rem;
  color: #67C23A;
}

.status-text {
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 5px;
    padding: 5px 15px 0;
    text-align: center;
  }

  .footer-info {
    flex-direction: column;
    gap: 2px;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-status {
    padding: 2px 15px;
  }

  .footer-text {
    font-size: 0.6rem;
  }

  .footer-link {
    font-size: 0.6rem;
  }

  .status-item {
    font-size: 0.5rem;
  }

  .hitokoto-section {
    max-width: 100%;
    margin-top: 3px;
  }

  .hitokoto-content {
    align-items: center;
    text-align: center;
  }
}
</style>