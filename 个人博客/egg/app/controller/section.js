'use strict';

const Controller = require('egg').Controller;
class SectionController extends Controller {
    async index(){
     try{
        const chapter_id = this.ctx.request.query.chapter_id;
        const data = await this.ctx.service.section.indexSection(chapter_id);
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
            await this.ctx.service.section.createSection(body);
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
            await this.ctx.service.section.destroySection(id);
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
            await this.ctx.service.section.updateSection(id,body);
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
            const id = this.ctx.params.id;
            const data = await this.ctx.service.section.showSection(id);
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
    async getSectionDetail(){
            const id = this.ctx.params.id;
            let data = await this.ctx.service.website.toFirstSection(id);
            await this.ctx.render('pc/book_section.html',data)

        
    }
}

module.exports = SectionController;