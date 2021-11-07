<template>
    <div>
        <input type="checkbox" @click="chek" ref="che" :checked="checked" />
        <span>已完成{{sum}}/全部{{stundtList.length}}</span>
        <button @click="delet">删除</button>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    methods:{
		delet(){
            this.$store.dispatch('delet')
        },
        chek(){
            const chek =   this.$refs.che.checked;
            this.$store.dispatch('quanxuan',chek)
        }
    },
    computed:{
        ...mapState(['stundtList']),
        checked(){
            return this.stundtList.length?true:false
        },
        sum(){
            // return this.stundtList.reduce((p,t)=>{
            //     p+(t.done?1:0)
            // },0)
            return this.stundtList.forEach(r=>{
                console.log(r);
            })
         }
    },
    mounted(){
        console.log(this.sum);
    }
}
</script>