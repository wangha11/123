
<template>
    <div>
        <p @click="hello">去hello{{id}}</p>
        <router-view/>
    </div>
</template>
<script>
    export default {
        methods:{
            hello(){
                this.$router.push({name:'Hello'})
            }
        },
        props:['id']
    }
</script>