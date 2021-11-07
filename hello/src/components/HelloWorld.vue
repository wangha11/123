<template>
    <div>
	<h1>{{mess}}</h1>
        <ul>
            <li v-for="stundtv  in stundtList" :key="stundtv.id" >
				<input type="checkbox" :checked="stundtv.done" />
	<input type="text" ref="db" :value="stundtv.name" v-if="stundtv.isEnt" @blur="stundPut(stundtv,$event)"/>
				<span v-else @click="dblclick(stundtv)">{{stundtv.name}}</span>		
				<button type="button" @click="del(stundtv.id)" >删除</button>
			</li>
        </ul>
        
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    methods:{
		del(id){
			console.log(id);
			this.$store.dispatch('del',id)
		}, //双击编辑
		dblclick(stundtv){
			stundtv.isEnt = true
		},//编辑回车
		stundPut(stu,e){
			const st =  e.target.value
			stu.name = st
			stu.isEnt = false
		}
    },
    computed:{
        ...mapState(['stundtList']),
    },
	data(){
		return {
			isent:false,
		}
	},
	props:{
		mess:String
	}
}
</script>

<style scoped>
	button {
		display: none;
	}
	li{
		margin: 20px;
	}
	li:hover button {
		display: inline-block;
	}
</style>
