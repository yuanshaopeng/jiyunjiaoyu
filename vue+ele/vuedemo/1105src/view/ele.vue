<template>
	<div class="ele">
		<!-- 
			element-ui  pc
			mint-ui   移动端
			iview    移动端
			vux   做微信端开发
		-->
		<h2>layout栅格系统布局</h2>
			<!--  vue ie9+  -->
		<!-- gutter 调整列与列之间的左右padding
			 type  选择布局模式   flex
			 justify   flex下  水平布局方式    
			 align     垂直布局方式
		-->
		<!--
			offset  影响整列布局
			push pull只对当前列有影响
			xs  <=768
			sm  <=992
			md  <=1200
			lg  <=1920
			xl  >1920
		-->
		<el-row :gutter="num" type="flex" tag="ul" >
			<el-col tag="li" :offset="2" :span="4">1</el-col>
			<el-col tag="li" :span="4">2</el-col>
			<el-col tag="li" :span="4">3</el-col>
			<el-col tag="li" :span="4">4</el-col>
			<el-col tag="li" :span="4">5</el-col>
			<el-col tag="li" :span="4">6</el-col>
		</el-row>
		<el-row :gutter="num" tag="ul">
			<el-col tag="li" v-for="item in 24" :key="item" :span="1">{{item}}</el-col>
		</el-row>
		<el-row :gutter="num" tag="ul">
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">1</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">2</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">3</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">4</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">5</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">6</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">7</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">8</el-col>
			<el-col tag="li" :xs="12" :sm="8" :md="4" :lg="2" :xl="1">9</el-col>
		</el-row>
		
		<h2>下拉框</h2>
		{{value}}
		<el-select v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		</el-select>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"ele",
		data(){
			return {
				num:0,
				value:"",
				options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }]
			}
		}
	}
</script>
<style type="text/css">
	*{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li{
		border: 1px solid black;
		box-sizing: border-box;
		text-align: center;
	}
</style>