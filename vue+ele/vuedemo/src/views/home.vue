<template>
	<div>
		<home-head></home-head>
		<home-search></home-search>
		<home-type></home-type>
		<home-ad></home-ad>
		<home-tjsj></home-tjsj>
		<home-foot></home-foot>
	</div>
</template>
<script type="text/javascript">
	import homeHead from "@/components/home/homeHead";
	import homeType from "@/components/home/type";
	import homeAd from "@/components/home/ad";
	import homeTjsj from "@/components/home/tjsj";
	import homeSearch from "@/components/home/search"
	import homeFoot from "@/components/public/footer";
	export default {
		name:"home",
		components:{
			homeHead,
			homeType,
			homeAd,
			homeTjsj,
			homeFoot,
			homeSearch
		}
	}
</script>