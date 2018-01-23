<template>
	<div>
		<homehead ref='homehead' v-on:loginbeanChange="loginbeanChange"/>
		<el-row :gutter="20">
		  <el-col :span="3">&nbsp;</el-col>
		  <el-col :span="3">
		  	 <leftmenu ref="leftmenu"/>
  		  </el-col>
  		  <el-col :span="12">

  		  		<div>
  		  			<center>{{msg}}</center>
  		  			<authenticate v-if='role==0'/>
  		  		</div>

		  </el-col>
		 
	  </el-row>
	</div>
</template>
<script type="text/javascript">
	import Header from '../common/Head';
	import Authenticate from './Authenticate';
	import LeftMenu from '../common/LeftMenu';
	let thisa = null;
	export default{	
		data(){
			thisa = this;
			return{
				role:0,
				msg:''
			}
		},
		components:{
			'homehead':Header,
			'authenticate':Authenticate,
			'leftmenu':LeftMenu,
		},
		methods:{
			loginbeanChange:function(loginbean){
				if(loginbean!=null){
						alert(loginbean);
						thisa.role = loginbean.role;
						thisa.msg = loginbean.msg;
						thisa.$refs.leftmenu.role = thisa.role;
				}
			}
		},
		mounted(){
			console.log('refs:',thisa.$refs);
		}
	}
</script>