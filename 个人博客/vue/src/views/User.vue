<template>
    <div>
        <el-button type="text" @click="postUser">添加</el-button>
         <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="id"
            label="序号"
           >
            </el-table-column>
            <el-table-column
            prop="username"
            label="书名"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="putUser(scope.row.id,scope.row.username)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small"  @click="open(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog username="添加" :visible.sync="dialogVisible"  width="30%" >            
              <el-form ref="form" >
                <el-form-item label="用户名">
                    <el-input v-model="username" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Userremove">取 消</el-button>
                <el-button type="primary" @click="submUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import request from '../api//request'
  export default {
    methods: {
        submUser(){
            if(this.submit){
                console.log(this.id);
                request.put(`/user/${this.id}`,{username:this.username,password:this.password}).then(()=>{
                    this.getUser()  
                    this.dialogVisible = false
                    this.Userremove()  

                })
            }else{
                request.post('/user',{username:this.username,password:this.password}).then(()=>{
                    this.getUser()
                    this.dialogVisible = false
                    this.Userremove()              
                })
            }
            
        },
        postUser(){
            this.disabled = false,
            this.dialogVisible = true
        },
        Userremove(){
            this.dialogVisible = false
            this.id = '',
            this.username = '',
            this.password =''
        },
        putUser(id,username,password){
            this.id = id,
            this.username = username,
            this.password = password,
            console.log(password);
            this.submit = true;
            this.dialogVisible = true;
            this.disabled = true
        },
        open(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                request.delete(`/user/${id}`).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getUser();
                })        
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getUser(){
            request.get('/user').then((res)=>{
                this.tableData = res.data.data;
             })
        },
        handleClick(row) {
            console.log(row);
        },
        //上传图片
        action(){
            return process.env.VUE_APP_UPLOAD_API;
        },
        handlesuccess(response, file, fileList){
            this.img = response.data.file;
            console.log(response.data.file);
            console.log(file);
            console.log(fileList);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.img  = file.url;
            this.dialogVisible = true;
        }
    },

    data() {
      return {
        tableData: [],
        dialogVisible:false,
        username:'',
        password:'',
        id:'',
        submit:false,
        disabled:false
      }
    },
    created(){
        this.getUser();
    }
  }
</script>
<style  scoped>
    img {
        width:50px;
        height:50px;
    }
</style>