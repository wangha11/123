<template>
    <div>
        <el-button type="text" @click="postSection">添加章</el-button>
         <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="id"
            label="序号">
            </el-table-column>
            <el-table-column
            prop="title"
            label="书名">
            </el-table-column>               
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="putSection(scope.row.id)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small"  @click="open(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import request from '../api//request'
  export default {
    methods: {
        
        postSection(){
            this.$router.push(`/createSection?chapter_id=${this.chapter_id}`)
        },
        Sectionremove(){
            this.id = '',
            this.title = '',
            this.orderby ='',
            this.dialogVisible = false
        },
        putSection(id){
            this.$router.push(`/section/${id}?chapter_id=${this.chapter_id}`)
        },
        open(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                request.delete(`/section/${id}`).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getSection();
                })        
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getSection(){
            request.get(`/section?chapter_id=${this.chapter_id}`).then((res)=>{
                this.tableData = res.data.data;
             })
        },
        handleClick(row) {
            console.log(row);
        },
    },

    data() {
      return {
        tableData: [],
        dialogVisible:false,
        title:'',
        orderby:'',
        id:'',
        submit:false,
      }
    },
    created(){
        this.getSection();
    },
    computed: {
        chapter_id(){
            return this.$route.query.chapter_id;
        }
    },
  }
</script>
<style  scoped>
    img {
        width:50px;
        height:50px;
    }
</style>