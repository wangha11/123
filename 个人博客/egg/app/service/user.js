'use strict';

const Service = require('egg').Service;
const  md5 = require('md5-node');
class UserService extends Service {
    async indexUser(){
        try{
            const data = await this.ctx.model.User.findAll()
            return data 
        }catch(e){
            return null
        }
    }

    async updateUser(id,body){
        try{
            const User = {
                username:body.username,
                password:md5(body.password)
            };
            await this.ctx.model.User.update(User,{
                where:{id:id}
            })
            return true
        }catch(e){
            return null
        }
    }
    async destroyUser(id){
        try{
            await this.ctx.model.User.destroy({
                where:{id:id}
            })
            return true 
        }catch(e){
            return null
        }
    }
    async createUser(body){
        try{
            const User = {
                username:body.username,
                password:md5(body.password)
            };
            await this.ctx.model.User.create(User)
            return true
        }catch(e){
            return false
        }
    }
    async loginUser(body){
        try{
            //登录功能思路 获取到登录的账户 然后查找数据库有没有该账号 有的话则获取来 进行判断
            //如果true那么就把账号存储到token中 返回客户端 并存储到浏览器对象中 让每次请求都携带token
            const username = body.username;
            const passwordMD5 =  md5(body.password);
            const usr = await this.ctx.model.User.findOne({where:{username}});
            if(usr){
                const user = usr.dataValues.username;
                const pwd = usr.dataValues.password;
                if(user == username && pwd == passwordMD5){
                   const token = this.app.jwt.sign({username:this.username},this.app.config.jwt.secret)
                    return token
                }else{
                    return false
                }
            }else{         
                return false
            }
        }catch(e){
            return false
        }
    }
}

module.exports = UserService;