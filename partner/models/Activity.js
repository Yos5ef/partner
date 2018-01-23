let mongoose = require('mongoose');

let Activity = mongoose.model('activitys', new mongoose.Schema({
      uid:mongoose.Schema.Types.ObjectId,
      nicheng:String,
      creditnum:Number,
      atitle: String, //活动名称
      type:String,
      adate:Number,           //结伴时间的时间戳
      address: String, //地址
      lat:Number,
      lng:Number,
      price:Number,  //f费用
      limitnum:Number,    //人数限制
      otherinfo:String,
      updtime:{type:Date},
      createtime:{type:Date},
      signnum:{type:Number,default:1}     //报名人数
      },{_id:true}));

module.exports =  Activity;