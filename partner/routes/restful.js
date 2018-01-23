const router = require('koa-router')();
let Services = require('../services/services');


router.all('/restful/:name?/:method?',async(ctx,next) => {
	let name = ctx.params.name || 'empty';
	let method = ctx.params.method|| 'empty';
	// ctx.body = name+':'+method;
	console.log('请求的地址',name,method);
	try{
		let service = new Services[name+'Service']();
		await service[method](ctx);
	}catch(err){

		if(err.toString().indexOf('Service')>-1||err.toString().indexOf('service')>-1){
			service = new Services['emptyService'];
			service.empty(ctx);
		}else{
			console.log(err);
			ctx.body = '页面出错了';
		}
		
	}
	
})

module.exports = router