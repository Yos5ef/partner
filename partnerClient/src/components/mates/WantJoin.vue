<template>
	<div>
		<homehead/>
		<el-row>
			<el-col :span="3">
				&nbsp;
  		  	</el-col>
			<el-col :span="3">
				<leftmenu/>
  		  	</el-col>
  		  	<el-col :span="15">
  		  		<div v-if="flag==0">
  		  			<el-form :model="form" label-width="80px">
	  		  		 <el-form-item label="显示模式">
					    <el-radio-group v-model="form.displayMode">
					      <el-radio label="地图"></el-radio>
					      <el-radio label="列表"></el-radio>
					    </el-radio-group>
					</el-form-item>
				</el-form>
				<mapgaode />
  		  		</div>
  		  		
  		  	</el-col>
	  	</el-row>
	</div>
</template>
<script type="text/javascript">
	import Header from '../common/Head';
	import LeftMenu from '../common/LeftMenu';
	import {getHttp} from '../../js/HttpServer';
	import Mapgaode from '../common/Map.vue';
	let thisa = this;
	export default{
		data(){
			thisa = this;
			return{
				form:{
					displayMode:'地图'
					
				},
				mateid:0,
				flag:0,
			}
		},
		mounted(){
			
		},
		components:{
			'homehead':Header,
			'leftmenu':LeftMenu,
			'mapgaode':Mapgaode
		},
		methods:{
			loginbeanChange:function(loginbean){
				thisa.role=loginbean.role;
				thisa.$refs.leftmenu.role = thisa.role;
			},
			geoComplete:function(map,position){
		        let url = '/restful/activity/getMates?lng='+position.getLng()+'&lat='+position.getLat();
		          getHttp(url,function(res){
		            let arr = res.data;
		            let len = arr.length;
		            for(let i=0;i<len;i++){
		                let marker = new AMap.Marker({                 
		                  map:map,                 
		                  position:new AMap.LngLat(arr[i].lng,arr[i].lat), 
		                  icon:"http://webapi.amap.com/images/0.png",
		                  // icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
		                 })
		                 marker.setLabel({  
		                          offset: new AMap.Pixel(-18, -21),  
		                          content: arr[i].atitle
		                 });
		                 marker.id=arr[i]['_id'];
		                 // marker.on('click', thisa.markerClick(arr[i]['_id']));
		                 AMap.event.addListener(marker,'click',thisa.markerClick);
		            }
		          });
		    },
		    markerClick:function(e){
		    	//alert(e.target.id);
		    	thisa.mateid=e.target.id;
		    	thisa.flag=1;
		    	//服务端取活动信息
		    	
		    	
		    },

		}
	}
</script>