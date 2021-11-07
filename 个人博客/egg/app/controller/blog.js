'use strict';

const Controller = require('egg').Controller;
class BlogController extends Controller {
    async index(){
     try{
        const query = this.ctx.request.query;
        const data = await this.ctx.service.blog.indexBlog(query);
        this.ctx.body = {
            code : 20000,
            message : true,
            data : data
        }
     }catch(e){
        this.ctx.body = {
            code : 5,
            message : false
        }
     }
    }

    async create(){
        try{
            const body = this.ctx.request.body;
            await this.ctx.service.blog.createBlog(body);
            this.ctx.body = {
                code : 2,
                message : true
            }
         }catch(e){
            this.ctx.body = {
                code : 5,
                message : false
            }
         }
    }

    async destroy(){
        try{
            const id = this.ctx.params.id;
            await this.ctx.service.blog.destroyBlog(id);
            this.ctx.body= {
                code : 2,
                message : true
            }
         }catch(e){
            this.ctx.body = {
                code : 5,
                message : false
            }
         }
    }

    async update(){
        try{
            const id =this.ctx.params.id;
            const body = this.ctx.request.body;
            await this.ctx.service.blog.updateBlog(id,body);
            this.ctx.body = {
                code : 2,
                message : true
            }
         }catch(e){
            this.ctx.body= {
                code : 5,
                message : false
            }
         }
    }

    async show(){
        try{
            const id =this.ctx.params.id;
            const data = await this.ctx.service.blog.showBlog(id);
            this.ctx.body = {
                code : 20000,
                message : true,
                data : data
            }
         }catch(e){
            this.ctx.body = {
                code : 5,
                message : false
            }
         }
    }
    async getBlogList(){
        let data = await this.ctx.service.website.getBlogindex();
        await this.ctx.render('pc/blog.html',data)
    }

    async getBlogDetail(){
        const id = this.ctx.params.id;
        let data = await this.ctx.service.website.getBlogDetail(id);
        await this.ctx.render('pc/blog_detail.html',data)
    }
}

module.exports = BlogController;