<template>
	<div class="homeSearch">
			<router-link to="/">
				<p><span class="el-icon-search"></span>搜索饿了么商家、商品名称</p>
			</router-link>
	</div>
</template>
<style type="text/css">
	.homeSearch{
		margin-top: -1px;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		padding: 7.5px 14px;
		position: -webkit-sticky;
		position: sticky;
		top: 0px;
		width: 100%;
		box-sizing: border-box;
		z-index: 6;
	}
	.homeSearch p {
		height: 0.72rem;
		background: white;
		text-align: center;
		color: #ccc;
		font-size: 16px;
		line-height: 0.72rem;
	}
</style>