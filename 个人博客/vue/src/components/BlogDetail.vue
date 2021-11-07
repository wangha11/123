<template>
    <div>
        <div id="main">
            上传封面
            <el-upload
                :action="action()"
                list-type="picture-card"
                :file-list="fileList"
                :on-success="handlesuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
             </el-upload>
            <el-input v-model="title" placeholder="标题" ></el-input>
            <mavon-editor v-model="md_text" @change="change" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"/>
             <el-button type="primary" round @click="subBlog">提交</el-button>
        </div>
    </div>
</template>
<script>
import request from '../api//request'
export default {
    name: 'DBlogdetail',

    data() {
        return {
            title:'',
            img:'',
            md_text:'',
            html_text:'',
            fileList:[]
        };
    },
    methods: {
        subBlog(){
            if(this.id){
                request.put(`/blog/${this.id}`,{
                        title:this.title,
                        img:this.img,
                        md_text:this.md_text,
                        html_text:this.html_text,
                }).then(()=>{
                    this.$router.push(`/blog`)
                })
            }else{
                request.post('/blog',{
                        title:this.title,
                        img:this.img,
                        md_text:this.md_text,
                        html_text:this.html_text,
                }).then(()=>{
                    this.$router.push(`/blog`)
                })
            }
        },
        
        change(md_text,html_text){
            this.html_text = html_text
        },
        //上传图片
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           request({
               url: process.env.VUE_APP_UPLOAD_API,
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               let img = url.data.data.file;
               this.$refs.md.$img2Url(img);
           })
        },
        $imgDel(){},
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
    computed: {
        id(){
            return this.$route.params.id;
        }
    },
    created(){
        if(this.id){
            request.get(`/blog/${this.id}`).then((res)=>{
                this.title = res.data.data.title,
                this.img = res.data.data.img,
                this.md_text = res.data.data.md_text, 
                this.html_text = res.data.data.html_text,
                this.fileList= [{url:this.img}]
            })
        }
    }
};
</script>
<style  scoped>

</style>