<template>
  <div class="app-container">
    <div class="sales-content">
      <el-row class="el-row-table">
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showDept">
            部门:
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
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showGroup">
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
        <el-col :xs="4" :sm="4" :md="4" :lg="4" v-show="showNick">
            销售:
            <el-input v-model="orderList.sellName" placeholder="昵称/ID"></el-input>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" v-show="showDate">
            日期:
            <el-date-picker
              v-model="date"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateChange()"
              :picker-options="pickerOptions1">
            </el-date-picker>
        </el-col>
        <el-col :xs="9" :sm="9" :md="9" :lg="9" style="text-align:right">
            <el-button type="primary" @click="getResult" v-show="showSearch">搜索</el-button>
            <el-button type="warning" @click="add" v-show="showAdd">添加</el-button>
        </el-col>
      </el-row>
      <el-row class="el-row-table" style="padding-top:0;padding-bottom:0;height:50px;line-height:50px;">
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          成交单数：{{ sum.orderCount }}
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          成交金额：{{ sum.moneyCount }}元
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          微信收款：{{ sum.wechatTotal }}元
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          支付宝收款：{{ sum.alipayTotal }}元
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3">
          客户汇总：{{ sum.customerCount }}
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :row-key="getRowKeys"
        v-loading.body="listLoading"
        element-loading-text="正在加载中"
        element-loading-spinner="el-icon-loading"
        :data="list"
        border fit highlight-current-row>
        <el-table-column
          type="selection"
          :reserve-selection="true"
          align="center"
          width="55"
          prop="id">
        </el-table-column>
        <el-table-column
          label="序号"
          align="center">
          <template slot-scope="scope">{{ scope.$index + (orderList.page - 1) * orderList.size + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="销售ID">
          <template slot-scope="scope">
            {{scope.row.serviceCode}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="真实姓名"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.nickName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="成交单数">
          <template slot-scope="scope">
            {{scope.row.sellCount}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="成交金额">
          <template slot-scope="scope">
            {{scope.row.sellTotal}}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="业绩">
          <template slot-scope="scope">
            {{scope.row.achievement}}
          </template>
        </el-table-column> -->
        <el-table-column
          prop="name"
          align="center"
          label="新增客户">
          <template slot-scope="scope">
            {{scope.row.customers}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          class="role-data"
          label="角色">
          <template slot-scope="scope">
            {{scope.row.roleName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="状态">
          <template slot-scope="scope">
            <span>
              {{scope.row.userStatus === 0 ? '启用' : '禁用'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="手机号">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="QQ号">
          <template slot-scope="scope">
            {{scope.row.qq}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="微信号">
          <template slot-scope="scope">
            {{scope.row.wechat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width='300'>
          <template slot-scope="scope">
            <el-button type="primary" @click="toOrder(scope.row.serviceCode)" v-show="orderShow">订单</el-button>
            <el-button type="success" @click="toClient(scope.row.serviceCode)" v-show="clientShow">客户</el-button>
            <el-button type="warning" @click="openDetail(scope.row.userName)" v-show="editShow">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="el-row-page">
        <el-col>
          <el-pagination
            @size-change="handleSaleSize"
            @current-change="handleSaleCurrent"
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
import { getSales, toDetail, topDept, childrenDeptAll } from '@/api/sales'
import { timestampToDate } from '@/common/dateFormat'
import { getPermission } from '@/api/login'

export default {
  data() {
    return {
      // 查询结果表格数据展示
      list: [],
      // 表格全选
      multipleTable: [],
      multipleSelection: [],
      // 多选选中的数组数据
      checkList: [],
      // 分页器 总页数
      pageTotal: 0,
      // 加载动画
      listLoading: true,
      // 日期
      date: '',
      // 默认日期设置
      timeDefaultShow: '',
      // 查询表格字段
      orderList: {
        endDate: '',
        deptId: '',
        groupId: '',
        page: 1,
        sellName: '',
        size: 10,
        startDate: '',
        username: ''
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            const day = new Date().getDay()
            if (day !== 0) {
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (day - 1))
            } else {
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
            }
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            const mon = new Date().getDate()
            if (mon !== 1) {
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (mon - 1))
            } else {
              start.setTime(start.getTime())
            }
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 数据汇总
      sum: {
        // 成交单数
        orderCount: 0,
        // 成交金额
        moneyCount: 0,
        // 微信收款
        wechatTotal: 0,
        // 支付宝支付
        alipayTotal: 0,
        // 新增客户汇总
        customerCount: 0
      },
      // 下拉框默认项
      option: {
        label: '全部',
        value: ''
      },
      options3: [],
      options4: [],
      // 获取row的key值
      getRowKeys(row) {
        return row.userName
      },
      // 搜索栏-显示隐藏
      showSearch: true,
      showDept: true,
      showGroup: true,
      showNick: true,
      showDate: true,
      showAdd: true,
      // 表格数据-显示隐藏
      orderShow: true,
      clientShow: true,
      editShow: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      // 数据初始化
      this.init()
    })
  },
  // filters: {
  //   filterBtns: function(val) {
  //     console.log(val)
  //   }
  // },
  methods: {
    init() {
      const this_ = this
      // 按钮权限判断
      const datap = {
        roleId: this_.$store.getters.roleId,
        type: 2
      }
      getPermission(datap).then(resp => {
        const arr = resp.dataList
        const data = []
        arr.map((item, index) => {
          data.push(item.meta.title)
        })
      })
      if (this_.$store.getters.roleName === '发货专员') {
        this_.showDept = false
        this_.showGroup = false
        this_.showNick = false
        this_.showDate = false
        this_.showAdd = false
        this_.showSearch = false
        this_.orderShow = false
        this_.clientShow = false
        this_.editShow = false
      }
      if (this_.$store.getters.roleName === '销售专员') {
        this_.showDept = false
        this_.showGroup = false
        this_.showNick = false
        this_.showAdd = false
        this_.orderShow = false
        this_.clientShow = false
        this_.editShow = false
      }
      if (this_.$store.getters.roleName === '销售组长') {
        this_.showDept = false
        this_.showGroup = false
        this_.showAdd = false
        this_.orderShow = false
        this_.clientShow = false
        this_.editShow = false
      }
      if (this_.$store.getters.roleName === '销售经理') {
        this_.showDept = false
        this_.showDate = false
        this_.showAdd = false
        this_.clientShow = false
        this_.editShow = false
      }
      if (this_.showDept === false) {
        this_.groupList(this_.$store.getters.deptId)
      }
      // this.orderList.userName = this.$store.getters.tel
      // 日期初始化 默认今天
      const start = new Date()
      const end = new Date()
      const arr = []
      arr.push(start, end)
      this_.date = arr
      const array = this_.date
      this_.orderList.startDate = timestampToDate(array[0])
      this_.orderList.endDate = timestampToDate(array[1])
      // this_.timeDefaultShow = [this_.orderList.startDate, this_.orderList.endDate]
      // 部门选项赋值
      // 顶级部门
      topDept().then(response => {
        const arr2 = []
        const array2 = response.info
        array2.forEach(element => {
          // arr2.push({ value: element.id, label: element.name, depts: [] })
          arr2.push({ value: element.id, label: element.name })
        })
        this_.options3 = arr2
      })
      this_.getList()
    },
    dateChange() {
      const this_ = this
      const array = this_.date
      this_.orderList.startDate = timestampToDate(array[0])
      this_.orderList.endDate = timestampToDate(array[1])
    },
    getList() {
      const this_ = this
      this_.listLoading = true
      const data = this_.orderList
      getSales(data).then(response => {
        this_.list = response.dataList
        this_.orderList.page = response.pageNo
        this_.orderList.size = response.pageSize
        this_.pageTotal = response.totalCount
        this.sum.orderCount = response.orderCount
        this.sum.moneyCount = response.moneyCount
        this.sum.wechatTotal = response.wechatTotal
        this.sum.alipayTotal = response.alipayTotal
        this.sum.customerCount = response.customerCount
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
        if (response.customerCount === null) {
          this.sum.customerCount = 0
        }
        this_.listLoading = false
      })
    },
    // 搜索
    getResult() {
      this.orderList.page = 1
      this.orderList.size = 10
      const data = this.orderList
      this.listLoading = true
      getSales(data).then(response => {
        this.list = response.dataList
        this.orderList.page = response.pageNo
        this.orderList.size = response.pageSize
        this.pageTotal = response.totalCount
        this.sum.orderCount = response.orderCount
        this.sum.moneyCount = response.moneyCount
        this.sum.wechatTotal = response.wechatTotal
        this.sum.alipayTotal = response.alipayTotal
        this.sum.customerCount = response.customerCount
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
        if (response.customerCount === null) {
          this.sum.customerCount = 0
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
    // 添加 add
    add() {
      const that = this
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      getPermission(datap).then(resp => {
        const arr = resp.dataList
        arr.map((item, index) => {
          if (item.meta.title === '添加销售') {
            return that.$router.push({ path: item.path })
          } else {
            return false
          }
        })
      })
    },
    // 分页部分
    handleSaleSize(size) {
      this.orderList.size = size
      this.getList()
    },
    handleSaleCurrent(currentPage) {
      this.orderList.page = currentPage
      this.getList()
    },
    // 编辑
    openDetail(val) {
      const that = this
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      toDetail(val).then(response => {
        getPermission(datap).then(resp => {
          const arr = resp.dataList
          arr.map((item, index) => {
            if (item.meta.title === '编辑销售') {
              // 编辑完整数据赋值
              localStorage.setItem('salesEditForm', JSON.stringify(response.info))
              // that.$store.state.sales.salesEditForm = response.info
              return that.$router.push({ path: item.path })
            } else {
              return false
            }
          })
        })
      })
    },
    toOrder(val) {
      this.$router.push({ path: '/orders/order' })
    },
    toClient(val) {
      this.$router.push({ path: '/clients/client' })
    },
    // 表格全选
    handleSelectionChange(rows) {
      this.multipleSelection = rows
      this.select_order_number = this.multipleSelection.length
      // 选中的数据存入数组
      this.select_orderId = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row.userName)
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
        width: 63%;
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
}
</style>

