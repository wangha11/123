'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
    async indexBlog(query){
        try{
            const total = parseInt(query.total);
            const data = await this.ctx.model.Blog.findAll({
                limit:[total]
            })
            return data 
        }catch(e){
            return null
        }
    }

    async updateBlog(id,body){
        try{
            const Blog = {
                title : body.title,
                img : body.img,
                md_text : body.md_text,
                html_text:body.html_text
            };
            await this.ctx.model.Blog.update(Blog,{
                where:{id:id}
            })
            return true
        }catch(e){
            return null
        }
    }
    async destroyBlog(id){
        try{
            await this.ctx.model.Blog.destroy({
                where:{id:id}
            })
            return true 
        }catch(e){
            return null
        }
    }
    async createBlog(body){
        try{
            const Blog = {
                title :body.title,
                img : body.img,
                md_text : body.md_text,
                html_text:body.html_text
            }
            await this.ctx.model.Blog.create(Blog)
            return true
        }catch(e){
            return false
        }
    }

    async showBlog(id){
        try{
            const data = await this.ctx.model.Blog.findOne({where:{id}})
            return data 
        }catch(e){
            return null
        }
    }
}

module.exports = BlogService;