/**
 * Created by gadflybsd on 2017/4/2.
 */
var app = angular.module('starter.logic', []);
app.factory('userLogic', function($state, $window, $ionicLoading, imgPickerService, service, configs, unit, ngSwal){
	"用户操作类服务";
	return {
		userState: function(rule, callback, alert){
			"验证用户现在状态";
			var config = {jump: false}
			if(unit.isEmptyObject(alert)) alert = false;
			if(unit.isEmptyObject($window.sessionStorage.getItem('userInfo'))){
				var user = false;
			}else{
				var user = JSON.parse($window.sessionStorage.getItem('userInfo'));
			}
			var identity = {
				isLogin: (!user || unit.isEmptyObject(user.mobile))?false:true,
				isRealname: (!user || unit.isEmptyObject(user.is_realname) || user.is_realname == 0)?false:true,
				isBindweixin: (!user || unit.isEmptyObject(user.is_bindweixin) || user.is_bindweixin == 0)?false:true,
				isBindweibo: (!user || unit.isEmptyObject(user.is_bindweibo) || user.is_bindweibo == 0)?false:true,
				isBindqq: (!user || unit.isEmptyObject(user.is_bindqq) || user.is_bindqq == 0)?false:true,
				isEngineer: (!user || unit.isEmptyObject(user.is_engineer) || user.is_engineer == 0)?false:true,
			}
			if(!identity.isLogin)
				user = {headimg: 'img/no-astar.jpg'};
			switch(rule){
				case 'login':
					if(!identity.isLogin){
						config = {
							jump: true,
							text: '您尚未注册或登录！',
							button: '现在登录',
							to: 'app.login'
						}
					}
					break;
				case 'register':
					if(!identity.isLogin){
						config = {
							jump: true,
							text: '您尚未注册或登录！',
							button: '现在登录',
							to: 'app.login'
						}
					}
					break;
				case 'realname':
					if(!identity.isLogin){
						config = {
							jump: true,
							text: '您尚未注册或登录！',
							button: '现在登录',
							to: 'app.login'
						}
					}else{
						if(!identity.isRealname){
							config = {
								jump: true,
								text: '您尚未进行实名认证！',
								button: '现在申请',
								to: 'app.realname'
							}
						}else{
							if(user.is_realname == 1){
								config = {
									jump: true,
									text: '您的实名认证正在审核中！',
									button: '等待审核',
									to: 'app.my'
								}
							}
						}
					}
					break;
				case 'bindweixin':
					if(!identity.isLogin){
						config = {
							jump: true,
							text: '您尚未注册或登录！',
							button: '现在登录',
							to: 'app.login'
						}
					}else{
						if(!identity.isBindweixin){
							config = {
								jump: true,
								text: '您尚未绑定微信！',
								button: '现在绑定',
								to: 'app.bindweixin'
							}
						}
					}
					break;
				case 'bindweibo':
					if(!identity.isLogin){
						config = {
							jump: true,
							text: '您尚未注册或登录！',
							button: '现在登录',
							to: 'app.login'
						}
					}else{
						if(!identity.isBindweibo){
							config = {
								jump: true,
								text: '您尚未绑定微博！',
								button: '现在绑定',
								to: 'app.bindweibo'
							}
						}
					}
					break;
				case 'bindqq':
					if(!identity.isLogin){
						config = {
							jump: true,
							text: '您尚未注册或登录！',
							button: '现在登录',
							to: 'app.login'
						}
					}else {
						if (!identity.isBindqq) {
							config = {
								jump: true,
								text: '您尚未绑定QQ！',
								button: '现在绑定',
								to: 'app.bindqq'
							}
						}
					}
					break;
				case 'list':
					config = { jump: false};
			}
			if(config.jump){
				if(alert){
					ngSwal.confirm({text: config.text, type: "warning", confirmButtonText: config.button, cancelButtonText: "返回首页"},
						function(){
							$state.go(config.to, {}, {reload: true});
						}, function(){
							$state.go("app.home", {}, { reload: true });
						});
				}else{
					if(typeof(callback) == 'function') callback(user, identity);
				}
			}else{
				if(typeof(callback) == 'function') callback(user, identity);
			}
		},
		register: function(param, back){
			"用户注册";
			var goto = (unit.isEmpty(back))?configs.state.my:back;
			var data = {model: configs.model.user, module: 'register', data: param};
			service.restful('post', data, function(resp){
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, {reload: true});
			});
		},
		bindWeixin: function(){
			"绑定微信";
			Wechat.isInstalled(function(installed){
				WEIXININSTALL=installed;
				var scope = "snsapi_userinfo",
					state = "_" + (+new Date());
				Wechat.auth(scope, state, function (response) {
					service.restful('post',{model: configs.model.user, module: 'bindWeixin', data: response}, function(res){
						ngSwal.alert({type: 'success', text: res.content}, function(){
							$state.go(configs.state.my);
						});
					});
				}, function (reason) {
					ngSwal.alert({type: 'error', text: "Auth Failed: " + reason});
				});
			}, function (reason) {
				ngSwal.alert({type: 'error', text: "Install Failed: " + reason});
			});
		},
		weixinLogin: function(){
			"微信登录";
			Wechat.isInstalled(function(installed){
				WEIXININSTALL = installed;
				var weixinLogin = installed,
					scope = "snsapi_userinfo",
					state = "_" + (+new Date());
				Wechat.auth(scope, state, function(response) {
					console.log(response);
					$ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
					service.restful('post', {model: configs.model.user, module: 'weixinLogin', data: response}, function(res){
						console.log(res);
						$ionicLoading.hide();
						if(res.type == 'Info'){
							$window.sessionStorage.setItem('weixin', JSON.stringify(res.data));
							ngSwal.confirm({
								text: '您的微信未绑定胡子用户!?',
								title: '微信登录提示',
								confirmButtonText: '绑定现有用户',
								cancelButtonText: '创建新的用户'
							}, function(){
								$state.go(configs.state.login);
							}, function () {
								$state.go(configs.state.register);
							})
						}else{
							$state.go(configs.state.my);
						}
					});
				}, function(reason){
					ngSwal.alert({text: "Auth Failed: " + reason});
				});
			}, function(reason){
				ngSwal.alert({text: "Install Failed: " + reason});
			});
		},
		login: function(param, back){
			"用户登录";
			var goto = (unit.isEmpty(back))?configs.state.my:back;
			var data = {model: configs.model.user, module: 'login', data: param};
			service.restful('post', data, function(resp){
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, {reload: true});
			});
		},
		realname: function(param, img, back){
			"实名认证申请";
			if(img[0] == 'img/no-astar.jpg'){
				ngSwal.alert({text: '身份证正面必须拍照', type: 'warning'});
			}else{
				if(img[1] == 'img/no-astar.jpg'){
					ngSwal.alert({text: '身份证背面必须拍照', type: 'warning'});
				}else{
					imgPickerService.uploads(img, '上传二代身份证图片', function(resp){
						$ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
						param.idcard_1 = resp[0].data.id;
						param.idcard_2 = resp[1].data.id;
						var goto = (unit.isEmpty(back))?configs.state.my:back;
						var data = {model: configs.model.user, module: 'realname', data: param};
						service.restful('post', data, function(resp){
							if(resp.type.toLowerCase()=='success') $state.go(goto, {}, {reload: true});
						});
					});
				}
			}
		},
		headimg: function(img, back){
			"设定头像";
			imgPickerService.headimg(function(img){
				imgPickerService.uploads([img], '上传个人头像图片', function(resp){
					var goto = (unit.isEmpty(back))?configs.state.my:back;
					service.restful('post', {model: configs.model.user, module: 'headimg', data: {headimg: resp[0].data.id}}, function(res){
						if(res.type.toLowerCase()=='success')
							if(back != 'notJust') $state.go(goto, {}, { reload: true });
					});
				});
			})
		},
		setPassword: function(param, back){
			"重置密码";
			service.restful('post', {model: configs.model.user, module: 'setPassword', data: param}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		forgotPassword: function(param, back){
			"忘记密码";
			service.restful('post', {model: configs.model.user, module: 'forgotPassword', data: param}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		sendSms: function(mobile, ele, ac){
			"发送手机验证码";
			service.restful('post', {
				model: configs.model.user,
				module: 'sendSmsCode',
				data: {type: 'ctc', mobile: mobile, action: ac}
			}, function(resp){
				ngSwal.alert({text: resp.msg, type: resp.type.toLowerCase(), timer: 3000}, function(){
					if(resp.type.toLowerCase() == 'success') unit.sendSmsTimer(ele);
				});
			});
		},
		setMobile: function(param, back){
			"重置手机号码";
			service.restful('post', {model: configs.model.user, module: 'setMobile', data: param}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		setNickname: function(nickname, back){
			"设置用户昵称";
			service.restful('post', {model: configs.model.user, module: 'setNickname', data: {nickname: nickname}}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		logout: function(callback, back){
			"退出登录状态";
			ngSwal.confirm({
				type: "warning",
				text: "请确认：您真的要退出APP吗？",
				confirmButtonText: "是的，立即退出",
				closeOnConfirm: false
			},function(){
				ngSwal.close();
				service.restful('post', {model: configs.model.user, module: 'logout', data:{}}, function(resp){
					var goto = (unit.isEmpty(back))?configs.state.my:back;
					if(resp.type == 'Success'){
						var storage = service.getStorage();
						delete storage.device.mobile;
						$window.localStorage.setItem('device', JSON.stringify(storage.device));
						$window.sessionStorage.removeItem('userInfo');
						this.userState('list', function(user, identity){
							if(typeof(callback) == 'function') callback(user, identity);
						});
						$state.go(goto, {}, { reload: true });
					}
				});
			});
		}
	}
});