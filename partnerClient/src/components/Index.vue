<template>

  <div>
  	  <homehead/>
	<el-row :gutter="20">
		  <el-col :span="3">&nbsp;</el-col>
		  <el-col :span="3">
		  	 <table width="100%" height="100%" >
		  	 	<tr>
		  	 		<td>伙伴类别</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>健身</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>户外</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>娱乐</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>益智</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>其他</td>
		  	 	</tr>
		  	 </table>
  		  </el-col>
  		  <el-col :span="12">
  		  		<!-- <div id="amap-cointainer">

  				</div> -->
  				<mapgaode v-on:geoComplete="geoComplete"/>
		  </el-col>
		  <el-col :span="3">
		  	 <table width="100%" height="100%" >
		  	 	<tr>
		  	 		<td>最新推荐</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>健身</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>户外</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>娱乐</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>益智</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>其他</td>
		  	 	</tr>
		  	 </table>
		  </el-col>
	  </el-row>
	  <!--登录弹出kuang-->
	  

  </div>

</template>
<script>
import {getHttp} from '../js/HttpServer'
import axios from 'axios';
import Mapgaode from './common/Map.vue'
import Head from './common/Head.vue';
// import { lazyAMapApiLoaderInstance } from 'vue-amap';
let thisa = null;
export default {


  data () {
  	thisa = this;
    
   //------------------	
    return {
    	
    	
      };
    },
    components:{
    	
    	'homehead':Head,
    	'mapgaode':Mapgaode
    },
    
   methods: {
	geoComplete:function(map,position){
		let url = '/restful/activity/getMates?lng='+position.getLng()+'&lat='+position.getLat();
			getHttp(url,function(res){
 			let arr = res.data;
 			let len = arr.length;
 			for(let i=0;i<len;i++){
 				let marker = new AMap.Marker({                 
				  map:map,                 
				  position:new AMap.LngLat(arr[i].lng,arr[i].lat),  
				  title:"商店",
				  icon:"http://webapi.amap.com/images/0.png",
				  offset:new AMap.Pixel(-10,-34),
			   })
				marker.setLabel({
					offset:new AMap.Pixel(-18,-21),
					content:arr[i].atitle,
				})
 			}
 		})
	},
	markerClick:function(id){
		
	}	
     	
      //-------表单-----------
       
      //-------------------
    }

}
</script>
<style scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #amap-cointainer {
  	height: 400px;
  }
</style>
