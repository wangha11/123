<template>
    <div class="layout">
            <div class="menu">
                <el-row class="tac " >
                    <el-col>
                        <h4>博客内容管理系统</h4>
                        <el-menu          
                       
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose" router>
                        <el-menu-item index="/book">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="/blog" >
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="/resource">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-submenu index="1">
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                            </template>
                            <el-menu-item index="/user">用户列表</el-menu-item>
                            <el-menu-item @click="logout" >注销</el-menu-item>
                        </el-submenu>
                        </el-menu>
                    </el-col>        
               </el-row>
            </div>
            <div class="zi">
                <router-view></router-view>
            </div>
    </div>
</template>
<script>
export default {
    name: 'DLayout',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        logout(){
            localStorage.setItem("token","");
            location.reload();
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>
<style >
    .layout {
       display: flex;
    }
    .menu {
        min-width:200px;
    }
    .zi {
        width:100%;
    }
</style>    