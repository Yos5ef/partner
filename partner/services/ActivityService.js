let Activity = require('../models/Activity');
let mongodb = require('mongodb');
class ActivityService {
	async pubact(ctx){
		let loginbean = ctx.session.loginbean;
		console.log('loginbean:',loginbean);
		if(!loginbean){
			ctx.body = '登录过期，请从新登陆';
		}
		if(loginbean.role==2){
			let form = ctx.request.body;
			form['uid'] = mongodb.ObjectID.createFromHexString((loginbean.id).toString());
			form['nicheng'] = loginbean.nicheng;
			form['creditnum'] = loginbean.creditnum;
			let date = form['adate']+" "+form['atime'];
			date = Date.parse(date.replace(/-/g,   "/"));
			date = new Date(date);
			date = date.getTime();
			form['adate'] = date; 
			let activity = new Activity(form);
			let rs = await activity.save();
		  	console.log(rs);
		  	ctx.body = '插入成功';
		}
	}
	async mypubmate(ctx){
		let loginbean = ctx.session.loginbean;
		if(!loginbean){
			ctx.body = '登录过期，请从新登陆';
		}
		if(loginbean.role == 2){
			let uid = mongodb.ObjectID.createFromHexString((loginbean.id).toString());
			let rs = await Activity.find({uid:uid});
			ctx.body = rs;
		}else{
			ctx.body = '您无权限，请审核后发布';
		}
	}
	async getMates(ctx){
		let lng = ctx.query['lng'];
        let lat = ctx.query['lat'];
        let lngLeft = lng-0.06;
        let lngRight = lng+0.06;
        let latTop = lat+0.03;
        let latBottom = lat-0.03;
        //获取当前一天的时间戳
        let date = new Date();
        date.setDate(date.getDate()-1);
        let datetime = date.getTime();
        let rs = await Activity.find({"lng":{$lt:lngRight},"lng":{$gt:lngLeft},"lat":{$lt:latTop},"lat":{$gt:latBottom},"adate":{$gt:datetime}});
        console.log(rs);
        ctx.body=rs;

	}
}

exports.service = ActivityService;