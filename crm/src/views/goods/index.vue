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
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showStatus">
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
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showConsignee">
            收件人:
            <el-input v-model="orderList.consignee" placeholder="收件人姓名"></el-input>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showNick">
            销售:
            <el-input v-model="orderList.sellName" placeholder="销售姓名"></el-input>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showTel">
            手机号:
            <el-input v-model="orderList.phone"></el-input>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="showExpress">
            快递号:
            <el-input v-model="orderList.trackingNumber"></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" v-show="showDate">
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
            <el-button type="primary" @click="getResult" v-show="showSearch">搜索</el-button>
            <el-button type="success" @click="handleExoprt" style="margin-right:10px;" v-show="showExport">导出</el-button>
            <!-- <el-button type="warning" @click="uploadShow" style="margin-right:10px;" v-show="showIn">导入</el-button> -->
            <upload-excel-component :on-success='handleSuccess' :before-upload="beforeUpload" style="margin-right:10px;" v-show="showIn"></upload-excel-component>
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
          align="center">
          <template slot-scope="scope">{{ scope.$index + (orderList.page - 1) * orderList.size + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" label='订单编号' width="170">
          <template slot-scope="scope">
            {{scope.row.orderNum}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="下单手机号">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品">
          <template slot-scope="scope">
            {{scope.row.productTitle}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="数量" width="50">
          <template slot-scope="scope">
            {{scope.row.productCount}}
          </template>
        </el-table-column>
        <el-table-column label="金额" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="支付方式" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.payType === 1 ? '支付宝' : (scope.row.payType === 2 ? '微信' : '')}}
          </template>
        </el-table-column>
        <el-table-column label="销售ID" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sellName+scope.row.serviceCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.creatime}}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="110" align="center">
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
        <el-table-column align="center" label='收件人' :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <template v-if="scope.row.editeFlage">
            <el-input class="edit-input" size="small" v-model="scope.row.consignee"></el-input>
          </template>
          <span v-else>{{scope.row.consignee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="收件人电话">
          <template slot-scope="scope">
            <template v-if="scope.row.editeFlage">
            <el-input class="edit-input" size="small" v-model="scope.row.recivePhone"></el-input>
          </template>
          <span v-else>{{scope.row.recivePhone}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货单号">
          <template slot-scope="scope">
            <template v-if="scope.row.editeFlage">
            <el-input class="edit-input" size="small" v-model="scope.row.trackingNumber"></el-input>
          </template>
          <span v-else>{{scope.row.trackingNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label='地址' :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.province+scope.row.city+scope.row.area}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="详细地址">
          <template slot-scope="scope">
            <template v-if="scope.row.editeFlage">
            <el-input class="edit-input" size="small" v-model="scope.row.address"></el-input>
          </template>
          <span v-else>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="openEdit(scope.$index, scope.row)">编辑</el-button>
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
import { timestampToTime, timestampToDatetime, timestampToDateFormat } from '@/common/dateFormat'
import { getGoods, listEdit, getType, editGoods } from '@/api/order'
import { uploadExcel } from '@/api/sales'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import qs from 'qs'
import { getPermission } from '@/api/login'
// import { Message } from 'element-ui'

export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      uploadShow: true,
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
        type: '',
        consignee: '',
        trackingNumber: ''
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
      // 导出
      // excelData: {
      //   header: null,
      //   results: null
      // },
      listData: [],
      uploadFile: [],
      // 导入
      // 搜索栏-显示隐藏
      showConsignee: true,
      showSearch: true,
      showOrder: true,
      showType: true,
      showStatus: true,
      showNick: true,
      showTel: true,
      showDate: true,
      showExpress: true,
      showExport: true,
      showIn: true
    }
  },
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    init() {
      const this_ = this
      if (this_.$store.getters.roleName === '销售专员' || this_.$store.getters.roleName === '销售组长' || this_.$store.getters.roleName === '销售经理') {
        this_.showOrder = false
        this_.showType = false
        this_.showStatus = false
        this_.showNick = false
        this_.showTel = false
        this_.showDate = false
        this_.showExpress = false
        this_.showExport = false
        this_.showIn = false
        this_.showSearch = false
      }
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
        this.listLoading = false
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
    // 编辑
    // 取消修改，恢复之前的数据
    cancelEdit(row) {
      this.getList()
      row.editeFlage = false
      this.$message({
        message: '取消修改',
        type: 'warning'
      })
    },
    // 提交修改
    confirmEdit(row) {
      row.editeFlage = false
      let obj = {}
      const array = this.list
      array.forEach(res => {
        if (row.orderNum === res.orderNum) {
          obj = res
        }
      })
      const data = {
        orderNum: obj.orderNum,
        consignee: obj.consignee,
        recivePhone: obj.recivePhone,
        trackingNumber: obj.trackingNumber,
        address: obj.address
      }
      editGoods(data).then(res => {
        this.getList()
      })
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    },
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
            if (item.meta.title === '发货系统编辑') {
              // 编辑完整数据赋值
              localStorage.setItem('goodsEditForm', JSON.stringify(response.info))
              return that.$router.push({ path: item.path })
            } else {
              return false
            }
          })
        })
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
          this_.payType = '支付宝'
        } else if (data.orderPaymentDto.payType === 2) {
          this_.payType = '微信'
        } else if (data.orderPaymentDto.payType === 3) {
          this_.payType = 'apple utils'
        } else if (data.orderPaymentDto.payType === 4) {
          this_.payType = 'exchange'
        }
        const h = this_.$createElement
        this_.$msgbox({
          title: '订单详情',
          center: true,
          message: h('div', [
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '订单编号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.id),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '产品类型'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.productType),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '下单时间'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, this_.dateTime),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '产品金额'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, this_.proAmount + '.00 元'),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '邮寄费用'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.postage + '.00 元'),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '支付金额'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.price + '.00 元'),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '支付方式'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, this_.payType + '支付'),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '销售ID'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.serviceCode),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '下单手机号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.username),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '收件人'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.consignee),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '手机号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.phone),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '邮寄地址'),
              h('span', { style: 'float: left;width: 70%;height: auto; min-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.address),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '邮寄单号'),
              h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.trackingNumber),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ]),
            h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
              h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '备注'),
              h('span', { style: 'float: left;width: 70%;height: auto; min-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, data.remark),
              h('span', { style: 'display: block;content: "";clear: both;' })
            ])
          ]),
          beforeClose: (action, instance, done) => {
            done()
          }
        })
      })
    },
    // 跳转至添加商品页面-上架
    // toAdd() {
    //   this.$router.push({ path: '/orders/goods/add' })
    // }
    // 导出
    handleExoprt() {
      const exportDate = new Date()
      const that = this
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
      }).then((res) => {
        if (that.pageTotal === 0) {
          that.$message({
            message: '当前无数据导出，请选择导出数据',
            type: 'warning'
          })
        } else {
          const content = res.data
          const blob = new Blob([content])
          const fileName = timestampToDateFormat(exportDate) + '发货明细.xls'
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
    },
    // 导入
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      const that = this
      const arr = []
      results.map((el, i) => {
        arr.push({
          orderNum: el.CRM订单号,
          consignee: el.收货人姓名,
          recivePhone: el.收货人手机,
          trackingNumber: el.运单号
        })
      })
      that.uploadFile = arr
      const excelData = {
        excelVos: that.uploadFile
      }
      uploadExcel(excelData).then(res => {
        if (res.code !== '200') {
          that.$message({
            message: res.description,
            type: 'warning'
          })
        } else {
          that.getList()
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
      .el-date-editor--datetime{
        width: 43%!important;
        .el-input__inner{
          padding-right: 0;
        }
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
