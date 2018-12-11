<template>
	<div>
		<router-link to="/">商城</router-link>
		<h2>后台管理系统</h2>
		<input type="text" placeholder="请输入商品名称" v-model="name" /><br />
		<input type="text" placeholder="请输入商品单价" v-model="price" /><br />
		<input type="text" placeholder="请输入商品库存" v-model="count" /><br />
		<input type="text" placeholder="请输入商品产地" v-model="address" /><br />
		<button @click="add">提交</button>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"admin",//组件名称  标识
		data(){
			return {
				name:"",
				price:"",
				count:"",
				address:""
			}
		},
		methods:{
			add(){
				//this.$api 所有请求对象
				this.$api.add({
					goods_name:this.name,
					goods_price:this.price,
					goods_count:this.count,
					goods_address:this.address
				}).then(this._add);
			},
			_add(res){
				console.log(res);
			}
		}
	}
</script>