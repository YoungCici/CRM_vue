<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    init: function() {
      // // 在页面加载时读取localStorage里的状态信息
      // localStorage.getItem('userMsg') && this.$store.replaceState(JSON.parse(localStorage.getItem('userMsg')))
      // // 在页面刷新时将vuex里的信息保存到localStorage里
      // window.addEventListener('beforeunload', () => {
      //   localStorage.setItem('userMsg', JSON.stringify(this.$store.state))
      // })
    }
  }
}
</script>

