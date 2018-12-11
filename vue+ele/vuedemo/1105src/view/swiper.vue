<template>
	<div>
		<!--框-->
		<div class="swiper-container" ref="swiper" id="swiper1">
			<!--载体-->
			<div class="swiper-wrapper">
				<!--图片-->
			    <div class="swiper-slide">slider1</div>
			    <div class="swiper-slide">slider2</div>
			    <div class="swiper-slide">slider3</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Swiper from "swiper";
	import 'swiper/dist/css/swiper.min.css';
	export default {
		name:"swiper",
		mounted(){
			this.$nextTick(()=>{
				console.log(this.$refs);
				new Swiper(this.$refs.swiper,{
					autoplay:{
						delay:1000
					},
					loop:true
				})
			})
		}
	}
</script>
<style type="text/css">
	.swiper-slide{
		width: 500px;
		height: 350px;
	}
</style>