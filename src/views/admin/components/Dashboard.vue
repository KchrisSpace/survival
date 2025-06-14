<!-- 仪表盘 -->
<template>
  <div class="dashboard">
    <div class="statistics-cards">
      <div class="stat-card">
        <div class="stat-icon user-icon">
          <i class="el-icon-user"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">1,234</div>
          <div class="stat-label">用户总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon article-icon">
          <i class="el-icon-document"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">567</div>
          <div class="stat-label">文章总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon comment-icon">
          <i class="el-icon-chat-dot-round"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">2,890</div>
          <div class="stat-label">评论总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon view-icon">
          <i class="el-icon-view"></i>
        </div>
        <div class="stat-info">
          <div class="stat-value">12,345</div>
          <div class="stat-label">访问总量</div>
        </div>
      </div>
    </div>

    <div class="charts-container">
      <div class="chart-card">
        <h3>最近7天访问量</h3>
        <div class="chart" ref="visitChart"></div>
      </div>
      <div class="chart-card">
        <h3>文章分类统计</h3>
        <div class="chart" ref="categoryChart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const visitChart = ref(null);
const categoryChart = ref(null);

onMounted(() => {
  // 访问量图表
  const visitChartInstance = echarts.init(visitChart.value);
  visitChartInstance.setOption({
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
        areaStyle: {
          opacity: 0.3,
        },
      },
    ],
  });

  // 分类统计图表
  const categoryChartInstance = echarts.init(categoryChart.value);
  categoryChartInstance.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "技术" },
          { value: 735, name: "生活" },
          { value: 580, name: "旅行" },
          { value: 484, name: "美食" },
          { value: 300, name: "其他" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.statistics-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  color: white;
}

.user-icon {
  background: #409eff;
}
.article-icon {
  background: #67c23a;
}
.comment-icon {
  background: #e6a23c;
}
.view-icon {
  background: #f56c6c;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.stat-label {
  font-size: 14px;
  color: #909399;
  margin-top: 5px;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.chart {
  height: 300px;
}
</style>
