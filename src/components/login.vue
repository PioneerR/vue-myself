<template>
	<div>
		<div class="head-div">
			<!--			<span :class="{'on': type == 0}" @click="choose(0)">手机验证码登录</span>-->
			<span :class="{'on': type == 1}" @click="choose(1)">账号密码登录</span>
		</div>
		
		<div class="content">
			<div class="borderBot code">
				<input type="text" v-model="phone" placeholder="请输入您的手机号"/>
				<!--				<span v-if="type == 0" @click="getCode" class="gray">发送验证码</span>-->
			</div>
			
			<div class="borderBot">
				<!--				<input v-if="type == 0" type="text" v-model="code" placeholder="请输入验证码"/>-->
				<input type="text" v-model="password" placeholder="请输入密码"/>
			</div>
			
			<!--<div class="borderBot" v-if="loginCount > 3">
				<input type="text" v-model="imageCode" placeholder="请输入图形验证码"/>
				<div class="letter">
					<img alt="" id="authCode" :src="imgCodeUrl" @click="changeImg"/>
				</div>
			</div>-->
			<div class="icon" @click="login">登录</div>
			<!-- <div class="icon" @click="goWeixinLogin">wx登录</div>	 -->
			<div class="tip" @click="goRegister">还没账号？立即注册></div>
		</div>
	</div>
</template>


<script>
	import * as rem from '../../static/js/rem-px.js';	// 字体大小转换
	import * as loginApi from '../api/login.js';

	export default {
		data() {
			return {
				type: 1,
				phone: '',
				password: ''
			}
		},
		methods: {
			// GO - 注册页面
			goRegister(){
				this.$router.push("/register");
			},
			
			// 登录
			login() {
				// 手机号验证
				if (this.phone.length == 15) {
					var realPhone = this.phone.substring(0, this.phone.length - 4);
					if (!(/^1[3-9][0-9]\d{8}$/.test(realPhone))) {
						this.$message({
							showClose: true,
							type: 'warning',
							message: "请输入正确的手机号码！"
						});
						return;
					}
				} else {
					if (!(/^1[3-9][0-9]\d{8}$/.test(this.phone))) {
						this.$message({
							showClose: true,
							type: 'warning',
							message: "请输入正确的手机号码！"
						});
						return;
					}
				}
				
				// 密码验证
				if (this.password == '') {
					this.$message({
						showClose: true,
						type: 'warning',
						message: "请输入密码"
					});
					return;
				}
				
				// 执行 - 登录
				loginApi.login(this);
				return;
			}
		}
	}
</script>


<style scoped="scoped">
	body {
		background: #fff;
		margin: 0;
	}
	
	.head-div {
		font-size: 0;
		text-align: center;
		padding: .3rem .7rem 0 .7rem;
	}
	
	.head-div span {
		line-height: .76rem;
		width: 50%;
		display: inline-block;
		font-size: .28rem;
		position: relative;
	}
	
	.head-div span.on {
		color: #4C2D19;
	}
	
	.head-div span.on:before {
		content: "";
		background-color: #fbcb67;
		height: .02rem;
		width: 2.4rem;
		position: absolute;
		bottom: 0;
		left: .4rem;
	}
	
	.content {
		padding: 0 .7rem;
		margin-top: .2rem;
		text-align: center;
	}
	
	.content input {
		line-height: .76rem;
		padding-top: .24rem;
		width: 100%;
		background: transparent;
		border: none;
	}
	
	.content .borderBot {
		border-bottom: 1px solid #999;
		position: relative;
	}
	
	.content .code span {
		position: absolute;
		line-height: .9rem;
		top: .16rem;
		right: .2rem;
		font-size: .28rem;
	}
	
	.content .code {
		position: relative;
	}
	
	.content .code span:before {
		position: absolute;
		content: "";
		height: .54rem;
		width: 0.02rem;
		background-color: #E1E1E1;
		left: -.3rem;
		top: .2rem;
	}
	
	.content .icon {
		margin-top: .8rem;
		line-height: .8rem;
		color: #FFFFFF;
		background-color: #fbcb67;
		border-radius: .08rem;
		font-size: .3rem;
		margin-bottom: .36rem;
	}
	
	.content .chart {
		position: relative;
	}
	
	.content .chart .chartCode {
		position: absolute;
		width: 1.46rem;
		height: .64rem;
		right: .24rem;
		top: .2rem;
		background-color: #FBDC2F;
	}
	
	.gray {
		color: #909090;
	}
	
	.letter {
		width: 1.46rem;
		height: .66rem;
		position: absolute;
		right: .26rem;
		top: .2rem;
		background-color: #C13028;
	}
	
	.tip {
		font-size: .34rem;
	}
	
	.login-method {
		display: flex;
		flex-direction: column;
		font-size: 0.23rem;
		margin-top: 2.9rem;
	}
	
	.login-method .title {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.login-method .title .title-text {
		margin: 0 0.18rem;
	}
	
	.login-method .title::before {
		content: '';
		width: 1.9rem;
		height: 1px;
		background-color: #e1e1e1;
	}
	
	.login-method .title::after {
		content: '';
		width: 1.9rem;
		height: 1px;
		background-color: #e1e1e1;
	}
	
	.login-method-list {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.34rem;
	}
	
	.login-method-list .item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.login-method-list .item img {
		width: 0.9rem;
		height: 0.9rem;
	}
	
	.login-method-list .item span {
		line-height: 0.23rem;
		margin-top: 0.2rem;
	}
</style>
