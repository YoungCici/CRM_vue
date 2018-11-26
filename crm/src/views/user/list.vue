<template>
  <div class="app-container">
    <div class="order-content">
        <el-row class="el-row-table">
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            部门:
            <el-cascader
                :options="options"
                filterable
                change-on-select>
            </el-cascader>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            小组:
            <el-cascader
                :options="options"
                filterable
                change-on-select>
            </el-cascader>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3">
            销售ID:
            <el-input></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3">
            用户ID:
            <el-input></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3">
            用户昵称:
            <el-input></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3">
            手机号:
            <el-input></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3">
            用户角色:
            <el-cascader
                :options="options"
                filterable
                change-on-select>
            </el-cascader>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="2">
            状态:
            <el-cascader
                :options="options"
                filterable
                change-on-select>
            </el-cascader>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" style="text-align:right">
            <el-button type="primary">搜索</el-button>
            <el-button type="success">导出</el-button>
        </el-col>
    </el-row>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='部门' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="小组">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="销售" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户昵称" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="角色" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label='用户标记' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="QQ号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='性别' width="95" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="邀请好友">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <router-link :to='{path: "/user/list/edit"}' replace>
            <el-button type="primary">编辑</el-button>
          </router-link>
          <el-button type="warning" @click="openDetail">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="el-row-page">
        <el-col>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      list_: {
        deptId: 'string',
        groupId: 'string',
        nickName: 'string',
        page: 0,
        phone: 'string',
        roleId: 'string',
        sellId: 'string',
        size: 0,
        status: 'string',
        userName: 'string'
      },
      /* eslint-disable */
      // 日期选择部分
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
          }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      // 下拉选择框，可输入
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
        }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      currentPage1: 5,
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    // 分页部分
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
    },
    // 查看详情
    openDetail() {
      const h = this.$createElement;
      this.$msgbox({
        title: '用户详情',
        center: true,
        message: h('div', [
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '部门'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '小组'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '销售'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '昵称'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '角色'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '分班批次'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '分班班级'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '手机号'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;min-height: 35px; line-height: 35px;' }, '收货地址'),
                h('span', { style: 'float: left;width: 70%;min-height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, 'QQ号'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '微信号'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ]),
              h('div', { style: 'text-align: center;margin-bottom: 10px;' }, [
                h('span', { style: 'float: left;width: 20%;height: 35px; line-height: 35px;' }, '状态'),
                h('span', { style: 'float: left;width: 70%;height: 35px; line-height: 35px;border: 1px solid #eee;padding-left: 5px;border-radius: 3px;text-align: left;' }, '文字内容'),
                h('span',{ style: 'display: block;content: "";clear: both;' })
              ])
          ])
      });
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
                width: 63%;
                .el-input__inner{
                    padding: 0 5px!important;
                }
            }
            .el-cascader{
                width: 60%;
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
