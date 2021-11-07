<template>
    <div>
        <el-button type="text" @click="postChapter">添加章</el-button>
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
            prop="title"
            label="书名"
            >
            </el-table-column>
                
            <el-table-column
            fixed="right"
            label="详情">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="section(scope.row.id)">查看节</el-button>
            </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="putChapter(scope.row.id,scope.row.title,scope.row.orderby)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small"  @click="open(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加" :visible.sync="dialogVisible"  width="30%" >                
              <el-form ref="form" >
                <el-form-item label="书名">
                    <el-input v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="权重">
                    <el-input v-model="orderby"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Chapterremove">取 消</el-button>
                <el-button type="primary" @click="submChapter">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import request from '../api//request'
  export default {
    methods: {
        section(id){
            this.$router.push(`/section?chapter_id=${id}`)
        },
        submChapter(){
            if(this.submit){
                console.log(this.id);
                request.put(`/chapter/${this.id}`,{title:this.title,orderby:this.orderby}).then(()=>{
                    this.getChapter()  
                    this.dialogVisible = false
                    this.Chapterremove()  

                })
            }else{
                request.post('/chapter',{book_id:this.book_id,title:this.title,orderby:this.orderby}).then(()=>{
                    this.getChapter()
                    this.dialogVisible = false
                    this.Chapterremove()              
                })
            }
            
        },
        postChapter(){
            this.dialogVisible = true
        },
        Chapterremove(){
            this.id = '',
            this.title = '',
            this.orderby ='',
            this.dialogVisible = false
        },
        putChapter(id,img,title,orderby){
            this.id = id,
            this.title = title,
            this.orderby =orderby,
            this.submit = true;
            this.dialogVisible = true;
        },
        open(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                request.delete(`/chapter/${id}`).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getChapter();
                })        
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getChapter(){
            request.get(`/chapter?book_id=${this.book_id}`).then((res)=>{
                console.log(res);
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
        this.getChapter();
    },
    computed: {
        book_id(){
            return this.$route.query.book_id;
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