'use strict';

const Controller = require('egg').Controller;
class BookController extends Controller {

    async create(){
        try{
            const body = this.ctx.request.body;
            await this.ctx.service.book.createBook(body);
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
            await this.ctx.service.book.destroyBook(id);
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
            await this.ctx.service.book.updateBook(id,body);
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

    async index(){
        try{
            const query = this.ctx.request.query;
            const data = await this.ctx.service.book.getBookList(query);
            this.ctx.body = {
                code : 2,
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
    async getBookList(){
        let data = await this.ctx.service.website.getBookindex();
        await this.ctx.render('pc/book.html',data)
    }

    async toFirstSection(){
        const id = this.ctx.params.id;
        let section_id = await this.ctx.service.book.getSectionBookID(id);
        await this.ctx.redirect(`/section/${section_id}`)

    }

    
}

module.exports = BookController;