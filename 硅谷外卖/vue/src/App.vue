<template>
  <div id="app">
    <router-view/>  
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import Footer from "./components/footer"
  import {mapActions} from 'vuex'
 export default {
   components: {
      Footer 
    },
    methods: {
      ...mapActions(['getAddress','getUserInfo'])
    },
    mounted(){
      this.getAddress()
      this.getUserInfo()
    }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
      
</style>