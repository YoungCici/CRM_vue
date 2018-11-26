<template>
    <div class="app-container">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/orders/order' }">订单列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/orders/order/edit'}">信息编辑</el-breadcrumb-item>
            <el-breadcrumb-item>申请退款</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                <el-col>订单编号：20180712000000</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">产品类型：金券</el-col>
                <el-col :span="11">下单时间：2018/04/07 12:20</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">产品类型：金券</el-col>
                <el-col :span="11">下单时间：2018/04/07 12:20</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">产品金额：78.00元</el-col>
                <el-col :span="11">邮寄费用：20.00元</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">支付金额：98.00元</el-col>
                <el-col :span="11">支付方式：微信支付</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">支付金额：98.00元</el-col>
                <el-col :span="11">销售ID：林晓阳3121</el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="11">用户昵称：何晓阳</el-col>
                <el-col :span="11">用户ID：100001</el-col>
            </el-form-item>
            <el-form-item>
                <el-col>收件人：林晓阳1223</el-col>
            </el-form-item>
            <el-form-item>
                <el-col>手机号：15884928242</el-col>
            </el-form-item>
            <el-form-item>
                <el-col>邮寄地址：重庆市九龙坡区谢家湾正街建园小区13栋楼1单元4-1</el-col>
            </el-form-item>
            <el-form-item>
                <el-col>备注：邮寄请加包装</el-col>
            </el-form-item>
            <el-form-item label="退货原因" aria-placeholder="请如实说明退货原因">
                <el-input type="textarea" v-model="form.msg"></el-input>
            </el-form-item>
            <el-form-item class="el-button-edit">
                <el-button type="success">确定提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        tel: '',
        num: '',
        address: '',
        msg: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
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
        margin: 20px 25%;
        padding: 40px;
        border: 1px solid #eee;
        -moz-box-shadow: 2px 2px 5px #ccc;
        -webkit-box-shadow: 2px 2px 5px #ccc;
        box-shadow: 2px 2px 5px #ccc;
        .el-form-item{
            margin-bottom: 10px;
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

