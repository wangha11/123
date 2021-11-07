<template>
    <div class="login">
        <el-form ref="form" class="from">
                <el-form-item label="用户名">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input  v-model="password" show-password></el-input>
                </el-form-item>
                <el-button type="primary" @click="submUser">登录</el-button>
        </el-form>
         
    </div>
</template>
<script>
import request from '../api/request'
export default {
    data() {
      return {
        username:'',
        password:''
      }
    },
    methods:{
        submUser(){
            request.post('/login',{username:this.username,password:this.password}).then((res)=>{
                if(res.data.code == 2){
                    localStorage.setItem('token',res.data.token);
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>
<style  scoped>
    .login {
        display:flex;
        justify-content: center;
        margin-top:200px;
    }
</style>