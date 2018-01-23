<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="3">&nbsp;</el-col>
		  <el-col :span="18">
		  	<table width='100%' class="grid-content bg-purple">
		  		<tr valign="bottom" >
		  			<td width="135">
					  	<img src='../../assets/images/logo.png' width="50" height="20" />
					  	伙伴
					</td>
					<td align="center" width="660">
		  	<el-input placeholder="请输入搜索词"  class="input-with-select">
		    	<el-button slot="append" icon="el-icon-search"></el-button>
		  	</el-input>
		  			</td>
		  			<td align="right">
		  				<el-button type="text" @click="dialogVisible = true"  v-if="loginbean==null">
		  					<el-button type="primary" round>登陆/注册</el-button>
		  				</el-button>
		  				 <div v-if="loginbean!=null">
		  				 	你好,{{loginbean.nicheng}}&nbsp;
		  				 	<tr>
		  				 		<td>
		  				 			
		  				 		</td>
		  				 		<td>
		  				 			<router-link to="/">	
					  				 	<el-button type="text">	
					  				 		
					  				 	首页
					  				 	</el-button>
				  				 	</router-link>
		  				 		</td>
		  				 		<td>
		  				 			<router-link to="/privateHome">	
					  				 	<el-button type="text">	
					  				 		
					  				 	个人空间
					  				 	</el-button>
				  				 	</router-link>
		  				 		</td>
		  				 		<td>
		  				 			<el-button type="text" @click='logout'>注销</el-button>
		  				 		</td>
		  				 	</tr>
		  				 	
		  				 	
		  				 	
		  				 </div>
		  			</td>
		  		</tr>
		  	</table>
		  	</el-col>
		  	<el-col :span="3">&nbsp;</el-col>
	  </el-row>
	  <el-dialog
		  title="登陆/注册"
		  :visible.sync="dialogVisible"
		  width="50%"
		   >
		 
		  	  <!-- 注册 -->
		  	 <login/>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
	   </el-dialog>
	</div>
</template>
<script type="text/javascript">
	import {getHttp,postHttp} from '../../js/HttpServer'
	import Login from '../user/Login.vue';
	let thisa = null;
	export default{
		data () {
  			thisa = this;
    
   //------------------	
		    return {
		    	dialogVisible: false,
		    	loginbean:null
		    };
		},
		mounted(){
			getHttp('/restful/user/getSession',function(res){
				if(res.data){	
					thisa.loginbean = res.data;
					console.log(thisa.loginbean);
					thisa.$emit('loginbeanChange',res.data);
				}else{
					thisa.$router.push('/');
				}
			});
		},
		components:{
			'login':Login,
		},
		methods:{
			login:function(form){
	     		// alert($(zhuceForm).serialize());
	     		postHttp('/restful/user/login',form,function(res){
	     			if(res.data!=null&&res.data!=''){
			    		// alert(res.data);
			    		if(res.data!='帐号不存在'){
			    			// thisa.$router.push('/privateHome');
			    			
			    			thisa.loginbean = res.data;

			    			thisa.dialogVisible = false;
			    			thisa.$router.push('/privateHome');
			    			
			    		}
			    		
			    	}
	     		})
			   
	     	},
     
	     	register:function(form){
	     		// alert($(zhuceForm).serialize());
	     		postHttp('/restful/user/register',form,function(res){
	     			console.log(res);
			        alert(res.data);
	     		})
			    
	     	},
			popLogin:function(){
				thisa.dialogVisible = true;
			},
			logout:function(){
	     		getHttp('/restful/user/logout',function(res){
	     			thisa.loginbean = null;
	     			alert(res.data);
	     			thisa.$router.push('/');
	     		})
     		}
		}
	}
</script>