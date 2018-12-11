<template>
	<div>
		<div id="wrap" ref="bs">
			<div id="content">
				<ul>
					<li v-for="item in num">{{item}}</li>
				</ul>
				<p v-show="bol" class="el-icon-loading"></p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BScroll from "better-scroll";
	export default {
		name:"bs",
		data(){
			return {
				num:10,
				bs:null,
				bol:false
			}
		},
		watch:{
			num(){
				this.$nextTick(()=>{
					this.bol = false;
					this.bs.finishPullUp()
					this.bs.refresh()
				})
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.bs = new BScroll(this.$refs.bs,{
					pullUpLoad: {
					  threshold: 50
					}
				})
				let that = this;
				this.bs.on("pullingUp",function(ev){
					that.bol = true;
					//异步请求
					setTimeout(()=>{
						that.num+=10;
					},1000)
				})
			})
		}
	}
</script>
<style type="text/css">
	*{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	#wrap{
		height: 500px;
		overflow: hidden;
	}
	li{
		line-height: 80px;
		font-size: 50px;
		color: white;
		text-align: center;
	}
	li:nth-of-type(odd){
		background: red;
	}
	li:nth-of-type(even){
		background: green;
	}
	p{
		height: 80px;
		width: 100%;
		text-align: center;
		font-size: 80px;
		/*background: black;*/
	}
</style>