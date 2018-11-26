<template>
  <div class="menu-wrapper">
    <el-menu>
      <el-menu-item index="0" style="border-bottom:1px solid #eee;">
        <img :src="imgLogo" style="width:100%;height:70%;">
      </el-menu-item>
    </el-menu>
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import imgLogo from '@/assets/logo/logoIndex.png'
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'SidebarItem',
  data() {
    return {
      imgLogo
      // routes: []
    }
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  // created() {
  //   const that = this
  //   that.routes = that.permission_routers
  //   console.log(that.permission_routers, that.$store.getters.permission_routers)
  // },
  // computed: {
  //   ...mapGetters([
  //     'permission_routers'
  //   ]),
  //   routes() {
  //     return this.permission_routers
  //   }
  // },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.menu-wrapper{
  a.router-link-exact-active.router-link-active{
    background: #1da299!important;
    color: #ffffff!important;
  }
  .el-menu.is-active{
      background-color: #1da299!important;
  }
  .el-menu-item.submenu-title-noDropdown.is-active{
      background-color: #1da299!important;
  }
  .el-menu-item{
    text-align: center;
    font-size: 14px;
  }
  .el-submenu{
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .el-submenu__title{
      text-align: center;
      font-size: 14px;
      span{
        font-size: 14px;
      }
    }
  }
}
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title, #app .sidebar-container .el-submenu .el-menu-item{
  background: #fff!important;
  border-bottom: 1px solid #ddd;
}
#app .sidebar-container .el-submenu .el-menu-item.is-active{
  background: #1da299!important;
}
#app .sidebar-container a{
  border-bottom: 1px solid #eee;
}
</style>

