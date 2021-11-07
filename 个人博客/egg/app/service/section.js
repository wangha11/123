'use strict';

const Service = require('egg').Service;

class SectionService extends Service {
    async indexSection(chapter_id){
        try{
            const data = await this.ctx.model.Section.findAll({
                where:{chapter_id}
            })
            return data 
        }catch(e){
            return null
        }
    }

    async updateSection(id,body){
        try{
            const Section = {
                title : body.title,
                orderby : body.orderby,
                chapters_id :body.chapters_id,
                md_text : body.md_text,
                html_text:body.html_text
            };
            await this.ctx.model.Section.update(Section,{
                where:{id:id}
            })
            return true
        }catch(e){
            return null
        }
    }
    async destroySection(id){
        try{
            await this.ctx.model.Section.destroy({
                where:{id:id}
            })
            return true 
        }catch(e){
            return null
        }
    }
    async createSection(body){
        try{
            const Section = {
                title :body.title,
                orderby : body.orderby,
                chapter_id :body.chapter_id,
                md_text : body.md_text,
                html_text:body.html_text
            }
            await this.ctx.model.Section.create(Section)
            return true
        }catch(e){
            return false
        }
    }

    async showSection(id){
        try{
            const data = await this.ctx.model.Section.findOne({where:{id}})
            return data 
        }catch(e){
            return null
        }
    }

    async indexChapter(id){
    //    let section =  await this.ctx.model.Section.findAll({where:{id}})
    //    console.log(section);
    //    let chapterid = section[0].dataValues.chapter_id;
    //    let chapter =  await this.ctx.model.Chapter.findAll({where:{id:chapterid}})
    //    console.log(chapter);
    //    let book_id = chapter[0].dataValues.book_id;
    //    let book = await this.ctx.model.Chapter.findAll({where:{book_id}})
    //    console.log(book);
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
        let book_id = section.dataValues.chapter.dataValues.book.dataValues.id;
        const book = await this.ctx.model.Chapter.findAll({where:{book_id}})
        
        for(let item of book){
            // console.log(item)
            let chapter_id = item.dataValues.id;
            const sections = await this.ctx.model.Section.findAll({
                where:{chapter_id}
            })
            item.dataValues.sectionList = sections;
            // console.log(sections);
        }
        // console.log(book);
        return book
    }
}

module.exports = SectionService;