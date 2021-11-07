'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    //网页
    router.get("/", controller.home.index); 
    router.get("/blog", controller.blog.getBlogList);
    router.get('/blog/:id', controller.blog.getBlogDetail);
    router.get('/res', controller.home.res); 
    router.get('/book', controller.book.getBookList); 
    router.get('/book/:id', controller.book.toFirstSection); 
    router.get('/section/:id', controller.section.getSectionDetail); 
    // //后台功能接口
    router.post('/api/login', controller.admin.login); //登录
    router.get('/admin', controller.admin.index); //后台登录
     router.resources( '/api/book', app.middleware.checktoken(),controller.book) //书籍的管理 
     router.resources( '/api/chapter', app.middleware.checktoken(),controller.chapter) //章的管理 
     router.resources( '/api/section', app.middleware.checktoken(),controller.section) //节的管理
     router.resources( '/api/user', app.middleware.checktoken(), controller.user) //用户的管理
     router.resources( '/api/blog' , app.middleware.checktoken(),controller.blog) //博客管理 
      router.post('/api/upload', controller.upload.index) //添加内容的图片

};