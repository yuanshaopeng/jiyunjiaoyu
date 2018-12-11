<template>
	<div v-if="goodsList.length>0">
		<!--上  店铺信息-->
		<shop-head></shop-head>
		<div ref="shopbtngroup" class="shopBtnGroup">
			<button>商品</button>
			<button>评论</button>
			<button>商家</button>
		</div>
		<!--中  商品  评论  商家（动态组件）-->
		<component :is="chooseComp"></component>
		<!--下  店铺购物车-->
		<shop-car></shop-car>
	</div>
	<div v-else>加载中...</div>
</template>
<script type="text/javascript">
	import {mapState,mapMutations,mapActions} from "vuex";
	import shopHead from "@/components/shop/shopHead";
	import shopGoods from "@/components/shop/shopGoods";
	import shopCar from "@/components/shop/shopcar"
	export default {
		name:"shop",
		data(){
			return {
				chooseComp:"shopGoods"
			}
		},
		computed:{
			...mapState(["shopOpt","goodsList"])
		},
		methods:{
			...mapActions(["getShopMsg"])
		},
		mounted(){
			let shopId = this.$route.params.id;
			this.getShopMsg(shopId);
			
		},
		components:{
			shopHead,
			shopGoods,
			shopCar,
		},
		beforeRouteLeave(to,from,next){
			window.onscroll = null;
			next()
		}
//		directives:{
//			bs:{
//				inserted(el,option){
//					console.log("run",option)
//				}
//			}
//		},
//		watch:{
//			goodsList(nval){
//				if(nval.length >0){
//					console.log("run2",this)
//					this.$nextTick(()=>{
//						console.log(this.$refs)
//					})
//				}
//			}
//		}
	}
</script>
<style type="text/css">
	.shopBtnGroup{
		width: 100%;
		height: 1rem;
		position: sticky;
		top: 0;
		display: flex;
	}
	.shopBtnGroup button{
		flex: 1;
	}
</style>