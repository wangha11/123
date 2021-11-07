<template>
    <div>
        <div id="main">
            <el-input v-model="title" placeholder="标题" ></el-input>
            <el-input v-model="orderby" placeholder="排序权重"></el-input>
            <mavon-editor v-model="md_text" @change="change" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"/>
             <el-button type="primary" round @click="subSection">提交{{chapter_id}}</el-button>
        </div>
    </div>
</template>
<script>
import request from '../api//request'
export default {
    name: 'DSectiondetail',

    data() {
        return {
            title:'',
            orderby:'',
            md_text:'',
            html_text:''
        };
    },
    methods: {
        subSection(){
            if(this.id){
                request.put(`/section/${this.id}`,{
                        title:this.title,
                        orderby:this.orderby,
                        md_text:this.md_text,
                        html_text:this.html_text,
                        chapter_id:this.chapter_id
                }).then(()=>{
                    console.log(this.chapter_id);
                    this.$router.push(`/section?chapter_id=${this.chapter_id}`)
                })
            }else{
                request.post('/section',{
                        title:this.title,
                        orderby:this.orderby,
                        md_text:this.md_text,
                        html_text:this.html_text,
                        chapter_id:this.chapter_id
                }).then(()=>{
                    this.$router.push(`/section?chapter_id=${this.chapter_id}`)
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
        $imgDel(){}
    },
    computed: {
        chapter_id(){
            return this.$route.query.chapter_id
        },
        id(){
            return this.$route.params.id;
        }
    },
    created(){
        if(this.id){
            request.get(`/section/${this.id}`).then((res)=>{
                // console.log(res);
                this.title = res.data.data.title,
                this.orderby = res.data.data.orderby,
                this.md_text = res.data.data.md_text, 
                this.html_text = res.data.data.html_text
            })
        }
    }
};
</script>
<style  scoped>

</style>