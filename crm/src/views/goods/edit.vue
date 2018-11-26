<template>
    <div class="app-container">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/test/order' }">订单列表</el-breadcrumb-item>
            <el-breadcrumb-item>信息编辑</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item>
                <el-col>订单编号：{{form.id}}</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">产品类型：{{form.productType}}</el-col>
                <el-col :span="11">下单时间：{{dateTime}}</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">产品金额：{{proAmount}}元</el-col>
                <el-col :span="11">邮寄费用：{{form.postage}}元</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">支付金额：{{form.price}}元</el-col>
                <el-col :span="11">支付方式：
                    {{payType=== 1 ? '支付宝' : 
                    (payType=== 2 ? '微信' : 
                    (payType=== 3 ? 'apple utils' : 
                    'exchange'))}}
                    支付
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">用户ID：{{form.userId}}</el-col>
                <el-col :span="11">销售ID：{{form.serviceCode}}</el-col>
            </el-form-item>
            <el-form-item>
                <el-col>下单手机号：{{form.username}}</el-col>
            </el-form-item>
            <el-form-item label="收件人" prop="consignee">
                <el-input type="text" v-model="form.consignee" @change="change"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input type="text" v-model="form.phone" @change="change"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-select v-model="form.province" placeholder="省" @change="changeTop2">
                    <el-option
                        v-for="item in optionArea"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="form.city" placeholder="市" @change="changeNext" @focus="test1()">
                    <el-option
                        v-for="item in optionArea2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="form.area" placeholder="区" @change="getAreaId" @focus="test2()">
                    <el-option
                        v-for="item in optionArea3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input type="textarea" v-model="form.address" @change="change"></el-input>
            </el-form-item>
            <el-form-item label="邮寄单号" v-if="form.address !== ''">
                <el-input type="text" v-model="form.trackingNumber" @change="change"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark" @change="change"></el-input>
            </el-form-item>
            <el-form-item class="el-button-edit">
                <el-button type="danger" @click="toCancel">取消</el-button>
                <!-- <el-button type="primary" @click="toRefunds">申请退款</el-button> -->
                <el-button type="success" @click="toUpdate('form')">确定修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { timestampToTime } from '@/common/dateFormat'
import { updateEdit, getAreaTop, getAreaNext } from '@/api/order'
import { Message } from 'element-ui'

export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      form: {},
      // 时间格式转换
      dateTime: '',
      // 产品金额 = 支付金额 - 邮费
      proAmount: '',
      // 支付方式
      payType: '',
      // 输入框的值是否发生改变
      valChange: false,
      provinceIds: '',
      provinceOldIds: '',
      cityIds: '',
      cityOldIds: '',
      areaIds: '',
      optionArea: [],
      optionArea2: [],
      optionArea3: [],
      rules: {
        consignee: [
          { required: true, message: '收件人不能为空', trigger: 'change' }
        ],
        phone: [
          { required: true, trigger: 'change', validator: validatePhone }
        ],
        address: [
          { required: true, message: '请填写收件人详细地址', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    // 数据初始化
    init() {
      this.form = JSON.parse(localStorage.getItem('goodsEditForm'))
      this.payType = this.form.orderPaymentDto.payType
      this.dateTime = timestampToTime(this.form.createTime)
      this.proAmount = this.form.price - this.form.postage
      // 初始化 省-市-区 数据
      // 省
      getAreaTop().then(res => {
        const arr = []
        const array = res.dataList
        array.map((items, indexs) => {
          arr.push({ value: items.provinceId, label: items.provinceName })
          if (this.form.province === items.provinceName) {
            this.provinceIds = items.provinceId
            this.changeTop(this.provinceIds)
          }
        })
        this.optionArea = arr
      })
      // 市
      const data2 = {
        type: 2,
        provinceId: this.provinceIds
      }
      getAreaNext(data2).then(res => {
        const arr2 = []
        const array2 = res.dataList
        array2.forEach(el => {
          arr2.push({ value: el.cityId, label: el.cityName })
          if (this.form.city === el.cityName) {
            this.cityIds = el.cityId
            this.changeNext(this.cityIds)
          }
        })
        this.optionArea2 = arr2
      })
      // 区
      const data3 = {
        type: 3,
        cityId: this.cityIds
      }
      getAreaNext(data3).then(res => {
        const arr3 = []
        const array3 = res.dataList
        array3.forEach(el => {
          arr3.push({ value: el.areaId, label: el.areaName })
        })
        this.optionArea3 = arr3
      })
    },
    // 区域选择
    changeTop(val) {
      const that = this
      // 选择后的省id
      that.provinceIds = val
    },
    changeTop2(val) {
      const that = this
      // 选择后的省id
      that.provinceIds = val
      // 比较 原省id 和 现省id,不相等则清空原省id，传现省id
      if (this.provinceOldIds !== this.provinceIds) {
        this.provinceOldIds = ''
        this.form.city = ''
        this.form.area = ''
      }
    },
    changeNext(val) {
      const that = this
      // 选择后的省id
      that.cityIds = val
    },
    test1() {
      // 比较 原省id 和 现省id,不相等则清空原省id，传现省id
      if (this.provinceOldIds !== this.provinceIds) {
        this.provinceOldIds = ''
        this.form.area = ''
      }
      this.optionArea.map((provinces, indexs) => {
        if (provinces.label === this.form.province) {
          this.provinceIds = provinces.value
        }
      })
      const val = this.provinceIds === '' ? this.provinceOldIds : this.provinceIds
      // 市
      const data2 = {
        type: 2,
        provinceId: val
      }
      getAreaNext(data2).then(res => {
        const arr2 = []
        const array2 = res.dataList
        array2.forEach(el => {
          arr2.push({ value: el.cityId, label: el.cityName })
          this.optionArea.map((el, index) => {
            if (el.value === this.provinceIds) {
              this.form.province = el.label
            }
          })
        })
        this.optionArea2 = arr2
      })
      this.valChange = true
    },
    test2() {
      const that = this
      // 在区域资源里面通过 原市name 查询对应的 原市id
      this.optionArea2.map((items, indexs) => {
        if (items.label === JSON.parse(localStorage.getItem('orderEditForm')).city) {
          that.cityOldIds = items.value
        }
      })
      const val = this.cityIds === '' ? this.cityOldIds : this.cityIds
      this.optionArea2.map((items, indexs) => {
        if (items.value === val) {
          that.form.city = items.label
        }
      })
      // 区
      const data3 = {
        type: 3,
        cityId: val
      }
      getAreaNext(data3).then(res => {
        const arr3 = []
        const array3 = res.dataList
        array3.forEach(el => {
          arr3.push({ value: el.areaId, label: el.areaName })
        })
        this.optionArea3 = arr3
      })
      this.valChange = true
    },
    getAreaId(val) {
      const that = this
      this.optionArea3.map((items, indexs) => {
        if (items.value === val) {
          that.form.area = items.label
        }
      })
      this.form.areaId = val
      this.valChange = true
    },
    // 取消按钮
    toCancel() {
      this.$router.push({ path: '/orders/goods' })
    },
    // 输入框的值发生改变时触发
    change() {
      this.valChange = true
    },
    // 确认修改
    toUpdate(formName) {
      const this_ = this
      this_.$refs[formName].validate((valid) => {
        if (valid) {
          updateEdit(this_.form).then(response => {
            if (response.code !== '200') {
              Message({
                message: response.description,
                type: 'error',
                duration: 20 * 1000
              })
            } else {
              if (this_.valChange === true) {
                this_.$router.push({ path: '/orders/goods' })
              } else {
                this.$message({
                  message: '您还未修改哦!',
                  type: 'warning'
                })
              }
            }
          })
        } else {
          return false
        }
      })
    }
    // 申请退款
    // toRefunds() {
    //   this.$router.push({ path: '/orders/refunds' })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  padding: 20px;
  .el-breadcrumb{
    padding: 10px;
    margin-bottom: 20px;
  }
  .el-form{
    margin: 20px auto;
    max-width: 70%;
    padding: 40px;
    border: 1px solid #eee;
    -moz-box-shadow: 2px 2px 5px #ccc;
    -webkit-box-shadow: 2px 2px 5px #ccc;
    box-shadow: 2px 2px 5px #ccc;
    .el-form-item{
      margin-bottom: 30px;
      .el-form-item__content{
        line-height: 30px;
      }
    }
    .el-button-edit{
      text-align: center;
    }
  }
}
</style>

