'use strict';

const Service = require('egg').Service;

class BookService extends Service {

    async updateBook(id,body){
        try{
            const book = {
                title : body.title,
                orderby : body.orderby,
                img :body.img
            };
            await this.ctx.model.Book.update(book,{
                where:{id:id}
            })
            return true
        }catch(e){
            return null
        }
    }
    async destroyBook(id){
        try{
            await this.ctx.model.Book.destroy({
                where:{id:id}
            })
            return true 
        }catch(e){
            return null
        }
    }
    async createBook(body){
        try{
            const book = {
                title :body.title,
                orderby : body.orderby,
                img : body.img
            }
            await this.ctx.model.Book.create(book)
            return true
        }catch(e){
            return false
        }
    }

    async getBookList(query){
        try{
            const total = parseInt(query.total);
            const data = await this.ctx.model.Book.findAll({
                limit:[total],
                'order':[
                    ['orderby']
                ]
            })
            return data 
        }catch(e){
            return null
        }
    }
    async getSectionBookID(id){
            console.log(id);
            //先获取到book的id 然后查询这个book——id下的数据 然后获取chapter的第一个的id
            // chapter_id查询 section表 返回这个表第一个的id 也就是第一小节数据
            const Chapters = await this.ctx.model.Chapter.findAll({
                where:{book_id:id},
                'order':[
                    ['orderby']
                ]
            })
            console.log(Chapters);
            let chapterid = Chapters[0].dataValues.id;
            console.log(chapterid);
            const Sections = await this.ctx.model.Section.findAll({
                where:{chapter_id:chapterid},
                'order':[
                    ['orderby']
                ]
            }) 
            console.log(Sections);
            return Sections[0].dataValues.id;
    }

    async getbooktitle(id){
        const section = await this.ctx.model.Section.findOne({
            where:{id},
            include:{
                model:this.ctx.model.Chapter,
                as : "chapter",
                include:{
                  model:this.ctx.model.Book,
                  as : "book",
                  
              }
            }
          })
      let book = section.dataValues.chapter.dataValues.book;
     return book
    }
}

module.exports = BookService;