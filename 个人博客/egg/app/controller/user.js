'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
    async index(){
        try{
            const data = await this.ctx.service.user.indexUser();
            this.ctx.body= {
                code:2,
                message:true,
                data:data
            }
        }catch(e){
            this.ctx.body= {
                code:2,
                message:false
            }
        }
    }

    async create(){
        try{
            const body = this.ctx.request.body;
            await this.ctx.service.user.createUser(body);
            this.ctx.body= {
                code:2,
                message:true,
            }
        }catch(e){
            this.ctx.body= {
                code:2,
                message:false
            }
        }
    }

    async destroy(){
        try{
            const id = this.ctx.params.id;
            await this.ctx.service.user.destroyUser(id);
            this.ctx.body= {
                code:2,
                message:true,
            }
        }catch(e){
            this.ctx.body= {
                code:2,
                message:false
            }
        }
    }

    async update(){
        try{
            const id = this.ctx.params.id;
            const body = this.ctx.request.body;
            await this.ctx.service.user.updateUser(id,body);
            this.ctx.body= {
                code:2,
                message:true,
            }
        }catch(e){
            this.ctx.body= {
                code:2,
                message:false
            }
        }
    }  
}

module.exports = UserController;