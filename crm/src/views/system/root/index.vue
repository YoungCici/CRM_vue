<template>
  <div class="app-container">
    <div class="root content">
      <el-row class="el-row-table">
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
        <el-col :xs="20" :sm="20" :md="20" :lg="20" style="text-align:right">
            <el-button type="primary" @click="getResult" v-show="showSearch">搜索</el-button>
            <el-button type="success" @click="toAdd" v-show="showAdd">添加角色</el-button>
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
        <el-table-column label="角色名" align="center">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            {{scope.row.status === 1 ? '启用中' : '暂停中'}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加人">
          <template slot-scope="scope">
            {{scope.row.createBy}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="date">
          <template slot-scope="scope">
            {{scope.row.updateTime | formdate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="toEdit(scope.row.id)" v-show="editShow">编辑</el-button>
            <!-- <el-button type="warning" @click="openDetail(scope.$index, scope.row)">编辑邮寄信息</el-button> -->
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
import { getRoot, getRoleName } from '@/api/root'
import { toAdd } from '@/api/sales'
import { timestampToDate } from '@/common/dateFormat'
import { getPermission } from '@/api/login'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
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
      showRole: false,
      showSearch: false,
      showAdd: false,
      // 表格数据-显示隐藏
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
      if (that.$store.getters.roleName === '超级管理员') {
        that.showRole = true
        that.showSearch = true
        that.showAdd = true
        that.editShow = true
      }
      that.getList()
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
    },
    // 表头设置
    tableRowClassName({ row, rowIndex }) {
      // console.log(row,rowIndex)
    },
    getList() {
      const that = this
      that.listLoading = true
      const para = {
        page: that.currentPage,
        size: that.pageSize,
        roleName: that.roleList.roleName
      }
      getRoot(para).then(response => {
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
      getRoot(data).then(response => {
        this.list = response.dataList
        this.roleList.page = response.pageNo
        this.roleList.size = response.pageSize
        this.pageTotal = response.totalCount
        this.listLoading = false
      })
    },
    // 分页部分
    handleRoleSize(size) {
      this.pageSize = size
      this.getList()
    },
    handleRoleCurrent(currentPage) {
      this.currentPage = currentPage
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
          if (item.meta.title === '添加角色') {
            return that.$router.push({ path: item.path })
          } else {
            return false
          }
        })
      })
    },
    // 编辑
    toEdit(val) {
      const that = this
      const datap = {
        roleId: this.$store.getters.roleId,
        type: 2
      }
      getRoleName(val).then(response => {
        localStorage.setItem('rootRoleName', JSON.stringify(response.info.name))
        localStorage.setItem('rootRoleId', JSON.stringify(response.info.id))
        localStorage.setItem('rootStatus', JSON.stringify(response.info.status))
        getPermission(datap).then(resp => {
          const arr = resp.dataList
          arr.map((item, index) => {
            if (item.meta.title === '编辑角色') {
              // 编辑完整数据赋值
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

