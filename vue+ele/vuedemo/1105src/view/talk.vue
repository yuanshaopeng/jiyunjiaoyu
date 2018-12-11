<template>
	<div>
		<h2>父组件</h2>
		<child-comp @send="getdata" :pdata="msg"></child-comp>
		<borther-comp></borther-comp>
	</div>
</template>
<script type="text/javascript">
	import children from "@/components/children";
	import borther from "@/components/borther";
	export default {
		name:"talk",
		data(){
			return {
				msg:"父组件的数据"
			}
		},
		methods:{
			getdata(val){
				console.log(val)
			}
		},
		components:{
			childComp:children,
			bortherComp:borther
		}
	}
</script>