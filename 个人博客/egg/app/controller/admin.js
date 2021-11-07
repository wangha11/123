'use strict';

const Controller = require('egg').Controller;

class WanghaController extends Controller {
   

    async login() {
        try{
            const body = this.ctx.request.body;
            const token =  await this.ctx.service.user.loginUser(body);
            if(token){
                this.ctx.body = {
                    code:2,
                    message:true,
                    token:token
                }
            }else{
                this.ctx.body = {
                    code:4,
                    message:false
                }
            }
        }catch(e){
            this.ctx.body = {
                code:5,
                message:false
            }
        }
    }

    async index(){
        await this.ctx.render("admin/index.html")
        
    }
}

module.exports = WanghaController;