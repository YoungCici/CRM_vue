<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      style="border-right:1px solid #eee;"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      text-color="#000"
      active-text-color="#fff">
      <sidebar-item :routes="permission_routers"></sidebar-item>
      <!-- <sidebar-item></sidebar-item> -->
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
