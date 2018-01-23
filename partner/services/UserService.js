let Users = require('../models/Users');
class UserService {
	async login(ctx){
		// delete ctx.request.body['yzm'];
		let email = ctx.request.body['email'];
		let pwd = ctx.request.body['pwd'];
		// console.log(email,pwd);
		let rs = await Users.findOne({pwd:pwd,email:email});
		// console.log(rs);
		if(rs!=null){
			let user = {
				id:rs['_id'],
				nicheng:rs.nicheng,
				role:rs['role'],
				creditnum:rs['creditnum'],
				msg:rs['msg'],
			}
			ctx.session.loginbean = user;
			console.log(ctx.session.loginbean);
			ctx.body = user;
		}else{	
			ctx.body = '帐号不存在';
		}
		
	}
	async register(ctx){

		  delete ctx.request.body['repwd'];
		  ctx.request.body['createtime'] = new Date();
		  ctx.request.body['msg'] = '您还没有身份认证,不能发起结伴,请认证后发起';
		  let users = new Users(ctx.request.body);
		  try{
		  	let rs = await users.save();
		  	 console.log(rs);
		  	 ctx.body = '插入成功';
		  }catch(err){
		  	console.log(err);
		  	let msg = err.toString();
		  	if(msg.indexOf('emailuiq')>0){
		  		console.log('123',ctx);
		  		 ctx.body = '邮箱已注册';
		  	}else if(msg.indexOf('nichenguiq')){
		  		 ctx.body = '昵称重复';
		  	}else{
		  		 ctx.body = '数据库异常，稍后再试';
		  	}

		  }
	}
	async getSession(ctx){
		ctx.body = ctx.session.loginbean;
	}
	async logout(ctx){
		console.log('123321123321');
		delete ctx.session.loginbean;
		ctx.body = 1;
	}
}

exports.service = UserService;