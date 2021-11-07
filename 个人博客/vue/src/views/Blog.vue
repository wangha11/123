<template>
    <div>
        <el-button type="text" @click="postBlog">添加章</el-button>
         <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="id"
            label="序号">
            </el-table-column>
             <el-table-column
            prop="img"
            label="封面"
            >
                <template  slot-scope="scope">
                    <img :src="scope.row.img">
                </template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="书名">
            </el-table-column>               
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="putBlog(scope.row.id)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small"  @click="open(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagina"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="[5, 10, 20, 40]" 
                 :page-size="pagesize"       
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="tableData.length">    
             </el-pagination>
    </div>
</template>
<script>
import request from '../api//request'
  export default {
    methods: {
        
        postBlog(){
            this.$router.push(`/createBlog`)
        },
        Blogremove(){
            this.id = '',
            this.title = '',
            this.orderby ='',
            this.dialogVisible = false
        },
        putBlog(id){
            this.$router.push(`/blog/${id}`)
        },
        open(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                request.delete(`/blog/${id}`).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getBlog();
                })        
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getBlog(){
            request.get(`/blog?total=10`).then((res)=>{
                this.tableData = res.data.data;
             })
        },
        handleClick(row) {
            console.log(row);
        },
        //分页功能
         // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        }
    },

    data() {
      return {
        tableData: [],
        dialogVisible:false,
        title:'',
        orderby:'',
        id:'',
        submit:false,
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
      }
    },
    created(){
        this.getBlog();
    }
  }
</script>
<style  scoped>
    img {
        width:50px;
        height:50px;
    }
    .pagina {
        display:flex;
        justify-content: center;
    }
</style>