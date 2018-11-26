<template>
    <div class="app-container">
        <div class="sales-content">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名：" prop="roleName">
                  <el-input v-model="form.roleName"></el-input>
                </el-form-item>
                <el-form-item label="权限选择：">
                </el-form-item>
                <el-form-item v-for="(item,index) in roots" :key="index">
                  <el-row>
                    <el-col :span="24">
                      <!--@change="changeInList" -->
                      <el-checkbox-group v-model="checkList" @change="changeInList">
                        <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                  <el-row style="border:1px solid #999;padding-left:25px;margin-left:25px;">
                    <el-col :span="6" v-for="(item1,index1) in item.permisArr" :key="index1">
                      <span>{{item1}}</span>
                      <!--<span>{{index1 + 1}}、</span>-->
                      <!--<span v-for="(item2,index2) in item1.name" :key="index2">{{item2}}</span>-->
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="状态：" prop="status">
                  <el-radio-group v-model="form.status">
                    <!-- <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio> -->
                    <el-radio v-for="item in radios" :label="item.id" :key="item.id">{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item class="el-button-edit">
                    <el-button type="success" @click="toAdd('form')">确定添加</el-button>
                </el-form-item>
            </el-form>
          <span v-show="false">{{ pre }}</span>
        </div>
    </div>
</template>

<script>
import { addRootRole, getListPermission, getRootAll } from '@/api/root'

export default {
  data() {
    return {
      // 复选框
      checkList: [],
      form: {
        roleName: '',
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
      // 权限选择
      roots: undefined,
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
  mounted() {
    this.init()
    // this.$nextTick(function() {
    // })
  },
  methods: {
    // 初始化
    init() {
      const _this = this
      getRootAll().then(response => {
        const data = []
        response.dataList.map(value => {
          const item = {}
          const permisArr = []
          item.id = value.id
          item.name = value.name
          getListPermission({ permissionId: value.id }).then(
            res => {
              res.dataList.map(value => {
                permisArr.push(value.name)
              })
              _this.pre = permisArr
              item.permisArr = permisArr
            }
          )
          data.push(item)
        })
        _this.roots = data
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 复选框事件
    changeInList() {
      const array = this.checkList
      let str = ''
      array.forEach(element => {
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
      // console.log(this.status)
    },
    toAdd(formName) {
      this.form.createBy = this.$store.getters.userId
      // const data = this.form
      if (this.form.roleName !== '' && this.form.permissionIds !== '' && this.form.createBy !== '') {
        addRootRole(this.form).then(res => {
          const url_ = window.location.href.split('#')[0] + '#/system/root'
          window.location.href = url_
        })
      } else {
        if (this.form.permissionIds === '') {
          this.$message('请至少选择一个权限')
        } else if (this.form.roleName === '') {
          this.$message('请输入角色名')
        }
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
