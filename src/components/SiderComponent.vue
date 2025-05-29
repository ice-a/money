<!-- 编码: UTF-8 -->
<!-- 相对路径: ./src/components/SiderComponent.vue -->
<!-- 文件名: SiderComponent.vue -->
<!-- 侧边栏组件 - 显示config.json中的type分类导航 -->

<template>
  <div class="sider-container">
    <!-- 导航标题 -->
    <div class="sider-header">
      <el-icon class="header-icon"><Menu /></el-icon>
      <span class="header-title">服务分类</span>
    </div>
    
    <!-- 分类菜单 -->
    <el-menu
      :default-active="currentType"
      class="sider-menu"
      @select="handleMenuSelect"
      background-color="#ffffff"
      text-color="#303133"
      active-text-color="#409EFF"
    >
      <el-menu-item 
        v-for="type in typeList" 
        :key="type"
        :index="type"
        class="menu-item"
      >
        <el-icon class="menu-icon">
          <component :is="getTypeIcon(type)" />
        </el-icon>
        <span class="menu-text">{{ getTypeDisplayName(type) }}</span>
        <el-badge 
          :value="getTypeCount(type)" 
          :max="99"
          class="type-badge"
          v-if="getTypeCount(type) > 0"
        />
      </el-menu-item>
    </el-menu>
    
    <!-- 统计信息 -->
    <div class="sider-footer">
      <el-divider />
      <div class="stats-info">
        <div class="stats-item">
          <el-icon><DataAnalysis /></el-icon>
          <span>总计: {{ totalCount }} 个服务</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Menu, Monitor, DataAnalysis, Setting, Connection } from '@element-plus/icons-vue'

// Props
const props = defineProps({
  currentType: {
    type: String,
    default: 'VPN'
  }
})

// Emits
const emit = defineEmits(['type-change'])

// 响应式数据
const configData = ref([])
const typeList = ref(['VPN']) // 默认包含VPN类型

// 计算属性 - 获取类型总数
const totalCount = computed(() => {
  return configData.value.length
})

// 处理菜单选择
const handleMenuSelect = (type) => {
  emit('type-change', type)
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

// 获取某个类型的数量
const getTypeCount = (type) => {
  return configData.value.filter(item => item.type === type).length
}

// 加载配置数据并提取类型
const loadConfigData = async () => {
  try {
    const response = await axios.get('/config.json')
    configData.value = response.data
    
    // 提取所有唯一的类型
    const types = [...new Set(configData.value.map(item => item.type))]
    typeList.value = types.length > 0 ? types : ['VPN']
    
    console.log('侧边栏数据加载成功:', configData.value)
    console.log('可用类型:', typeList.value)
  } catch (error) {
    console.error('侧边栏加载配置数据失败:', error)
    // 使用默认数据
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
    typeList.value = ['VPN', 'server']
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadConfigData()
})
</script>

<style scoped>
/* 侧边栏容器样式 */
.sider-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  overflow-y: auto;
  box-sizing: border-box;
}

/* 侧边栏头部样式 */
.sider-header {
  padding: 10px 20px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f8f9fa;
}

.header-icon {
  font-size: 18px;
  color: #409EFF;
}

.header-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

/* 菜单样式 */
.sider-menu {
  flex: 1;
  border: none;
  padding: 10px 0;
  overflow-y: auto;
}

.menu-item {
  margin: 5px 15px;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #f0f9ff !important;
}

.menu-item.is-active {
  background-color: #e6f7ff !important;
  border-left: 3px solid #409EFF;
}

.menu-icon {
  font-size: 16px;
  margin-right: 8px;
}

.menu-text {
  font-size: 14px;
  font-weight: 500;
}

.type-badge {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}

/* 底部统计信息样式 */
.sider-footer {
  padding: 10px 20px;
  border-top: 1px solid #e4e7ed;
  background-color: #f8f9fa;
}

.stats-info {
  margin-top: 5px;
}

.stats-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #909399;
}

.stats-item .el-icon {
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sider-container {
    width: 100% !important;
  }
  
  .menu-item {
    margin: 3px 10px;
  }
  
  .sider-header {
    padding: 10px 15px;
  }
  
  .sider-footer {
    padding: 8px 15px;
  }
}
</style>