<template>
	<div class="shopItem">
		<img @click="fn" :src="shopopt.shopLogo" alt="" />
		<div>
			<h3>{{shopopt.shopName}}</h3>
			<el-rate
			  v-model="shopopt.shopRack*1"
			  disabled
			  show-score
			  text-color="#ff9900"
			  score-template="{5}">
			</el-rate>
			<div>
				<p><span>￥{{shopopt.shopQsj}}起送</span>/<span>配送费￥{{shopopt.shopPsf}}</span></p>
				<p><span>50m</span> | <span>25分钟</span></p>
			</div>
			<div>
				<el-tag size="mini" closable>好吃</el-tag>
			</div>
			<div>
				<p>满50减15，满100减20</p>
				<p>单品特价</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
//	{
//		shopName:
//		shopLogo:
//		shopQsj:
//		shopPsf:
//		shopRack:
//		shopAddress:
//	}
	export default {
		name:"shopItem",
		data(){
			return {
				rate:4
			}
		},
		methods:{
			fn(){
				alert(1)
			}
		},
		props:["shopopt"]
	}
</script>
<style type="text/css">
	.shopItem{
		padding: 30px 20px;
		display: flex;
	}
</style>