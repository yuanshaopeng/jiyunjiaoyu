<template>
	<div class="tjsj">
		<!--推荐商家-->
		<div class="tjsj_title">推荐商家</div>
		<div v-scroll="bs" class="tjsj_btnGroup">
			<button>综合排序</button>
			<button>距离最近</button>
			<button>品质联盟</button>
			<button>筛选</button>
		</div>
		<div class="tjsj_bs" ref="tjsj_bs">
			<ul>
				<li v-for="(item,index) in shopList">
					<router-link :to="'/shop/'+item._id"><shop-item :shopopt="item"></shop-item></router-link>
				</li>
				<li v-show="bol">
					<div class="tjsj_loading">
						<p><span class="el-icon-loading"></span>
							<span>正在加载</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BScroll from "better-scroll";
	import shopItem from "@/components/public/shopItem";
	export default {
		name:"tjsj",
		data(){
			return {
				bs:null,
				shopList:[],
				bol:false
			}
		},
		watch:{
			shopList(nval,oval){
				this.$nextTick(()=>{
					this.bs.finishPullUp();//告知betterscroll本次上啦加载已完成
					this.bs.refresh();//当dom发生改变后  需要重新计算Better scroll的滚动距离
				})
			}
		},
		methods:{
			_getShop(res){
				for(var i = 0 ; i < 5 ; i++){
					this.shopList.push(res.data.data[0])
					this.shopList.push(res.data.data[1])
				}
				this.bol = false;
			}
		},
		directives:{
			scroll:{
				update(el,option){
					console.log(option);
					let rem = document.documentElement.style.fontSize.split("px")[0]*1;
					window.onscroll = function(){
//						console.log();/
						let st = document.documentElement.scrollTop||document.body.scrollTop;
						if(document.documentElement.scrollTop/rem>=10.56){
							option.value.enable();
						}
					}
				}
			}
		},
		components:{
			shopItem,
		},
		mounted(){
			console.log("runing")
			this.$nextTick(()=>{
				let bsEle = this.$refs.tjsj_bs;
				this.bs = new BScroll(bsEle,{
					click:true,
					tap:true,
					enabled:false,
					bounce:{top:false,bottom:true},//设置回弹
					pullUpLoad: {//开启上拉加载手势
					  threshold:0 //设定距离底部多少像素检测上拉加载动作
					}
				})
				this.bs.disable();
				var that = this;
				//pullingUp监听用户的上拉加载动作
				this.bs.on("pullingUp",function(){
					that.bol = true;
					if(that.shopList.length <50){
						that.$api.getShop().then(that._getShop);
					}else{
						alert("到底了")
					}
				})
				this.bs.on("scroll",function(ev){
					if(ev.y>=0){
						that.bs.disable();
					}
				})
			})
			this.$api.getShop().then(this._getShop);
		}
	}
	
</script>
<style type="text/css">
	.tjsj_title{
		color: black;
		text-align: center;
		width: 100%;
		line-height: 36px;
		font-size: 16px;
	}
	.tjsj_title:after{
		content:"——";
		color:#ccc;
		padding-left: 10px;
	}
	.tjsj_title:before{
		content:"——";
		color:#ccc;
		padding-right: 10px;
	}
	.tjsj_btnGroup{
		display: flex;
		width: 100%;
		position: sticky;
		top: 1rem;
		z-index: 2;
	}
	.tjsj_btnGroup button{
		width:25%;
		height: 40px;
		border: none;
		background: white;
		color: #CCCCCC;
		outline: none;
	}
	.tjsj_bs{
		height: 10.54rem;
		width: 100%;
		overflow: hidden;
		padding-bottom: 50px;
	}
	.tjsj_bs ul{
		padding-bottom: 50px;
	}
	.tjsj_loading{
		/*height: 0.8rem;*/
		text-align: center;
		color: black;
		font-size: 14px;
		padding: 0.2rem;	
		
	}
	.tjsj_loading p{
		line-height: 20px;
	}
	.tjsj_loading span:nth-of-type(1){
		font-size: 20px;
		margin-right: 10px;
	}
	.tjsj_loading span:nth-of-type(2){
		font-size: 14px;
		margin-right: 10px;
	}
</style>