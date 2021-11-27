'use strict';

const Service = require('egg').Service;
class websiteService extends Service {
    async getHomeindex(){
        let bookList = await this.ctx.service.book.getBookList({total:3});
        let blogList = await this.ctx.service.blog.indexBlog({total:3});
        let title = "首页"
        return {
            bookList,
            blogList,
            title
        }
    }
    async getBookindex(){
        let bookList = await this.ctx.service.book.getBookList({total:1});
        let bookaccList = await this.ctx.service.book.getBookList({total:100});
        let blogList = await this.ctx.service.blog.indexBlog({total:3});
        let title = "学习手册"
        return {
            bookList,
            bookaccList,
            blogList,
            title
        }
    }
    async toFirstSection (id){
        //所有书的数据
        let bookList = await this.ctx.service.book.getBookList({total:100});
        //当前节关联书的数据
        let booktitle = await this.ctx.service.book.getbooktitle(id);
        //当前节的数据
        let bookaccList = await this.ctx.service.section.showSection(id);
        //当前章的数据
        let chapterList = await this.ctx.service.section.indexChapter(id);
        let title = bookaccList.title
        return {
            bookList,
            booktitle,
            bookaccList,
            chapterList,
            title
        }
    }

    async getBlogindex(){
        let bookList = await this.ctx.service.book.getBookList({total:3});
        let blogList = await this.ctx.service.blog.indexBlog({total:1});
        let BlogaccList = await this.ctx.service.blog.indexBlog({total:100,page:1});
        let title = "个人博客"
        return {
            bookList,
            blogList,
            BlogaccList,
            title
        }
    }

    async getBlogDetail(id){
        let bookList = await this.ctx.service.book.getBookList({total:3});
        let blogList = await this.ctx.service.blog.indexBlog({total:1});
        let BlogaccList = await this.ctx.service.blog.showBlog(id);
        let title = BlogaccList.title
        return {
            bookList,
            blogList,
            BlogaccList,
            title
        }
    }
}

module.exports = websiteService;