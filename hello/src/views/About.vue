<template>
  <div class="about">
    <h1 @click="news">去news</h1>
    <!-- <router-link :to="{name:'News'}">about</router-link> -->
    <router-view/>
  </div>
</template>
<script>
  export default {
    methods:{
      news(){
        this.$router.push({name:'News',params:{id:1}})
      }
    }
  }
</script>