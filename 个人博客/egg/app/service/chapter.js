'use strict';

const Service = require('egg').Service;

class ChapterService extends Service {
    async indexChapter(book_id){
        try{
            
            const data = await this.ctx.model.Chapter.findAll({
                where:{book_id}
            })
            return data 
        }catch(e){
            return null
        }
    }

    async updateChapter(id,body){
        try{
            const Chapter = {
                title : body.title,
                orderby : body.orderby,
                book_id :body.book_id
            };
            await this.ctx.model.Chapter.update(Chapter,{
                where:{id:id}
            })
            return true
        }catch(e){
            return null
        }
    }
    async destroyChapter(id){
        try{
            await this.ctx.model.Chapter.destroy({
                where:{id:id}
            })
            return true 
        }catch(e){
            return null
        }
    }
    async createChapter(body){
        try{
            const Chapter = {
                title :body.title,
                orderby : body.orderby,
                book_id :body.book_id
            }
            await this.ctx.model.Chapter.create(Chapter)
            return true
        }catch(e){
            return false
        }
    }
}

module.exports = ChapterService;