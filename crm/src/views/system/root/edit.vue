<template>
    <div class="app-container">
        <div class="sales-content">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名：">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="权限选择：">
                </el-form-item>
                <el-form-item v-for="(item, index) in roots" :key="index">
                  <el-row>
                    <el-col>
                      <el-checkbox-group v-model="checkList" @change="checkInList">
                        <el-checkbox :span="24" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                  <el-row style="border:1px solid #999;padding-left:25px;margin-left:25px;">
                    <el-col :span="6" v-for='(items, indexs) in item.resources' :key='indexs'>
                      <span>{{ items }}</span>
                        <!--<span>{{indexs + 1}}、</span>-->
                        <!--<span>{{items.name}}</span>-->
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="状态：">
                  <el-radio-group v-model="form.status" @change="changeStatus">
                    <!-- <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio> -->
                    <el-radio v-for="item in radios" :label="item.id" :key="item.id">{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item class="el-button-edit">
                    <el-button type="success" @click="toEdit">确定修改</el-button>
                </el-form-item>
            </el-form>
        </div>
      <span v-show="false">{{ pre }}</span>
    </div>
</template>

<script>
import { getListPermission, updateRootRole, getPermissionRoot } from '@/api/root'

export default {
  data() {
    return {
      form: {
        name: '',
        id: '',
        // 创建者用户ID,即登录用户ID
        createBy: '',
        // 权限ID-从所有权限id拼接的字符串
        permissionIds: '',
        status: 0
      },
      // 单选框选项
      radios: [{
        id: 0,
        label: '禁用'
      }, {
        id: 1,
        label: '启用'
      }],
      // 复选框
      checkList: [],
      // 权限选择
      topRoots: [],
      roots: [],
      rootAll: [],
      pre: undefined,
      rules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ],
        checkList: [
          { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
        ],
        status: [
          { type: 'date', required: true, message: '请选择角色状态', trigger: 'change' }
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
      const _this = this
      this.form.name = JSON.parse(localStorage.getItem('rootRoleName'))
      this.form.id = JSON.parse(localStorage.getItem('rootRoleId'))
      this.form.status = JSON.parse(localStorage.getItem('rootStatus'))
      // this.checkList = this.form.permissionIds
      // 取角色的权限列表
      const datar = {
        roleId: this.form.id
      }
      const data = []
      const arr1 = []
      getPermissionRoot(datar).then(res => {
        const arrCheck = []
        res.dataList.map((itemr, indexr) => {
          const permissions = {}
          permissions.id = itemr.id
          permissions.name = itemr.name
          // 判断已有权限
          if (itemr.owned === 1) {
            arrCheck.push(itemr.id)
            this.checkList = arrCheck
          }
          // 根据匹配的权限id获取对应权限资源
          const datap = {
            permissionId: itemr.id
          }
          const arr2 = []
          getListPermission(datap).then(resp => {
            resp.dataList.map((itemr2, indexr2) => {
              arr2.push(itemr2.name)
              _this.pre = itemr2
            })
            permissions.resources = arr2
          })
          arr1.push(permissions)
        })
      })
      data.push(arr1)
      this.roots = arr1
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
        } else {
          // console.log('err submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 复选框
    checkInList() {
      const array = this.checkList
      let str = ''
      array.map((element, id) => {
        str += element + ','
      })
      // 去掉最后一个,分号
      if (str.length > 0) {
        str = str.substr(0, str.length - 1)
      }
      this.form.permissionIds = str
    },
    // 单选事件
    changeStatus() {
      // console.log(this.form.status)
    },
    toEdit() {
      this.form.createBy = this.$store.getters.userId
      const data = this.form
      updateRootRole(data).then(res => {
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
      margin-bottom: 10px;
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
