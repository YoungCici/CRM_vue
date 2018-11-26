<template>
  <!-- <div class="dashboard-editor-container">

    <el-row class="tabs-title">
      <el-col :span="2">业务数据</el-col>
      <el-col :span="22" style="text-align:right;">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    </el-row>
    <el-row class="tabs-title">
      <el-col :span="4">业务数据折线</el-col>
      <el-col :span="20" style="text-align:right;">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        align="right">
        </el-date-picker>
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:10px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
    <el-row style="padding:20px;background:#fff;margin-top:-35px;">
      <el-col style="text-align:center;">
        <el-button type="success" @click="handleSetLineChartData('newVisitis')">成交单数</el-button>
        <el-button type="primary" @click="handleSetLineChartData('messages')">成交金额</el-button>
        <el-button type="warning" @click="handleSetLineChartData('purchases')">新增用户</el-button>
      </el-col>
    </el-row>

    <el-row class="tabs-title" style="margin-top:20px">
      <el-col :span="2">用户数据</el-col>
      <el-col :span="22" style="text-align:right;">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    </el-row>
    <el-row class="tabs-title">
      <el-col :span="4">业务数据折线</el-col>
      <el-col :span="20" style="text-align:right;">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        align="right">
        </el-date-picker>
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;margin-top:10px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
    <el-row style="padding:20px;background:#fff;margin-top:-35px;">
      <el-col style="text-align:center;">
        <el-button type="success" @click="handleSetLineChartData('newVisitis')">成交单数</el-button>
        <el-button type="primary" @click="handleSetLineChartData('messages')">成交金额</el-button>
        <el-button type="warning" @click="handleSetLineChartData('purchases')">新增用户</el-button>
      </el-col>
    </el-row> 

    
  </div>-->
  <el-row class='index-word'>
    欢迎使用医护之家CRM系统!
  </el-row>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      value1: '',
      value2: ''
    }
  },
  methods: {
    // eslint-disable-next-line
    // 数据状态管理-store
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    // 点击按钮响应图表事件
    handleSetLineChartData1(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .tabs-title{
    height: 55px;
    font-weight: bold;
    line-height: 55px;
    background: #fff;
    padding-left: 10px;
    padding-right: 10px;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.index-word {
  padding: 32px;
  font-size: 48px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bold;
  text-align: center;
  margin-top: 200px;
  letter-spacing: 5px;
}
</style>
