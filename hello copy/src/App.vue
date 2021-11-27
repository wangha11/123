<template>
  <div id="app">
    <h1>{{firstName}}</h1>
      <Slolet>
           <template slot-scope="a">
            {{a}}
           </template>
      </Slolet>
  </div>
</template>

<script>
import Slolet from "./components/Slolet.vue"

 export default {
   name:"App",
   components: {
      Slolet
    },
    data(){
      return {
        user:{
          firstName:"小明"
        }
      }
    },
    mounted() {
      console.log(this);
    },
    
 }
</script>

<style >

      
</style>