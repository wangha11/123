'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const {ctx} = this;
        let data = await this.ctx.service.website.getHomeindex();
        await ctx.render('pc/home.html',data)
    }
    async res() {
        const {ctx} = this;
        await ctx.render('pc/res.html')
    }
}

module.exports = HomeController;