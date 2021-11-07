module.exports = () => {
    return async function (ctx, next) {
        try{
            // 中间件验证token思路  通过ctx可以获取到请求头的token 来判断 
            //有token的话就去校验解密token 并存储到cookies中 继续访问
            if (ctx.request.header.token) {
                let token = ctx.request.header.token;
                //解密token 验证token 
                ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
                ctx.cookies.set('token', token, {
                    maxAge: 10 * 1000,
                    httpOnly: false,
                    overwrite: true,
                    signed: false
                });
                await next();
            } else {
                ctx.body = {
                    code:5,
                    message: '没有token'
                }
            }
        }catch(err){
            ctx.body = {
                code:4,
                message: 'token错误'
            }
        }
        
    }
};