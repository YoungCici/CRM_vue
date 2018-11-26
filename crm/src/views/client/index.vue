<template>
  <div class="app-container">
    <div class="client-content">
      <el-row class="el-row-table">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" v-show="showTel">
            用户手机号:
            <el-input v-model="orderList.userName"></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" v-show="showDept">
            方阵:
            <el-select v-model="orderList.deptId" @change="groupList" placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" v-show="showGroup">
            小组:
            <el-select v-model="orderList.groupId" placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" v-show="showNick">
            销售昵称/ID:
            <el-input v-model="orderList.sellName"></el-input>
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
              :default-value="timeDefaultShow"
              :picker-options="pickerOptions1">
            </el-date-picker>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" style="text-align:right">
            <el-button type="primary" @click="getResult" v-show="showSearch">搜索</el-button>
            <!-- <el-button type="success" @click="handleDownload">导出</el-button> -->
        </el-col>
      </el-row>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="正在加载中"
        element-loading-spinner="el-icon-loading" border fit highlight-current-row>
        <el-table-column align="center" label='序号' width="80">
          <template slot-scope="scope">
            {{ scope.$index + (orderList.page - 1) * orderList.size + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            {{scope.row.registerDate}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="渠道ID">
          <template slot-scope="scope">
            {{(scope.row.sellName + scope.row.sellId) === 0 ? '' : scope.row.sellName + scope.row.sellId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级权限">
          <template slot-scope="scope">
            {{scope.row.jurisdiction}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="toOrder(scope.row.userName)">订单</el-button>
            <!-- <el-button type="warning" @click="openDetail(scope.$index, scope.row)">编辑邮寄信息</el-button> -->
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
import { getClient } from '@/api/client'
import { topDept, childrenDeptAll } from '@/api/sales'
import { timestampToDate } from '@/common/dateFormat'
import { getPermission } from '@/api/login'

export default {
  data() {
    return {
      // 查询结果表格数据展示
      list: [],
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
        deptId: '',
        endDate: '',
        groupId: '',
        page: 1,
        sellName: '',
        size: 10,
        startDate: '',
        userName: ''
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
      // 下拉框默认项
      option: {
        label: '全部',
        value: ''
      },
      options1: [],
      options2: [],
      // 搜索栏-显示隐藏
      showSearch: true,
      showTel: true,
      showDept: true,
      showGroup: true,
      showNick: true,
      showDate: true
    }
  },
  created() {
    this.$nextTick(function() {
      // 数据初始化
      this.init()
    })
  },
  methods: {
    init() {
      const this_ = this
      if (this_.$store.getters.roleName === '发货专员') {
        this_.showTel = false
        this_.showDept = false
        this_.showGroup = false
        this_.showNick = false
        this_.showDate = false
        this_.showSearch = false
      }
      if (this_.$store.getters.roleName === '销售专员' || this_.$store.getters.roleName === '销售组长' || this_.$store.getters.roleName === '销售经理') {
        this_.showDept = false
        this_.showGroup = false
        this_.showNick = false
      }
      if (this_.showDept === false) {
        this_.groupList(this_.$store.getters.deptId)
      }
      this.orderList.sellName = this.$route.params.btnIds
      // 日期初始化 默认今天
      const start = new Date()
      const end = new Date()
      const arr = []
      arr.push(start, end)
      this_.date = arr
      const array = this_.date
      this_.orderList.startDate = timestampToDate(array[0])
      this_.orderList.endDate = timestampToDate(array[1])
      this_.timeDefaultShow = [this_.orderList.startDate, this_.orderList.endDate]
      // 部门选项赋值
      // 顶级部门
      topDept().then(response => {
        const arr2 = []
        const array2 = response.info
        array2.forEach(element => {
          // arr2.push({ value: element.id, label: element.name, depts: [] })
          arr2.push({ value: element.id, label: element.name })
        })
        this_.options1 = arr2
      })
      this_.getList()
    },
    getList() {
      this.listLoading = true
      const this_ = this
      if (this_.date === null) {
        this_.orderList.endDate = ''
        this_.orderList.startDate = ''
      } else {
        const dateStart = new Date(this_.date[0]).getTime()
        const dateEnd = new Date(this_.date[1]).getTime()
        this_.orderList.endDate = timestampToDate(dateEnd)
        this_.orderList.startDate = timestampToDate(dateStart)
      }
      const data = this.orderList
      getClient(data).then(response => {
        this_.list = response.dataList
        this_.pageTotal = response.totalCount
        this_.orderList.page = response.pageNo
        this_.orderList.size = response.pageSize
        this_.listLoading = false
      })
    },
    // 搜索
    getResult() {
      const this_ = this
      if (this_.date === null) {
        this_.orderList.endDate = ''
        this_.orderList.startDate = ''
      } else {
        const dateStart = new Date(this_.date[0]).getTime()
        const dateEnd = new Date(this_.date[1]).getTime()
        this_.orderList.endDate = timestampToDate(dateEnd)
        this_.orderList.startDate = timestampToDate(dateStart)
      }
      this.orderList.page = 1
      this.orderList.size = 10
      const data = this.orderList
      this.listLoading = true
      getClient(data).then(response => {
        this.list = response.dataList
        this.orderList.page = response.pageNo
        this.orderList.size = response.pageSize
        this.pageTotal = response.totalCount
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
          that.options2 = arrSub
        } else {
          that.options2 = arrSub
        }
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
    // 跳转至订单 - 根据手机号
    toOrder(val) {
      const that = this
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      getPermission(datap).then(resp => {
        const arr = resp.dataList
        arr.map((item, index) => {
          if (item.meta.title === '订单列表') {
            if (that.$store.getters.roleName === '销售专员' || that.$store.getters.roleName === '销售组长' || that.$store.getters.roleName === '销售经理') {
              return that.$router.push({ name: 'order', path: item.path, params: { tel: val }})
            } else {
              return that.$router.push({ path: item.path })
            }
          } else {
            return false
          }
        })
      })
    },
    // 导出
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '手机号', '注册时间', '渠道ID', '班级权限']
        const filterVal = ['index', 'userName', 'createDate', 'sellId', 'jurisdiction']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, key) => filterVal.map(j => {
        key = key + 1
        if (j === 'index') {
          // 序号递增
          v[j] = key++
          return v[j]
        } else {
          return v[j]
        }
      }))
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
        width: 50%;
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

