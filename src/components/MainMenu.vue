<template>
  <b-menu>
    <b-menu-list label="菜单">
      <b-menu-item
        icon-pack="fa"
        @click="goTo('/')"
        :active="index==0"
        icon="home"
        label="首页"
      ></b-menu-item>
      <b-menu-item
        icon-pack="fa"
        :active="index==1"
       @click="goTo('/clockin')"
        icon="clock-o"
        label="打卡"
      ></b-menu-item>
            <b-menu-item
        icon-pack="fa"
        :active="index==9"
       @click="goTo('/settings')"
        icon="sliders"
        label="设置"
      ></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Actions">
      <b-menu-item label="Logout"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  props: {
    index: 0
  },
  methods:{
      goTo(path){
          this.$router.push(path).catch(err => {})
      }
  }
};
</script>

<style>
</style>