<template>
    <div class="search">
        <input type="text" v-model="name" @keyup.enter="add">
       
       <button @click="fu">1231</button>
    </div>
</template>
<script>
    import {nanoid} from 'nanoid'
    export default {
        data(){
            return {
                name:""
            }
        },
        methods:{
            add(){
                const nameObj = {id:nanoid(),name:this.name,done:false}
                console.log(nameObj);
                this.$store.dispatch('add',nameObj)
                console.log(this.$store);
                this.name = ''
            },
            fu(){
                this.$bus.$emit('faze',this.name)
            }
        },
    }
</script>