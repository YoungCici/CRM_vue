<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- <breadcrumb></breadcrumb> -->
    <div style="display:inline-block;position:absolute;width:calc(100% - 340px);text-align:center;font-size:24px;font-weight:bold;">医护之家CRM管理系统</div>
    <el-dropdown class="avatar-container" trigger="click" style="width:300px;border-left:1px solid #eee;">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="(avatar === null || avatar === '') ? avatars : avatar">
        <span style="max-width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:inline-block;position:relative;margin-top:0;margin-left:0;">{{ nickName }}</span>
        <span style="position:absolute;right:0px;vertical-align:middle">{{ roleName }}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出系统</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data() {
    return {
      avatars: require('../../../assets/code.png')
    }
  },
  components: {
    // Breadcrumb,
    Hamburger
  },
  // created() {
  //   this.$nextTick(function() {
  //     this.toggleSideBar()
  //     this.$store.dispatch('OpenSideBar')
  //   })
  // },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'nickName',
      'roleName'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
        // this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 56px;
  line-height: 56px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 56px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 56px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-left: 5px;
        margin-top: -49px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

