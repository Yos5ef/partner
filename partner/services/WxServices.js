// let crypto = require('crypto');

// class WxService{
// 	constructor(){
//     }

//     async wxTransponder(ctx){
//     	if(!ctx.query['echostr']){
//     		await this.responseMag(ctx);//用户发来消息从此入口
//     	}else{
//     		await this.wxlogin(ctx);//认证
//     	}
//     }
//     async wxlogin(ctx){
//         if(ctx.query['echostr']){
//             let echostr = ctx.query["echostr"];
//             let signature = ctx.query["signature"];
//             let timestamp = ctx.query["timestamp"];
//             let nonce = ctx.query["nonce"];

//             let token = 'Yossef'; //令牌名
//             /*  加密/校验流程如下： */
//             //1. 将token、timestamp、nonce三个参数进行字典序排序
//             let array = new Array(token,timestamp,nonce);
//             array.sort();
//             let str = array.toString().replace(/,/g,"");
//             //2. 将三个参数字符串拼接成一个字符串进行sha1加密
//             let sha1Code = crypto.createHash("sha1");
//             let code = sha1Code.update(str,'utf-8').digest("hex");
//             //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
//                 if(code===signature){
//                         ctx.body=echostr;      //登陆成功
//                 }else{
//                         ctx.body="error";
//                 }
//         }else{
//         	console.log(123);
//             ctx.body='你无权限';
//         }
//     }
//     async responseMsg(ctx){
//     	if(ctx.query['echostr']){
//     		let echostr = ctx.request.body["echostr"];
//     		if(){
    			
//     		}
//     	}
//     }
// }

// exports.service = WxService;
