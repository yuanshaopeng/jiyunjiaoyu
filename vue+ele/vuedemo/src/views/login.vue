<template>
	<div>
		<router-link to="/">会主页</router-link>
		手机号：<input type="text" v-model="tel" /><button @click="getcode">获取验证码</button><br />
		验证码：<input type="text" v-model="code"/>
		<button @click="login()">登陆</button>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"login",
		data(){
			return {
				tel:"",
				code:"",
			}
		},
		methods:{
			getcode(){
				this.$api.getCode({tel:this.tel}).then(res=>{
					this.code = res.data.data.code;
				})
			},
			login(){
				if(!this.tel&&!this.code) return
				this.$api.login({
					tel:this.tel,
					code:this.code
				}).then(res=>{
//					console.log(res);
					if(res.data.status==1){
						this.$cookie.setCookie("token_id",res.data.data.token_id,7);
						this.$cookie.setCookie("user_id",res.data.data.id,7);
						this.$router.back(-1);//路由回退上一级
					}
				})
			}
		}
	}
</script>