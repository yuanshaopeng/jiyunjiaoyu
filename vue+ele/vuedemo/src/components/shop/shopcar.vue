<template>
	<div class="shopcar">
		购物车
		{{sum}}
		{{this.$store.state.zj}}
		<button @click="fn">{{this.$store.state.btnTxt}}</button>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters} from "vuex";
	export default {
		name:"shopCar",
		methods:{
			fn(){
				alert(1);
				//路由跳转
				this.$router.push({
					path:"/makeSureOrder"
				})
			}
		},
		computed:{
			...mapGetters(["sum"])
		}
	}
</script>
<style type="text/css">
	.shopcar{
		height: 1rem;
	}
</style>