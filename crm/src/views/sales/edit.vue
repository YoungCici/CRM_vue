<template>
    <div class="app-container">
        <div class="sales-content">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="form.roleId" @change="roleList">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="deptId">
                    <el-select v-model="form.deptId" @change="groupList">
                      <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <!-- <el-cascader
                      :options="options2"
                      @active-item-change="handleItemChange"
                      :props="props"
                      v-model="form.deptId">
                    </el-cascader> -->
                </el-form-item>
                <el-form-item label="小组" prop="teamId" v-show="showGroup">
                    <el-select v-model="form.teamId" @focus="test">
                        <el-option
                            v-for="item in options3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="QQ号" prop="qq">
                    <el-input v-model="form.qq"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat">
                    <el-input v-model="form.wechat"></el-input>
                </el-form-item>
                <el-form-item label="后台账号" prop="username">
                    <el-input v-model="form.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="后台密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="crmStatus">
                    <el-radio-group v-model="form.crmStatus" @change="changeStatus">
                        <el-radio v-for="item in radios" :label="item.id" :key="item.id">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item> -->
                <el-form-item class="el-button-edit">
                    <el-button type="danger" @click="toCancel">取消</el-button>
                    <el-button type="primary" @click="toUpdate('form')">确认修改</el-button>
                    <el-button type="success" @click="viewCode">查看专属码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { toAdd, topDept, childrenDeptAll, viewCode, updateSales } from '@/api/sales'
import { getPermission } from '@/api/login'

export default {
  data() {
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
        crmStatus: 0,
        // 创建者用户ID,即登录用户ID
        createBy: '',
        // 添加销售标识，即添加角色为 销售 时,传true
        sellerFlag: false
      },
      // 单选框选项
      radios: [{
        id: 1,
        label: '禁用'
      }, {
        id: 0,
        label: '启用'
      }],
      rules: {
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        // teamId: [
        //   { required: true, message: '请选择小组', trigger: 'change' }
        // ],
        realName: [
          { required: true, message: '请输入销售真实姓名', trigger: 'blur' }
        ],
        qq: [
          { required: true, message: '请输入业务QQ', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入业务微信', trigger: 'blur' }
        ],
        crmStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入登录账号(手机号)', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      },
      // 输入框的值是否发生改变
      valChange: false,
      // select
      options1: [],
      // 部门顶级
      options2: [],
      options3: [],
      deptVal: '',
      // radio
      radio: '',
      showGroup: true
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
      this.form = JSON.parse(localStorage.getItem('salesEditForm'))
      this.roleList(this.form.roleId)
      this.rolesList()
      this.topDeptList()
      childrenDeptAll(this.form.deptId).then(res => {
        const arrSub = []
        const arraySub = res.info
        arraySub.map((item, index) => {
          if (item.parentId === this.form.deptId) {
            arrSub.push({ value: item.id, label: item.name })
          }
        })
        this.options3 = arrSub
      })
    },
    roleList(val) {
      // 角色选择为-销售经理时，只有部门无小组
      if (val === 'R00006') {
        this.showGroup = false
      } else {
        this.showGroup = true
      }
    },
    rolesList() {
      // 角色选项赋值
      toAdd().then(response => {
        // 编辑完整数据赋值
        // this.$store.state.order.addForm = Object.assign({}, response)
        const arr1 = []
        const array = response.dataList
        array.forEach(element => {
          // arr1.push({ value: element.id, label: element.name })
          // 角色选项-只要销售专员、销售组长、销售经理
          if (element.name === '销售专员' || element.name === '销售组长' || element.name === '销售经理') {
            arr1.push({ value: element.id, label: element.name })
          }
        })
        this.options1 = arr1
      })
    },
    topDeptList() {
      // 部门选项赋值
      // 顶级部门
      const that = this
      topDept().then(response => {
        const arr2 = []
        const array2 = response.info
        array2.forEach(element => {
          // arr2.push({ value: element.id, label: element.name, depts: [] })
          arr2.push({ value: element.id, label: element.name })
        })
        that.options2 = arr2
      })
    },
    // handleItemChange(val) {
    //   // 所有下级部门级联选择-小组
    //   const that = this
    //   childrenDeptAll(val[0]).then(response => {
    //     const arrSub = []
    //     const arraySub = response.info
    //     arraySub.map((item, index) => {
    //       if(item.parentId === val[0]){
    //         that.options2.map((o, i) => {
    //           if(o.value === val[0]){
    //             arrSub.push({ value: item.id, label: item.name })
    //             that.options2[i].depts = arrSub
    //           }
    //         })
    //       }
    //     })
    //   })
    // },
    groupList(val) {
      // 所有下级部门级联选择-小组
      const that = this
      that.deptVal = val
      if (val !== JSON.parse(localStorage.getItem('salesEditForm')).deptId) {
        that.form.teamId = ''
      }
    },
    test() {
      // 所有下级部门级联选择-小组
      const that = this
      const val = that.deptVal === '' ? that.form.deptId : that.deptVal
      childrenDeptAll(val).then(response => {
        const arrSub = []
        const arraySub = response.info
        arraySub.map((item, index) => {
          if (item.parentId === val) {
            arrSub.push({ value: item.id, label: item.name })
          }
        })
        that.options3 = arrSub
        if (arrSub.length === 0) {
          that.form.teamId = ''
          that.options3 = arrSub
        } else {
          that.options3 = arrSub
        }
      })
    },
    // 单选事件
    changeStatus() {
      // console.log(this.form.status)
    },
    // 确认修改
    toUpdate(formName) {
      const this_ = this
      this_.$refs[formName].validate((valid) => {
        if (valid) {
          updateSales(this_.form).then(res => {
            if (res.code !== '200') {
              this_.$message({
                message: res.description,
                type: 'warning'
              })
            } else {
              this_.$router.push({ path: '/sales/seller' })
            }
          })
        } else {
          return false
        }
      })
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
    // 取消按钮
    toCancel() {
      this.$router.push({ path: '/sales/seller' })
    },
    // 生成专属二维码
    // toCode() {
    //   const this_ = this
    //   this_.form.createBy = this_.$store.getters.userId
    //   this_.form.sellerFlag = true
    //   if (this_.form.crmStatus === '禁用') {
    //     this_.form.crmStatus = 1
    //   } else if (this_.form.crmStatus === '启用') {
    //     this_.form.crmStatus = 0
    //   }
    //   addSales(this_.form).then(response => {
    //     this_.$store.getters.nick = this_.form.realName
    //     this_.$router.push({ path: '/sales/index/code' })
    //   })
    // },
    // 查看专属二维码
    viewCode() {
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      viewCode(this.form.username).then(res => {
        getPermission(datap).then(resp => {
          const arr = resp.dataList
          arr.map((item, index) => {
            if (item.meta.title === '查看专属码') {
              // 编辑完整数据赋值
              // this.$store.state.sales.codeForm = Object.assign({}, res.info)
              return this.$router.push({ path: item.path, query: res.info })
            } else {
              return false
            }
          })
        })
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

