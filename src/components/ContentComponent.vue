<!-- 编码: UTF-8 -->
<!-- 相对路径: ./src/components/ContentComponent.vue -->
<!-- 文件名: ContentComponent.vue -->
<!-- 内容组件 - 显示选中类型的所有服务卡片，支持点击跳转和悬停显示描述 -->

<template>
  <div class="content-container">
    <!-- 内容头部 -->
    <div class="content-header">
      <h2 class="content-title">
        <el-icon class="title-icon">
          <component :is="getTypeIcon(currentType)" />
        </el-icon>
        {{ getTypeDisplayName(currentType) }}
      </h2>
      <div class="content-stats">
        <el-tag type="info" size="small">
          共 {{ filteredData.length }} 个服务
        </el-tag>
      </div>
    </div>
    
    <!-- 服务卡片网格 -->
    <div class="cards-grid" v-if="filteredData.length > 0">
      <el-tooltip
        v-for="item in filteredData"
        :key="item.id"
        :content="item.desc"
        placement="top"
        effect="dark"
        :show-after="500"
      >
        <div 
          class="service-card"
          @click="handleCardClick(item.url)"
        >
          <div class="card-header">
            <el-icon class="card-icon">
              <component :is="getTypeIcon(item.type)" />
            </el-icon>
            <div class="card-badge">
              <el-tag 
                :type="getTagType(item.type)" 
                size="small"
                effect="light"
              >
                {{ item.type }}
              </el-tag>
            </div>
          </div>
          
          <div class="card-body">
            <h3 class="card-title">{{ item.name }}</h3>
            <p class="card-url">{{ formatUrl(item.url) }}</p>
          </div>
          
          <div class="card-footer">
            <el-button 
              type="primary" 
              size="small" 
              :icon="Link"
              @click.stop="handleCardClick(item.url)"
            >
              访问服务
            </el-button>
          </div>
          
          <!-- 悬停效果遮罩 -->
          <div class="card-overlay">
            <el-icon class="overlay-icon"><View /></el-icon>
            <span class="overlay-text">点击访问</span>
          </div>
        </div>
      </el-tooltip>
    </div>
    
    <!-- 空状态 -->
    <div class="empty-state" v-else>
      <el-empty 
        description="暂无相关服务"
        :image-size="120"
      >
        <template #image>
          <el-icon class="empty-icon"><Box /></el-icon>
        </template>
        <el-button type="primary" @click="handleRefresh">
          刷新数据
        </el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Link, View, Box, Monitor, Connection, Setting, DataAnalysis } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// Props
const props = defineProps({
  currentType: {
    type: String,
    required: true
  },
  configData: {
    type: Array,
    default: () => []
  }
})

// 计算属性 - 过滤当前类型的数据
const filteredData = computed(() => {
  return props.configData.filter(item => item.type === props.currentType)
})

// 处理卡片点击 - 在新标签页打开链接
const handleCardClick = (url) => {
  if (url) {
    window.open(url, '_blank')
    ElMessage.success('正在跳转到新页面...')
  } else {
    ElMessage.warning('链接地址无效')
  }
}

// 获取类型图标
const getTypeIcon = (type) => {
  const iconMap = {
    'VPN': 'Connection',
    'server': 'Monitor',
    'tool': 'Setting',
    'default': 'DataAnalysis'
  }
  return iconMap[type] || iconMap.default
}

// 获取类型显示名称
const getTypeDisplayName = (type) => {
  const nameMap = {
    'VPN': 'VPN服务',
    'server': '服务器',
    'tool': '实用工具',
    'default': '其他服务'
  }
  return nameMap[type] || nameMap.default
}

// 获取标签类型
const getTagType = (type) => {
  const tagMap = {
    'VPN': 'success',
    'server': 'primary',
    'tool': 'info',
    'default': 'info'
  }
  return tagMap[type] || tagMap.default
}

// 格式化URL显示
const formatUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return url.length > 30 ? url.substring(0, 30) + '...' : url
  }
}

// 刷新数据
const handleRefresh = () => {
  ElMessage.info('数据刷新功能待实现')
}
</script>

<style scoped>
/* 内容容器样式 */
.content-container {
  padding: 15px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}

/* 内容头部样式 */
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
}

.content-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  font-size: 22px;
  color: #409EFF;
}

.content-stats {
  display: flex;
  gap: 10px;
}

/* 卡片网格样式 */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

/* 服务卡片样式 */
.service-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #e4e7ed;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border-color: #409EFF;
}

.service-card:hover .card-overlay {
  opacity: 1;
}

/* 卡片头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-icon {
  font-size: 24px;
  color: #409EFF;
}

.card-badge {
  flex-shrink: 0;
}

/* 卡片主体样式 */
.card-body {
  margin-bottom: 15px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 5px 0;
  line-height: 1.4;
}

.card-url {
  font-size: 12px;
  color: #909399;
  margin: 0;
  word-break: break-all;
  line-height: 1.4;
}

/* 卡片底部样式 */
.card-footer {
  display: flex;
  justify-content: center;
}

/* 悬停遮罩样式 */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(64, 158, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.overlay-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.overlay-text {
  font-size: 14px;
  font-weight: 500;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.empty-icon {
  font-size: 100px;
  color: #c0c4cc;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-container {
    padding: 10px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .content-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .content-title {
    font-size: 18px;
  }
  
  .service-card {
    padding: 12px;
  }
  
  .card-title {
    font-size: 15px;
  }
}
</style>