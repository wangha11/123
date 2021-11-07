<template>
    <div>
        <el-button type="text" @click="postBook">添加</el-button>
         <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="id"
            label="序号"
           >
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
            label="书名"
            >
            </el-table-column>
                
            <el-table-column
            fixed="right"
            label="详情">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="chapter(scope.row.id)">查看章</el-button>
            </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="putBook(scope.row.id,scope.row.img,scope.row.title,scope.row.orderby)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small"  @click="open(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加" :visible.sync="dialogVisible"  width="30%" >  
                <span>上传封面：</span>     
                <el-upload
                :action="action()"
                list-type="picture-card"
                :file-list="fileList"
                :on-success="handlesuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
            
              <el-form ref="form" >
                <el-form-item label="书名">
                    <el-input v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="权重">
                    <el-input v-model="orderby"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="Bookremove">取 消</el-button>
                <el-button type="primary" @click="submBook">确 定</el-button>
            </span>
        </el-dialog>
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
        chapter(id){
            this.$router.push(`/chapter?book_id=${id}`)
        },
        submBook(){
            if(this.submit){
                console.log(this.id);
                request.put(`/book/${this.id}`,{title:this.title,orderby:this.orderby,img:this.img}).then(()=>{
                    this.getBook()  
                    this.dialogVisible = false
                    this.Bookremove()  

                })
            }else{
                request.post('/book',{title:this.title,orderby:this.orderby,img:this.img}).then(()=>{
                    this.getBook()
                    this.dialogVisible = false
                    this.Bookremove()              
                })
            }
            
        },
        postBook(){
            this.dialogVisible = true
        },
        Bookremove(){
            this.id = '',
            this.img = '',
            this.title = '',
            this.orderby ='',
            this.fileList= [],
            this.dialogVisible = false
        },
        putBook(id,img,title,orderby){
            this.id = id,
            this.img = img,
            this.title = title,
            this.orderby =orderby,
            this.fileList= [{url:img}]
            this.submit = true;
            this.dialogVisible = true;
        },
        open(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                request.delete(`/book/${id}`).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getBook();
                })        
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getBook(){
            request.get('/book?total=10').then((res)=>{
                this.tableData = res.data.data;
             })
        },
        handleClick(row) {
            console.log(row);
        },
        //上传图片
        action(){
            // return process.env.VUE_APP_UPLOAD_API;
            return '/api/upload';
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
        img:'',
        id:'',
        submit:false,
        fileList:[],
        currentPage:1, //初始页
        pagesize:5,    //    每页的数据
      }
    },
    created(){
        this.getBook();
        console.log(process.env);
        console.log(process.env.VUE_APP_BASE_API);
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