<template>
	<div class="home">
		<!--主路由组件-->
		<router-link to="/admin">商品后台管理系统</router-link>
		<router-link to="/car">购物车</router-link>
		<ul>
			<li v-for="item in arr">
				<h2>{{item.goods_name}}</h2>
				<h3>{{item.goods_price}}</h3>
				<button>
					<router-link :to="'/option/'+item._id">查看详情</router-link>
				</button>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"home",
		data(){
			return {
				arr:[]
			}
		},
		methods:{
			_get(res){
				console.log(res);
				this.arr = res.data.data;
			}
		},
		mounted(){
			this.$api.get().then(this._get)
		}
	}
</script>