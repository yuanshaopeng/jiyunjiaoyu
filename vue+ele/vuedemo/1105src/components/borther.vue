<template>
	<div>
		<h2>兄弟组件</h2>
		{{num}}
		{{myGetter}}
		<button @click="change">change</button>
		<button @click="NUM(10)">+1</button>
	</div>
</template>
<script type="text/javascript">
	import { mapState,mapMutations,mapActions,mapGetters } from "vuex";
	export default {
		name:"borther",
		data(){
			return {
				msg:"兄弟数据",
			}
		},
		computed:{
			...mapState(["num"]),
			...mapGetters(["myGetter"])
		},
		methods:{
			...mapMutations(["NUM"]),
			...mapActions(["getmsg"]),
			sendData(){
//				this.$bus.$emit("sends",this.msg);
			},
			change(){
				this.$store.state.num++;
			},
			dd(){
				
			}
		},
		mounted(){
//			this.NUM(10)
//			console.log(this)
//			this.$store.commit("NUM",{ss:111})
//			this.$store.dispatch("getmsg")
//			this.$store==>vuex状态管理仓库
		}
	}
</script>