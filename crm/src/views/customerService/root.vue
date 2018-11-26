<template>
  <div class="app-container">
    <div class="order-content">
      <el-row class="el-row-table">
        <el-col :xs="3" :sm="3" :md="3" :lg="3">
            产品类型:
            <el-select v-model="orderList.type" @change='change1' placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            状态:
            <el-select v-model="orderList.status" @change='change2' placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            方阵:
            <el-select v-model="orderList.deptId" @change="groupList" placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            小组:
            <el-select v-model="orderList.groupId" placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            销售:
            <el-input v-model="orderList.sellName"></el-input>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            手机号:
            <el-input v-model="orderList.phone"></el-input>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7">
            日期:
            <el-date-picker
              v-model="orderList.startDate"
              type="datetime"
              placeholder="开始日期"
              @change="startDate()"
              style="width: 40%;">
            </el-date-picker>
            <el-date-picker
              v-model="orderList.endDate"
              type="datetime"
              @change="endDate()"
              placeholder="结束日期"
              style="width: 40%;">
            </el-date-picker>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" style="text-align:right;display:flex;justify-content: flex-end;">
            <el-button type="primary" @click="getResult">搜索</el-button>
            <el-button type="success" @click="handleExoprt" style="margin-right:10px;">导出</el-button>
        </el-col>
      </el-row>
      <el-row class="el-row-table" style="padding-top:0;padding-bottom:0;height:50px;line-height:50px;">
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          成交单数：{{ sum.orderCount }}
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5">
          成交金额：{{ sum.moneyCount }}元
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          微信收款：{{ sum.wechatTotal }}元
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5">
          支付宝收款：{{ sum.alipayTotal }}元
        </el-col>
      </el-row>
      <form>
      <el-table :data="list"
        v-loading.body="listLoading"
        element-loading-text="正在加载中"
        element-loading-spinner="el-icon-loading"
        border fit highlight-current-row>
        <el-table-column
          label="序号"
          width="100"
          align="center">
          <template slot-scope="scope">{{ scope.$index + (orderList.page - 1) * orderList.size + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" label='订单号'>
          <template slot-scope="scope">
            {{scope.row.orderNum}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品名称">
          <template slot-scope="scope">
            {{scope.row.productTitle}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="绑定手机号">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column label="小组" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.deptName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sellName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            {{scope.row.orderTime}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.orderStatus === 0 ? '已完成' : 
              (scope.row.orderStatus === 1 ? '新订单' : 
              (scope.row.orderStatus === 2 ? '分期中' : 
              (scope.row.orderStatus === 3 ? '已付全款' : 
              (scope.row.orderStatus === 4 ? '已发货' : 
              (scope.row.orderStatus === 5 ? '已签收' : 
              (scope.row.orderStatus === 6 ? '已评论' : 
              (scope.row.orderStatus === -1 ? '取消' : 
              (scope.row.orderStatus === -2 ? '删除' : 
              (scope.row.orderStatus === -3 ? '退款中' : 
              (scope.row.orderStatus === -4 ? '已退款' : ''))))))))))}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      </form>
      <el-row class="el-row-page">
        <el-col>
          <el-pagination
            @size-change="handleGoodsSize"
            @current-change="handleGoodsCurrent"
            :page-sizes="[5, 10, 15, 20]"
            :current-page="orderList.page"
            :page-size="orderList.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { timestampToDatetime, timestampToDateFormat } from '@/common/dateFormat'
import { getGoods, getType } from '@/api/order'
import { topDept, childrenDeptAll } from '@/api/sales'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import qs from 'qs'

export default {
  data() {
    return {
      // 查询结果表格数据展示
      list: [],
      // 分页器 总页数
      pageTotal: 0,
      // 加载动画
      listLoading: true,
      // 订单详情弹框-时间格式转换
      dateTime: '',
      // 订单详情弹框-产品金额 产品金额=支付金额-邮费
      proAmount: '',
      // 订单详情弹框-支付方式判断
      payType: '',
      // 订单号数组
      orderArr: [],
      // 查询表格字段
      orderList: {
        deptId: '',
        endDate: '',
        groupId: '',
        orderId: '',
        page: 1,
        phone: '',
        sellName: '',
        size: 10,
        startDate: '',
        status: '',
        type: '',
        trackingNumber: '',
        voMark: true
      },
      // 数据汇总
      sum: {
        // 成交单数
        orderCount: 0,
        // 成交金额
        moneyCount: 0,
        // 微信收款
        wechatTotal: 0,
        // 支付宝收款
        alipayTotal: 0
      },
      // 下拉框选项内容
      // 下拉框默认项
      option: {
        label: '全部',
        value: ''
      },
      options1: [],
      options2: [{
        value: '3',
        label: '已付全款'
      }, {
        value: '4',
        label: '已发货'
      }],
      options3: [],
      options4: [],
      // 导出
      listData: [],
      uploadFile: []
    }
  },
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    init() {
      // 类型获取
      const data = {}
      getType(data).then(res => {
        const arr1 = []
        const array1 = res.dataList
        array1.map((el, index) => {
          arr1.push({ value: el.id, label: el.title })
        })
        this.options1 = arr1
      })
      // 部门选项赋值
      // 顶级部门
      topDept().then(response => {
        const arr3 = []
        const array3 = response.info
        array3.forEach(element => {
          // arr2.push({ value: element.id, label: element.name, depts: [] })
          arr3.push({ value: element.id, label: element.name })
        })
        this.options3 = arr3
      })
      this.getList()
    },
    startDate() {
      this.orderList.startDate = timestampToDatetime(this.orderList.startDate)
    },
    endDate() {
      this.orderList.endDate = timestampToDatetime(this.orderList.endDate)
    },
    getList() {
      this.listLoading = true
      const arr = this.orderList
      getGoods(arr).then(response => {
        this.list = response.dataList
        this.orderList.page = response.pageNo
        this.orderList.size = response.pageSize
        this.pageTotal = response.totalCount
        this.sum.orderCount = response.orderCount
        this.sum.moneyCount = response.moneyCount
        this.sum.wechatTotal = response.wechatTotal
        this.sum.alipayTotal = response.alipayTotal
        if (response.orderCount === null) {
          this.sum.orderCount = 0
        }
        if (response.moneyCount === null) {
          this.sum.moneyCount = 0
        }
        if (response.wechatTotal === null) {
          this.sum.wechatTotal = 0
        }
        if (response.alipayTotal === null) {
          this.sum.alipayTotal = 0
        }
        this.listLoading = false
      })
    },
    // 搜索
    getResult() {
      this.orderList.page = 1
      this.orderList.size = 10
      const data = this.orderList
      this.listLoading = true
      getGoods(data).then(response => {
        this.list = response.dataList
        this.orderList.page = response.pageNo
        this.orderList.size = response.pageSize
        this.pageTotal = response.totalCount
        this.sum.orderCount = response.orderCount
        this.sum.moneyCount = response.moneyCount
        this.sum.wechatTotal = response.wechatTotal
        this.sum.alipayTotal = response.alipayTotal
        if (response.orderCount === null) {
          this.sum.orderCount = 0
        }
        if (response.moneyCount === null) {
          this.sum.moneyCount = 0
        }
        if (response.wechatTotal === null) {
          this.sum.wechatTotal = 0
        }
        if (response.alipayTotal === null) {
          this.sum.alipayTotal = 0
        }
        this.listLoading = false
      })
    },
    groupList(val) {
      // 所有下级部门级联选择-小组
      const that = this
      childrenDeptAll(val).then(response => {
        const arrSub = []
        const arraySub = response.info
        arraySub.map((item, index) => {
          if (item.parentId === val) {
            arrSub.push({ value: item.id, label: item.name })
          }
        })
        if (arrSub.length === 0) {
          that.orderList.groupId = ''
          that.options4 = arrSub
        } else {
          that.options4 = arrSub
        }
      })
    },
    // 下拉框选中值发生变化时触发--状态
    change2(value) {
      // this.options2.map((item, index) => {
      //   if (item.value === value) {
      //     this.orderList.status = item.label
      //   }
      // })
    },
    // 类型
    change1(value) {
      // this.options1.map((item, index) => {
      //   if (item.value === value) {
      //     this.orderList.type = item.label
      //   }
      // })
    },
    // 分页部分
    handleGoodsSize(size) {
      this.orderList.size = size
      this.init()
    },
    handleGoodsCurrent(currentPage) {
      this.orderList.page = currentPage
      this.init()
    },
    // 导出
    handleExoprt() {
      const exportDate = new Date()
      const that = this
      const params = {
        type: this.orderList.type,
        deptId: this.orderList.deptId,
        groupId: this.orderList.groupId,
        status: this.orderList.status,
        sellName: this.orderList.sellName,
        phone: this.orderList.phone,
        startDate: this.orderList.startDate,
        endDate: this.orderList.endDate
      }
      axios({
        method: 'post',
        url: 'http://cloud.hujia168.com:8912/platform-order/order/exportPermissionDeliveryExcel',
        // url: 'http://192.168.10.245:8912/platform-order/order/exportPermissionDeliveryExcel',
        data: qs.stringify(params),
        changeOrigin: true,
        responseType: 'blob',
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (that.pageTotal === 0) {
          that.$message({
            message: '当前无数据导出，请选择导出数据',
            type: 'warning'
          })
        } else {
          const content = res.data
          const blob = new Blob([content])
          const fileName = timestampToDateFormat(exportDate) + '订单列表.xls'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#excel-upload-input{
  display: none;
  z-index: -9999;
}
.app-container{
  .line{
    text-align: center;
  }
  .el-row-table{
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 5px;
    .el-col{
      .el-input{
        width: 55%;
        .el-input__inner{
          padding: 0 5px!important;
        }
      }
      .el-date-editor--date{
        width: 43%!important;
      }
      .el-select{
        width: 65%;
        .el-input__inner{
          padding: 0 5px!important;
        }
        .el-cascader__label{
          padding: 0 5px!important;
        }
      }
    }
  }
  .el-row-page{
    .el-col{
      text-align: right;
      padding: 15px;
      .el-pagination{
        display: inline-block;
      }
    }
  }
  #excel-upload-input{
    display: none;
    z-index: -9999;
  }  
}
</style>
