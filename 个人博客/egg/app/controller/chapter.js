'use strict';

const Controller = require('egg').Controller;
class ChapterController extends Controller {
    async index(){
     try{
        const book_id = this.ctx.request.query.book_id;
        const data = await this.ctx.service.chapter.indexChapter(book_id);
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
            await this.ctx.service.chapter.createChapter(body);
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
            await this.ctx.service.chapter.destroyChapter(id);
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
            await this.ctx.service.chapter.updateChapter(id,body);
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
}

module.exports = ChapterController;