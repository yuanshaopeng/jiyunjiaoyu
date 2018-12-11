<template>
	<div ref="goodsComp" class="goodsComp">
		<div class="menu" ref="menu">
			<ul class="w15">
				<li @click="scrollTo(heightArr[index])" :class="heightIndex==index?'active typeItem':'typeItem'" v-for="(item,index) in $store.state.typeList">
					<p class="middle_p">{{item.goodsTypeName}} {{item.count}}</p>
					<span class="middle_span"></span>
				</li>
			</ul>
			
		</div>
		<div class="goods" v-scroll="goodsBs" ref="goods">
			<ul>
				<li class="goodsWrap" v-for="(item,index) in $store.state.typeList">
					<h2 class="type_title" ref="type_title">{{item.goodsTypeName}}</h2>
					<ul>
						<li class="goodsItem" v-for="(value,key) in $store.state.goodsList[index]">
							<img :src="value.goodsLogo" alt="" />
							<h3>{{value.goodsName}}</h3>
							<h4>${{value.goodsPrice}}</h4>
							<el-button v-show="value.count" type="default" @click="cut({index,key,typeId:value.typeId,goodsId:value._id,shopId:value.shopId})" size="mini" round>-</el-button>
							<span v-show="value.count">{{value.count}}</span>
							<el-button type="primary" @click="add({index,key,typeId:value.typeId,goodsId:value._id,shopId:value.shopId})" size="mini" round>+</el-button>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BScroll from "better-scroll";
	import { mapMutations,mapActions } from "vuex";
	export default {
		name:"shopGoods",
		data(){
			return {
				menuBs:null,
				goodsBs:null,
				heightArr:[],
				heightIndex:0,//默认第一个为高亮效果
			}
		},
		methods:{
			...mapMutations(["_carList","_zj_txt","_cutGoodsCount","_addGoodsCount","_addTypeList","_cutTypeList"]),
			...mapActions(["addCar","getCar"]),
			scrollTo(value){
				this.goodsBs.scrollTo(0,-value*1,100)
			},
			cut(obj){
				this._cutGoodsCount({
					index:obj.index,
					key:obj.key
				})
				this._cutTypeList({
					typeId:obj.typeId
				})
				this.addCar({
					token_id:this.$cookie.getCookie("token_id"),
					userId:this.$cookie.getCookie("user_id"),
					shopId:obj.shopId,
					typeId:obj.typeId,
					goodsId:obj.goodsId,
					count:this.$store.state.goodsList[obj.index][obj.key].count
				}).then(res=>{
					console.log(res);
					this.getCar(obj.shopId).then(carRes=>{
						this._carList(carRes.data.data.result);
						this._zj_txt({
							zj:carRes.data.data.sum,
							txt:carRes.data.data.txt
						})
					});
				})
			},
			add(obj){
				this._addGoodsCount({
					index:obj.index,
					key:obj.key
				})
				this._addTypeList({
					typeId:obj.typeId
				})
				this.addCar({
					token_id:this.$cookie.getCookie("token_id"),
					userId:this.$cookie.getCookie("user_id"),
					shopId:obj.shopId,
					typeId:obj.typeId,
					goodsId:obj.goodsId,
					count:this.$store.state.goodsList[obj.index][obj.key].count
				}).then(res=>{
					console.log(res);
					this.getCar(obj.shopId).then(carRes=>{
						this._carList(carRes.data.data.result);
						this._zj_txt({
							zj:carRes.data.data.sum,
							txt:carRes.data.data.txt
						})
					});
				})
			}
		},
		directives:{
			scroll:{
				update(el,option){
					console.log(option);
					var that = this;
					let rem = document.documentElement.style.fontSize.split("px")[0]*1;
					window.onscroll = function(){
//						console.log();/
						let st = document.documentElement.scrollTop||document.body.scrollTop;
						if(document.documentElement.scrollTop>=98){
							option.value.enable();
						}
					}
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				//菜单部分
				this.menuBs = new BScroll(this.$refs.menu,{
					click:true,
					tap:true,
					enabled:false,
					bounce:false
				})
				this.goodsBs = new BScroll(this.$refs.goods,{
					click:true,
					tap:true,
					bounce:false,
					probeType:3,//实时监听滚动且监听滚过过后的动画
				})
				var that = this;
				this.goodsBs.on("scroll",function(ev){
					let rem = document.documentElement.style.fontSize.split("px")[0]*1
					let h = that.$refs.goodsComp.offsetTop-rem*1;
					window.scrollTo(0,h)
					let sh = Math.abs(ev.y);
					that.heightArr = that.$refs.type_title.map(item=>{
						return item.offsetTop;
					})
					if(ev.y>=0){
						if(that.goodsBs.directionY<0){
							that.goodsBs.disable();
						}else{
							that.goodsBs.enable()
						}
					}
					for(var i = 0 ; i < that.heightArr.length ; i++){
						if(that.heightArr[i]<=sh){
							that.heightIndex = i;
						}else{
							break;
						}
					}
				})
			})
		},
		
	}
</script>
<style type="text/css">
	.goodsComp .active{
		background: red;
	}
	.goodsComp{
		display: flex;
		height: 11.34rem;
		overflow: hidden;
	}
	.w160{
		width: 1.6rem;
	}
	.typeItem{
		width: 1.12rem;
		height: 1.08rem;
		padding: 0.24rem;
		vertical-align: middle;
		border: 1px solid black;
		text-align: center;
	}
	.middle_p{
		display: inline-block;
		vertical-align: middle;
		/*text-overflow: clip;*/
		word-break: break-all;
	}
	.middle_span{
		display: inline-block;
		vertical-align: middle;
		height: 100%;
	}
	.goods{
		flex: 1;
	}
	.goods img{
		width: 2rem;
		height: 2rem;
	}
	.type_title{
		line-height: 0.8rem;
		text-indent: 0.72rem;
		background: #CCCCCC;
	}
	.goodsItem{
		padding: 0.72rem;
	}
</style>