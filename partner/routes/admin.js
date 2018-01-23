const router = require('koa-router')()

let AdminUsers = require('../models/AdminUsers');
let Users = require('../models/Users');
let mongodb = require('mongodb');

router.prefix('/admin');

router.get('/login', async (ctx, next) => {
  await ctx.render('admin/login', {
    title: "管理员"
  })
});

router.post('/login', async (ctx, next) => {
 		let email = ctx.request.body['email'];
		let pwd = ctx.request.body['pwd'];
		// console.log(email,pwd);
		let rs = await AdminUsers.findOne({pwd:pwd,email:email});
		// console.log(rs);
		if(rs!=null){
			let user = {
				id:rs['_id'],
				nicheng:rs.nicheng,
				role:100
			}
			ctx.session.loginbean = user;
			console.log(ctx.session.loginbean);
			ctx.body = '登陆成功';
			ctx.redirect('./identity');
		}else{	
			ctx.body = '帐号不存在';
		}
});

router.get('/identity', async (ctx, next) => {
  	let loginbean = ctx.session.loginbean;

  	if(loginbean.role==100){
  		let page = 1;
  		let pageShow = 3;
  		if(ctx.query['page']){
  			page = parseInt(ctx.query['page']);
  		}
  		if(page<0){
  			page = 1;
  		}
  		
  		let point = (page-1)*pageShow;
  		let count = await Users.count({role:1});
  		let pagesum = Math.ceil(count/pageShow);
  		if(pagesum>0&&page>pagesum){
  			page = pagesum;
  		}
  		//skip从什么地方开始查 limit查几条数据
  		let rs = await Users.find({role:1}).skip(point).limit(pageShow);

  		await ctx.render('admin/identity', {rs:rs,count:count,pagesum:pagesum,page:page});
  	}else{
  		ctx.body = '<script>alert("session过期，请重新登录");location.href="./login";</script>'
  	}
});

router.get('/identityInfo', async (ctx, next) => {
  	let loginbean = ctx.session.loginbean;
  	let id = ctx.query['id'];
  	console.log(loginbean);
  	console.log(id);
  	let _id = mongodb.ObjectID.createFromHexString((id).toString());
  	console.log(_id);
  	let rs = await Users.findOne({_id:_id});
  	console.log(rs);
  	if(loginbean.role == 100){
  		 await ctx.render('admin/identity_info', {rs:rs});
  	}else{
  		ctx.body = '<script>alert("session过期，请重新登录");location.href="./login";</script>'
  	}
});

router.get('/reviewPass', async (ctx, next) => {
  	let loginbean = ctx.session.loginbean;
  	let id = ctx.query['id'];
  	let _id = mongodb.ObjectID.createFromHexString((id).toString());
  	if(loginbean.role == 100){
  		await Users.update({_id:_id},{$set:{role:2,msg:"您的身份认证已经通过"}});
  		ctx.body = 0;
  	}else{
  		ctx.body = '您不是管理员';
  	}
});

router.get('/reviewRefuse', async (ctx, next) => {
  	let loginbean = ctx.session.loginbean;
  	if(loginbean.role == 100){
  		let id = ctx.query['id'];
  		await ctx.render('admin/reviewRefuse',{id:id});
  	}else{
  		ctx.body = '您不是管理员';
  	}
});

router.post('/reviewRefuse', async (ctx, next) => {
  	let loginbean = ctx.session.loginbean;
  	if(loginbean.role == 100){
  		let id = ctx.request.body['id'];
  		let msg = ctx.request.body['msg'];
  		let _id = mongodb.ObjectID.createFromHexString((id).toString());
  		await Users.update({_id:_id},{$set:{role:0,msg:'您的身份被驳回：'+msg}});
  		ctx.redirect('./identity');
  	}else{
  		ctx.body = '您不是管理员';
  	}
});


module.exports = router
