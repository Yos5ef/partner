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
  		  		<el-table
			      :data="tableData"
			      style="width: 100%;text-align:left">
			      <el-table-column
			        prop="adate"
			        label="日期"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="atitle"
			        label="姓名"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="address"
			        label="地址">
			      </el-table-column>
			       <el-table-column
			        prop="type"
			        label="类型">
			      </el-table-column>
			       <el-table-column
				      fixed="right"
				      label="操作"
				      width="100">
				      <template slot-scope="scope">
				        <el-button @click="Unpublish(scope.row)" type="text" size="small">取消发布</el-button>
				      </template>
				    </el-table-column>
			    </el-table>
  		  	</el-col>
	  	</el-row>
	</div>
</template>
<script type="text/javascript">
	import Header from '../common/Head';
	import LeftMenu from '../common/LeftMenu';
	import {getHttp} from '../../js/HttpServer';
	let thisa = this;
	export default{
		data(){
			thisa = this;
			return{
				tableData:[]
			}
		},
		mounted(){
			getHttp('/restful/activity/mypubmate',function(res){

				thisa.tableData = res.data;
			});
		},
		components:{
			'homehead':Header,
			'leftmenu':LeftMenu
		},
		methods:{
			Unpublish:function(row){
				alert(row.uid);
			}
		}
	}
</script>