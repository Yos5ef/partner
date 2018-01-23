<template>
	<div>
		<homehead ref='homehead'/>
		<div style="height:40px"></div>
		<el-row :gutter="20">
		  <el-col :span="3">&nbsp;</el-col>
		  <el-col :span="3">
		  	 <leftmenu ref="leftmenu"/>
  		  </el-col>
  		  <el-col :span="12">
  		  	<el-form ref="form" :model="form" label-width="80px" v-if="mapFlag==0" name="form">
			  <el-form-item label="活动名称" >
			    <el-input v-model="form.name" name="atitle"></el-input>
			  </el-form-item>
			  <el-form-item label="活动地点" >
			    <el-input v-model="form.region" name="address"></el-input>
			    <el-button @click="markToMap()">地图</el-button>
			    <span></span>
			  </el-form-item>
			  <el-form-item label="活动时间">
			    <el-col :span="11">
			      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" name="adate"></el-date-picker>
			    </el-col>
			    <el-col class="line" :span="2">-</el-col>
			    <el-col :span="11">
			      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;" name="atime"></el-time-picker>
			    </el-col>
			  </el-form-item>
			  <el-form-item label="活动人数">
			    <el-input v-model="form.peoples" name="limitnum"></el-input>
			  </el-form-item>
			   <el-form-item label="活动费用">
			    <el-input v-model="form.cost" name="price"></el-input>
			  </el-form-item>
			  <el-form-item label="活动类型">
			    <el-checkbox-group v-model="form.type">
			      <el-checkbox label="健身" name="type"></el-checkbox>
			      <el-checkbox label="户外" name="type"></el-checkbox>
			      <el-checkbox label="娱乐" name="type"></el-checkbox>
			      <el-checkbox label="益智" name="type"></el-checkbox>
			      <el-checkbox label="其他" name="type"></el-checkbox>
			    </el-checkbox-group>
			  </el-form-item>
			  <el-form-item label="参与要求">
			    <el-input v-model="form.claim"></el-input>
			  </el-form-item>
			  <el-form-item label="活动备注" name="otherinof">
			    <el-input type="textarea" v-model="form.desc"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<input type="hidden" name="lat" :value="lnglat.lat">
			  	<input type="hidden" name="lng" :value="lnglat.lng">
			    <el-button type="primary" @click="onSubmit">立即创建</el-button>
			    <el-button>取消</el-button>
			  </el-form-item>
			  
			</el-form>
			<div>
		  		<mapgaode v-if="mapFlag==1" ref="mapgaode" v-on:mapLoad="mapLoad"/>
		  		<el-button @click="back()">返回</el-button>
		  	  </div> 
		  </el-col>
		  
		  
		  <el-col :span="3">
		  	
	
  		  </el-col>
	  </el-row>
	</div>
</template>
<script type="text/javascript">
	import Header from '../common/Head';
	import LeftMenu from '../common/LeftMenu';
	import Mapgaode from '../common/Map.vue';
	import {getHttp,postHttp} from '../../js/HttpServer';
	let thisa = null;
	export default{	
		data(){
			thisa = this;
			return{
				role:0,
				form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: '',
		          peoples: '',
		          cost:'',
		          claim:''
		        },
		       mapFlag:0,
		       marker:null,
		       lnglat:{lng:'未定',lat:"未定"}   


			}
		},
		components:{
			'homehead':Header,
			'leftmenu':LeftMenu,
			'mapgaode':Mapgaode
		},
		methods:{
			onSubmit() {
		    	postHttp('/restful/activity/pubact',form,function(res){
		    			alert(res.data);
		    			//thisa.$router.push('/mypubmate');
		    		
		    	})
		    },
		    loginbeanChange:function(loginbean){
		    	thisa.role = loginbean.role;
				thisa.msg = loginbean.msg;
				thisa.$refs.leftmenu = thisa.role;
		    },
		    markToMap:function(){
		    	thisa.mapFlag=1;
		    },
		    back:function(){
		    	thisa.mapFlag=0;
		    },
		    eventHandler:function(e){ 
				thisa.lnglat = e.lnglat;
				let map = thisa.$refs.mapgaode.map;
				if(thisa.marker==null){
						thisa.marker = new AMap.Marker({                 
						  map:map,                 
						  position:thisa.lnglat,  
						  title:"商店",
						  icon:"http://webapi.amap.com/images/0.png",
						  offset:new AMap.Pixel(-10,-34),
					   })
						thisa.marker.setLabel({
							offset:new AMap.Pixel(-18,-21),
							content:'活动位置',
						})
							// thisa.marker.setMap(map);
				}else{
					thisa.marker.setPosition(thisa.lnglat);
				}
				
			},
			mapLoad:function(map){
				var listener = AMap.event.addListener(map,"click",thisa.eventHandler);
			}

		},
		mounted(){

			


		}
	}
</script>
<style type="text/css">
	#app{
		margin-top:30px;
	}
</style>