<template>
  <div class="app-container">
    <div class="order-content">
      <el-row class="el-row-table">
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showOrder">
            订单号:
            <el-input placeholder="请输入编号" v-model="orderList.orderId"></el-input>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showType">
            类型:
            <el-select v-model="orderList.type" placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showStatus">
            状态:
            <el-select v-model="orderList.status" @change='change' placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showDept">
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
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showNick">
            销售:
            <el-input v-model="orderList.serviceCode"></el-input>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showTel">
            手机号:
            <el-input v-model="orderList.phone"></el-input>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" v-show="showDate">
            日期:
            <el-date-picker
              v-model="orderList.startDate"
              type="date"
              format="yyyy-MM-dd"
              @change="startDate()"
              placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="orderList.endDate"
              type="date"
              format="yyyy-MM-dd"
              @change="endDate()"
              placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" style="text-align:right">
            <el-button type="primary" @click="getResult" v-show="showSearch">搜索</el-button>
            <el-button type="success" @click="handleExoprt" v-show="showExport">导出</el-button>
        </el-col>
      </el-row>
      <el-row class="el-row-table" style="padding-top:0;padding-bottom:0;height:50px;line-height:50px;">
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          单数：{{ sum.orderCount }}
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          金额：{{ sum.moneyCount }}元
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5" style="border-right:1px solid #eee;height:49px;padding-left:10x;margin-right:10px;padding-right:10px">
          微信收款：{{ sum.wechatTotal }}元
        </el-col>
        <el-col :xs="5" :sm="5" :md="5" :lg="5">
          支付宝收款：{{ sum.alipayTotal }}元
        </el-col>
      </el-row>
      <el-table :data="list"
        v-loading.body="listLoading"
        element-loading-text="正在加载中"
        element-loading-spinner="el-icon-loading"
        border fit highlight-current-row>
        <el-table-column
          label="序号"
          align="center">
          <template slot-scope="scope">{{ scope.$index + (orderList.page - 1) * orderList.size + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" label='订单编号'>
          <template slot-scope="scope">
            {{scope.row.orderNum}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型">
          <template slot-scope="scope">
            {{scope.row.orderTitle}}
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
        <el-table-column label="金额" align="center">
          <template slot-scope="scope">
            {{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            {{scope.row.productCount}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="业绩">
          <template slot-scope="scope">
            {{scope.row.achievement}}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="支付方式" align="center">
          <template slot-scope="scope">
            {{scope.row.payType === 1 ? '支付宝' : (scope.row.payType === 2 ? '微信' : '')}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="下单">
          <template slot-scope="scope">
            <span>{{scope.row.isAgents === 1 ? '自购' : '代购'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label='显示地址' width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.hasAddress | addressFilter">{{scope.row.hasAddress}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column label="销售ID" align="center">
          <template slot-scope="scope">
            <span>
              {{(scope.row.sellName + scope.row.serviceCode) === 0 ? '' : scope.row.sellName + scope.row.serviceCode}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" align="center">
          <template slot-scope="scope">
            {{scope.row.creatime}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='收件人' :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.consignee}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="电话">
          <template slot-scope="scope">
            {{scope.row.recivePhone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label='地址' :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.province+scope.row.city+scope.row.area}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="详细地址">
          <template slot-scope="scope">
            {{scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="left">
          <template slot-scope="scope">
            <el-button type="primary" @click="openEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="warning" @click="openDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="el-row-page">
        <el-col>
          <el-pagination
            @size-change="handleChangeSize"
            @current-change="handleChangeCurrent"
            :page-sizes="[5, 10, 15, 20]"
            :current-page.sync="orderList.page"
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
import { timestampToTime, timestampToDate } from '@/common/dateFormat'
import { getList, listEdit, getType } from '@/api/order'
import { topDept, childrenDeptAll } from '@/api/sales'
import { getPermission } from '@/api/login'
import { getToken } from '@/utils/auth'
import axios from 'axios'
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
        serviceCode: '',
        size: 10,
        startDate: '',
        status: '',
        type: ''
      },
      // 数据汇总
      sum: {
        // 成交单数
        orderCount: 0,
        // 成交金额
        moneyCount: 0,
        // 微信收款汇总
        wechatTotal: 0,
        // 支付宝收款汇总
        alipayTotal: 0
      },
      // 下拉框默认项
      option: {
        label: '全部',
        value: ''
      },
      options1: [],
      options2: [{
        value: '0',
        label: '已完成'
      }, {
        value: '1',
        label: '新订单'
      }, {
        value: '2',
        label: '分期中'
      }, {
        value: '3',
        label: '已付全款'
      }, {
        value: '4',
        label: '已发货'
      }, {
        value: '5',
        label: '已签收'
      }, {
        value: '6',
        label: '已评论'
      }, {
        value: '-1',
        label: '取消'
      }, {
        value: '-2',
        label: '删除'
      }, {
        value: '-3',
        label: '退款中'
      }, {
        value: '-4',
        label: '已退款'
      }],
      options3: [],
      options4: [],
      // 部门、小组---角色为销售组长时隐藏,设为false
      showSearch: true,
      showOrder: true,
      showType: true,
      showStatus: true,
      showDept: false,
      showGroup: true,
      showNick: true,
      showTel: true,
      showDate: true,
      showExport: false,
      // 表格数据-显示隐藏
      editShow: true
    }
  },
  filters: {
    // 是否显示地址
    addressFilter(status) {
      const statusMap = {
        '是': 'black',
        '否': 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    init() {
      this.orderList.phone = this.$route.params.tel
      this.orderList.serviceCode = this.$route.params.btnIds
      if (this.$store.getters.roleName === '发货专员') {
        this.showOrder = false
        this.showType = false
        this.showStatus = false
        this.showGroup = false
        this.showNick = false
        this.showTel = false
        this.showDate = false
        this.showSearch = false
      }
      if (this.$store.getters.roleName === '超级管理员' || this.$store.getters.roleName === '销售总监') {
        // this.showExport = true
        this.showDept = true
      }
      if (this.$store.getters.roleName === '销售专员') {
        this.showNick = false
        this.showGroup = false
      }
      if (this.$store.getters.roleName === '销售专员' || this.$store.getters.roleName === '销售组长') {
        this.showGroup = false
      }
      if (this.showDept === false) {
        this.groupList(this.$store.getters.deptId)
      }
      // 类型获取
      const data = {}
      getType(data).then(res => {
        const arr1 = []
        const array1 = res.dataList
        array1.forEach(el => {
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
      // 日期初始化 默认今天
      const start = new Date()
      const end = new Date()
      this.orderList.startDate = timestampToDate(start)
      this.orderList.endDate = timestampToDate(end)
      this.getList()
    },
    startDate() {
      this.orderList.startDate = timestampToDate(this.orderList.startDate)
      if (this.orderList.startDate === '1970-01-01') {
        this.orderList.startDate = ''
      }
    },
    endDate() {
      this.orderList.endDate = timestampToDate(this.orderList.endDate)
      if (this.orderList.endDate === '1970-01-01') {
        this.orderList.endDate = ''
      }
    },
    // 判断权限
    hasPerssion(roles, route) {
      if (route.mata && route.mata.title) {
        return roles.some(title => route.meta.title.indexOf(title) >= 0)
      } else {
        return true
      }
    },
    // 获取列表数据
    getList() {
      this.listLoading = true
      const data = this.orderList
      getList(data).then(response => {
        this.list = response.dataList
        this.pageTotal = response.totalCount
        this.orderList.page = response.pageNo
        this.orderList.size = response.pageSize
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
      getList(data).then(response => {
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
    // 下拉框选中值发生变化时触发
    change(value) {
      // console.log(this.orderList.status)
    },
    // 分页部分
    handleChangeSize(size) {
      this.orderList.size = size
      this.getList()
    },
    handleChangeCurrent(currentPage) {
      this.orderList.page = currentPage
      this.getList()
    },
    // 编辑
    openEdit(index, row) {
      const that = this
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      listEdit(row.orderNum).then(response => {
        getPermission(datap).then(resp => {
          const arr = resp.dataList
          arr.map((item, index) => {
            if (item.meta.title === '订单编辑') {
              // 编辑完整数据赋值
              localStorage.setItem('orderEditForm', JSON.stringify(response.info))
              return that.$router.push({ path: item.path })
            } else {
              that.editShow = false
              return false
            }
          })
        })
      })
    },
    // 查看详情-分期
    openDetailFQ(index, row) {
      const h = this.$createElement
      this.$msgbox({
        title: '分期详情',
        center: true,
        message: h('div', [
          h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
            h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '订单编号'),
            h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
            h('span', { style: 'display: block;content: "";clear: both;' })
          ]),
          h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
            h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '用户昵称'),
            h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
            h('span', { style: 'display: block;content: "";clear: both;' })
          ]),
          h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
            h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '联系电话'),
            h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
            h('span', { style: 'display: block;content: "";clear: both;' })
          ]),
          h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
            h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '销售ID'),
            h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
            h('span', { style: 'display: block;content: "";clear: both;' })
          ]),
          h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
            h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '订单总额'),
            h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
            h('span', { style: 'display: block;content: "";clear: both;' })
          ]),
          h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
            h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '分期详情'),
            h('span', { style: 'color: green;float: left;width: 70%;height: auto;text-align: left;' }, [
              h('span', { style: 'display: inline-block;width: 50%;height: 35px;line-height: 35px;border: 1px solid #eee;border-radius:3px;padding:0 5px;margin-right: 10px;' }, '首付：455.00元'),
              h('span', { style: 'height: 35px;line-height: 35px;' }, '2018/08/04')
            ]),
            h('span', { style: 'display: block;content: "";clear: both;' })
          ]),
          h('div', { style: 'color: red;margin-left: 14%;width: 70%;height: auto' }, [
            h('span', { style: 'display: inline-block;width: 50%;height: 35px;line-height: 35px;border: 1px solid #eee;border-radius:3px;padding:0 5px;margin-right: 10px;' }, '第一期：455.00元'),
            h('span', { style: 'height: 35px;line-height: 35px;' }, '2018/09/04')
          ]),
          h('div', { style: 'margin-left: 14%;width: 70%;height: auto' }, [
            h('span', { style: 'display: inline-block;width: 50%;height: 35px;line-height: 35px;border: 1px solid #eee;border-radius:3px;padding:0 5px;margin-right: 10px;' }, '第二期：455.00元'),
            h('span', { style: 'height: 35px;line-height: 35px;' }, '2018/10/04')
          ]),
          h('div', { style: 'margin-left: 14%;width: 70%;height: auto' }, [
            h('span', { style: 'display: inline-block;width: 50%;height: 35px;line-height: 35px;border: 1px solid #eee;border-radius:3px;padding:0 5px;margin-right: 10px;' }, '第三期：455.00元'),
            h('span', { style: 'height: 35px;line-height: 35px;' }, '2018/11/04')
          ])
        ]),
        beforeClose: (action, instance, done) => {
          done()
        }
      })
    },
    // 查看详情
    openDetail(index, row) {
      const this_ = this
      listEdit(row.orderNum).then(response => {
        const data = response.info
        this_.dateTime = timestampToTime(data.createTime)
        this_.proAmount = data.price - data.postage
        if (data.orderPaymentDto.payType === 1) {
          this_.payType = '支付宝支付'
        } else if (data.orderPaymentDto.payType === 2) {
          this_.payType = '微信支付'
        } else {
          this_.payType = ''
        }
        const h = this_.$createElement
        this_.$msgbox({
          title: '订单详情',
          center: true,
          message: h('div', [
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '订单编号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.id),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '产品类型'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.productType),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '下单时间'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, this_.dateTime),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '产品金额'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, this_.proAmount + '元'),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '邮寄费用'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.postage + '元'),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '支付金额'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.price + '元'),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '支付方式'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, this_.payType),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '销售ID'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.serviceCode),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '下单手机号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.username),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '收件人'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.consignee),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '手机号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.phone),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '邮寄地址'),
              h('span', { style: 'float: left;width: 70%;height: auto; min-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.province + data.city + data.area + data.address),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '邮寄单号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.trackingNumber),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '备注'),
              h('span', { style: 'float: left;width: 70%;height: auto; min-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;margin-left:5%;' }, data.remark),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ])
          ]),
          beforeClose: (action, instance, done) => {
            done()
          }
        })
      })
    },
    // 导出
    handleExoprt() {
      const params = {
        orderId: this.orderList.orderId,
        type: this.orderList.type,
        status: this.orderList.status,
        deptId: this.orderList.deptId,
        groupId: this.orderList.groupId,
        serviceCode: this.orderList.serviceCode,
        phone: this.orderList.phone,
        trackingNumber: this.orderList.trackingNumber,
        startDate: this.orderList.startDate,
        endDate: this.orderList.endDate
      }
      axios({
        method: 'post',
        url: 'http://cloud.hujia168.com:8912/platform-order/order/exportOrderDeliveryExcel',
        // url: 'http://192.168.10.245:8912/platform-order/order/exportOrderDeliveryExcel',
        data: qs.stringify(params),
        changeOrigin: true,
        responseType: 'blob',
        headers: {
          'Authorization': 'Bearer ' + getToken(),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        const content = res.data
        const blob = new Blob([content])
        const fileName = '订单列表.xls'
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
      })
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
        width: 55%;
        .el-input__inner{
          padding: 0 5px!important;
        }
      }
      .el-date-editor--date{
        width: 38%!important;
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
