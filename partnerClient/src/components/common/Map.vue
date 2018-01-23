<template>
	<div id="amap-cointainer">
    </div>
</template>
<script type="text/javascript">
	
	let thisa ;
	export default{
		data(){
			thisa = this;
			return{
				map:null,
			}
		},
		mounted() {
	    // lazyAMapApiLoaderInstance.load().then(() => {
	      thisa.map = new AMap.Map('amap-cointainer', {resizeEnable:true});
	      // thisa.Amap = Amap;

	      thisa.map.plugin('AMap.Geolocation', function() {
	      	let geolocation = new AMap.Geolocation({
	      		enableHighAccuracy: true,
	      		timeout: 10000,
	      		buttonOffset: new AMap.Pixel(10, 20),
	      		zoomToAccuracy: false,
	      		buttonPosition:'RB'
	      	});
	        thisa.map.addControl(geolocation);
	        function onComplete(data) {
	        	// alert('定位成功');
	        	//alert('经度:'+data.position.getLng()+",纬度:"+data.position.getLat());
	        	thisa.$emit('geoComplete',thisa.map,data.position);
	        }
	        function onError(data) {
	        	alert('定位失败');
	        }
	        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
	        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
			geolocation.getCurrentPosition();
	      })
	      thisa.$emit('mapLoad',thisa.map);

	   //    axios.get('/api/restful/user/getSession')
			 //    .then(function(res){
			 //        console.log(res);
			 //        alert(res.data.nicheng);
			 //        if(res.data!=null){
			 //        	thisa.loginbean = res.data;
			        	
			 //        }
			 //    })
			 //    .catch(function(err){
			 //        console.log(err);
		  // })

		    // });
	  	},
	  	methods:{
	  		getMates:function(position){
	  			alert(position.getLat());
	  			
	  		}
	  	}
	}
</script>
<style type="text/css">
	#amap-cointainer {
  	height: 400px;
    }
</style>