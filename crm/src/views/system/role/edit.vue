<template>
    <div class="app-container">
        <div class="sales-content">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="form.roleId" @change="changeRole">
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
                <el-form-item label="重置密码" prop="password">
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
                    <el-button type="success" @click="toUpdate('form')">确定修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { roleUpdate } from '@/api/role'
import { toAdd } from '@/api/sales'

export default {
  data() {
    return {
      form: {
        // 需要变更成的角色名ID
        roleId: '',
        // 原用户角色ID
        userRoleId: '',
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
          { required: true, message: '请输入管理员登录用户名', trigger: 'blur' }
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
      // 数据初始化
      this.form = JSON.parse(localStorage.getItem('roleEditForm'))
      this.form.username = JSON.parse(localStorage.getItem('roleEditForm')).username
      this.form.userRoleId = JSON.parse(localStorage.getItem('roleEditForm')).roleId
      this.form.roleId = JSON.parse(localStorage.getItem('roleEditForm')).roleId
      this.form.realName = JSON.parse(localStorage.getItem('roleEditForm')).realName
      this.form.password = JSON.parse(localStorage.getItem('roleEditForm')).password
      this.form.crmStatus = JSON.parse(localStorage.getItem('roleEditForm')).crmStatus
      // 角色选项赋值
      toAdd().then(response => {
        const arr1 = []
        const array = response.dataList
        array.forEach(element => {
          arr1.push({ value: element.id, label: element.name })
        })
        this.options1 = arr1
      })
    },
    // 角色id变化
    changeRole(val) {
      this.form.roleId = val
    },
    // 修改管理员
    toUpdate(formName) {
      const that = this
      that.form.createBy = that.$store.getters.userId
      const data = that.form
      that.$refs[formName].validate((valid) => {
        if (valid) {
          roleUpdate(data).then(response => {
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
