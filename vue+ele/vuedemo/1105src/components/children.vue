<template>
	<div>
		<h2>子组件</h2>
		{{pdata}}
		{{$store.state.num}}
		<button @click="change">change</button>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"children",
		data(){
			return {
				msg:"我是子组件的数据"
			}
		},
		methods:{
			sendData(){
				this.$emit("send",this.msg);
			},
			change(){
//				this.$bus.msg = "22222";
			}
		},
		props:["pdata"],
		mounted(){
			this.sendData();
//			this.$bus.$on("sends",(data)=>{
//				console.log(data);
//			})
			
		}
	}
</script>