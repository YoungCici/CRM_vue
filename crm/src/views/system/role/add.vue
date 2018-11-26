<template>
    <div class="app-container">
        <div class="sales-content">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="form.roleId">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="crmStatus">
                    <el-select v-model="form.crmStatus">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-button-edit">
                    <el-button type="success" @click="roleAdd('form')">确定添加</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { addRole } from '@/api/role'
import { toAdd } from '@/api/sales'

export default {
  data() {
    const validateUserName = (rule, value, callback) => {
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
      form: {
        roleId: '',
        deptId: '',
        teamId: '',
        realName: '',
        qq: '',
        wechat: '',
        username: '',
        password: '',
        crmStatus: '',
        // 创建者用户ID,即登录用户ID
        createBy: '',
        // 添加销售标识，即添加角色为 销售 时,传true
        sellerFlag: false
      },
      rules: {
        username: [
          { required: true, message: '请输入管理员登录用户名', trigger: 'blur', validator: validateUserName }
        ],
        roleId: [
          { required: true, message: '请选择管理员角色', trigger: 'change' }
        ],
        realName: [
          { required: true, message: '请输入管理员真实姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入管理员登录密码', trigger: 'blur' },
          { min: 6, message: '长度至少六位', trigger: 'blur' }
        ],
        crmStatus: [
          { required: true, message: '请选择管理员状态', trigger: 'change' }
        ]
      },
      // 输入框的值是否发生改变
      valChange: false,
      // select
      options1: [],
      // 部门顶级
      options2: [{
        value: 0,
        label: '启用'
      }, {
        value: 1,
        label: '禁用'
      }]
    }
  },
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    // 初始化
    init() {
      // 角色选项赋值
      toAdd().then(response => {
        let arr1 = []
        response.dataList.map((element, index) => {
          arr1.push({ value: element.id, label: element.name })
        })
        // 角色过滤-去掉销售专员、组长、经理
        arr1 = arr1.filter(res => {
          if (res.label === '销售专员' || res.label === '销售组长' || res.label === '销售经理') {
            return false
          } else {
            return res
          }
        })
        this.options1 = arr1
      })
    },
    // 添加管理员
    roleAdd(formName) {
      const that = this
      const data = that.form
      that.form.createBy = that.$store.getters.userId
      that.$refs[formName].validate((valid) => {
        if (valid) {
          addRole(data).then(response => {
            if (response.code !== '200') {
              that.$message({
                message: response.description,
                type: 'warning'
              })
            } else {
              that.$router.push({ path: '/system/role' })
            }
          })
        } else {
          return false
        }
      })
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
        .el-select, .el-cascader{
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
