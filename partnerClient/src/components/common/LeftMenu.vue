<template>
	 <table width="100%" height="100%" >
		  	 	<tr>
		  	 		<td>
		  	 			<router-link to="/privateHome" v-if="">	
					  		<el-button type="text">	
		  	 					身份认证
		  	 				</el-button>
		  	 			</router-link>
		  	 		</td>
		  	 	</tr>
		  	 	<tr >
		  	 		<td>
		  	 			<router-link to="/findMate" v-if="role==2">	
					  		<el-button type="text">	
		  	 					发起结伴
		  	 				</el-button>
		  	 			</router-link>
		  	 		</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>
		  	 			<router-link to="/mypubmate">
					  		<el-button type="text">	
		  	 					我发起的结伴
		  	 				</el-button>
		  	 			</router-link>
		  	 		</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>
		  	 			<router-link to="/wantJoin">
					  		<el-button type="text">	
		  	 					我想参加结伴
		  	 				</el-button>
		  	 			</router-link>
		  	 		</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>我的结伴历史</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>诚信积分</td>
		  	 	</tr>
		  	 	<tr>
		  	 		<td>投诉</td>
		  	 	</tr>
		  	 </table>
</template>	
<script type="text/javascript">
	export default{
		data(){
			return{
				role:0
			}
		}
	}
</script>