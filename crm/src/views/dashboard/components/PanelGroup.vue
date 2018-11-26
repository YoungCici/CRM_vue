<template>
  <el-row class="panel-group" :gutter="0">
    <el-col :xs="6" :sm="6" class="card-panel-col">
      <div class='card-panel'>
        <div class="card-panel-description">
          <div class="card-panel-text">今日成交订单数</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="168" :duration="111"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">今日成交金额</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="1680" :duration="300"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">新增客户</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="1680" :duration="320"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="6" :sm="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">转化率</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="20" :duration="36"></count-to>
          <span style="font-size:18px;font-weight:bold">%</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 5px;
  .card-panel-col{
    margin-bottom: 5px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-description {
      text-align: center;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 22px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
