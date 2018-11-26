<template>
    <div class="app-container">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/user/list' }">用户列表</el-breadcrumb-item>
            <el-breadcrumb-item>信息编辑</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="部门">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="小组">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input type="text" v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分班批次">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input type="text" v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
                <el-input type="textarea" v-model="form.msg"></el-input>
            </el-form-item>
            <el-form-item label="QQ号">
                <el-input type="text" v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
                <el-input type="text" v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio v-model="radio" label="1">正常</el-radio>
                <el-radio v-model="radio" label="2">冻结</el-radio>
            </el-form-item>
            <el-form-item class="el-button-edit">
                <el-button type="danger">取消修改</el-button>
                <el-button type="success">确定修改</el-button>
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
      },
      options: [{
        value: 'val1',
        label: 'label1'
      }, {
        value: 'val2',
        label: 'label2'
      }, {
        value: 'val3',
        label: 'label3'
      }],
      value: '',
      radio: ''
    }
  },
  methods: {
    // 申请退款
    toRefunds() {
      this.$router.push({ path: '/orders/refunds' })
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
                .el-select{
                    width: 100%;
                }
            }
        }
        .el-button-edit{
            text-align: center;
        }
    }
}
</style>

