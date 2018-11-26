<template>
  <div class="app-container">
    <div class="role content">
      <el-row class="el-row-table">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" v-show="showUser">
            用户名:
            <el-input v-model="roleList.username"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" v-show="showReal">
            真实姓名:
            <el-input v-model="roleList.realName"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" v-show="showRole">
            角色:
            <el-select v-model="roleList.roleName" @change="changeRole" placeholder="请选择">
              <el-option :value="option.value" :label="option.label"></el-option>
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" style="text-align:right">
            <el-button type="primary" @click="getResult" v-show="showSearch">搜索</el-button>
            <el-button type="success" @click="toAdd" v-show="showAdd">添加管理员</el-button>
        </el-col>
      </el-row>
      <el-table
        v-loading.body="listLoading"
        :row-class-name="tableRowClassName"
        element-loading-text="正在加载中"
        element-loading-spinner="el-icon-loading"
        :data="list"
        border fit highlight-current-row>
        <el-table-column align="center" label='序号' width="80">
          <template slot-scope="scope">
            {{ scope.$index + (roleList.page - 1) * roleList.size + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">
            {{scope.row.username}}
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            {{scope.row.roleName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="真实姓名">
          <template slot-scope="scope">
            {{scope.row.realName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            {{scope.row.crmStatus === 0 ? '启用中' : '暂停中'}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加人">
          <template slot-scope="scope">
            {{scope.row.createBy}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加时间" prop="date">
          <template slot-scope="scope">
            {{scope.row.createTime | formdate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-show="optionShow">
          <template slot-scope="scope">
            <el-button type="primary" @click="toEdit(scope.row.username)" v-show="editShow">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="el-row-page">
        <el-col>
          <el-pagination
            @size-change="handleRoleSize"
            @current-change="handleRoleCurrent"
            :page-sizes="[5, 10, 15, 20]"
            :current-page="roleList.page"
            :page-size="roleList.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getRole } from '@/api/role'
import { toDetail, toAdd } from '@/api/sales'
import { timestampToDate } from '@/common/dateFormat'
import { getPermission } from '@/api/login'

export default {
  data() {
    return {
      listLoading: true,
      list: [],
      // 分页器 总页数
      pageTotal: 0,
      roleList: {
        page: 1,
        size: 10,
        realName: '',
        roleName: '',
        username: ''
      },
      // 下拉框默认项
      option: {
        label: '全部',
        value: ''
      },
      options1: [],
      // 搜索栏-显示隐藏
      showSearch: false,
      showUser: false,
      showReal: false,
      showRole: false,
      showAdd: false,
      // 表格数据-显示隐藏
      optionShow: false,
      editShow: false
    }
  },
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  filters: {
    // YYYY-MM-DD
    formdate: function(val) {
      if (!val) return ''
      return timestampToDate(val)
    }
  },
  methods: {
    init() {
      const that = this
      // 角色选项赋值
      toAdd().then(response => {
        // 编辑完整数据赋值
        // this.$store.state.order.addForm = Object.assign({}, response)
        const arr1 = []
        const array = response.dataList
        array.forEach(element => {
          arr1.push({ value: element.id, label: element.name })
        })
        that.options1 = arr1
      })
      if (that.$store.getters.roleName === '超级管理员') {
        that.showUser = true
        that.showReal = true
        that.showRole = true
        that.showAdd = true
        that.editShow = true
        that.optionShow = true
        that.showSearch = true
      }
      if (that.$store.getters.roleName === '销售总监') {
        that.showUser = true
        that.showReal = true
        that.showSearch = true
      }
      that.getList()
    },
    // 表头设置
    tableRowClassName({ row, rowIndex }) {
      // console.log(row, rowIndex)
    },
    getList() {
      const that = this
      // const data = that.roleList
      const para = {
        page: that.roleList.page,
        size: that.roleList.size,
        realName: that.roleList.realName,
        roleName: that.roleList.roleName,
        username: that.roleList.username
      }
      that.listLoading = true
      getRole(para).then(response => {
        that.list = response.dataList
        that.roleList.page = response.pageNo
        that.roleList.size = response.pageSize
        that.pageTotal = response.totalCount
        that.listLoading = false
      })
    },
    // 搜索
    getResult() {
      const data = {
        page: 1,
        size: 10,
        realName: this.roleList.realName,
        roleName: this.roleList.roleName,
        username: this.roleList.username
      }
      this.listLoading = true
      getRole(data).then(response => {
        this.list = response.dataList
        this.roleList.page = response.pageNo
        this.roleList.size = response.pageSize
        this.pageTotal = response.totalCount
        this.listLoading = false
      })
    },
    // 分页部分内容
    handleRoleSize(size) {
      this.roleList.size = size
      this.getList()
    },
    handleRoleCurrent(currentPage) {
      this.roleList.page = currentPage
      this.getList()
    },
    // 添加管理员
    toAdd() {
      const that = this
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      getPermission(datap).then(resp => {
        const arr = resp.dataList
        arr.map((item, index) => {
          if (item.meta.title === '添加用户角色') {
            return that.$router.push({ path: item.path })
          } else {
            return false
          }
        })
      })
    },
    // 编辑-根据手机号userName
    toEdit(val) {
      const that = this
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      toDetail(val).then(response => {
        getPermission(datap).then(resp => {
          const arr = resp.dataList
          arr.map((item, index) => {
            if (item.meta.title === '编辑用户角色') {
              // 编辑完整数据赋值
              localStorage.setItem('roleEditForm', JSON.stringify(response.info))
              return that.$router.push({ path: item.path })
            } else {
              return false
            }
          })
        })
      })
    },
    // 获取下拉框角色名
    changeRole(val) {
      this.options1.map((item, index) => {
        if (val === item.value) {
          this.roleList.roleName = item.label
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
        width: 50%;
        .el-input__inner{
          padding: 0 5px!important;
        }
      }
      .el-date-editor--date{
        width: 43%!important;
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

