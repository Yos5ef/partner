<template>
	<div>
	 	<tr>
	 		<td>
	 			<el-form label-position="right" label-width="80px"  name="loginForm">
				  <el-form-item label='帐号'>
				    <el-input name="zhanghao"></el-input>
				  </el-form-item>
				  <el-form-item label="密码">
				    <el-input name="pwd"></el-input>
				  </el-form-item>
				   <el-form-item label="邮箱">
				    <el-input name="email"></el-input>
				  </el-form-item>
				  <el-button type="primary" @click="login">立即登录</el-button>
			</el-form>
	 		</td>
	 		<td>
	 			<el-form label-position="right" label-width="80px"  name="zhuceForm">
			  <el-form-item label='帐号'>
			    <el-input name="zhanghao"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input name="pwd"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码">
			    <el-input name="repwd"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱">
			    <el-input name="email"></el-input>
			  </el-form-item>
			  <el-form-item label="昵称">
			    <el-input name="nicheng"></el-input>
			  </el-form-item>
			  <el-button type="primary" @click="register">立即创建</el-button>
			</el-form>		
	 		</td>
	 	</tr>
	</div>
</template>
<script>
import axios from 'axios';
var thisa = null;
export default{
	data(){
		thisa = this;
		return{

		}
	},
	methods:{
		login:function(){
			thisa.$parent.$parent.login(loginForm);
		},
		register:function(){
	     		// alert($(zhuceForm).serialize());
	     	if(zhuceForm.email.value==''){
	     		alert('邮箱不能为空');
	     		return;
	     	}else if(zhuceForm.nicheng.value==''){
	     		alert('昵称不得为空');
	     		return;
	     	}else if(zhuceForm.pwd.value == ''){
	     		alert('密码不得为空');
	     		return;
	     	}

	     	thisa.$parent.$parent.register(zhuceForm);
     	}
	}
}
</script>