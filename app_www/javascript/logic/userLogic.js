/**
 * # 用户操作类逻辑
 * Created by gadflybsd on 2017/4/2.
 * @class Logic.userLogic
 * @author GadflyBSD
 */
var app = angular.module('starter.logic', []);
app.factory('userLogic', function($state, $window, $ionicLoading, $q, imgPicker, device, service, configs, unit, ngSwal){
	"用户操作类逻辑";
	var device = unit.isEmptyObject(device.getDevice())?{uuid:null}:device.getDevice();
	var that = this;
	return {
		/**
		 * # 获取用户当前状态操作逻辑
		 * @param rule
		 * @param callback
		 * @param alert
		 */
		userState: function(rule, callback, alert){
			"获取用户当前状态";
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
		/**
		 * # APP用户注册操作逻辑
		 * @param param
		 * @param back
		 */
		register: function(param, back){
			"APP用户注册";
			var goto = (unit.isEmpty(back))?configs.state.my:back;
			var data = {model: configs.model.user, module: 'register', data: param};
			service.restful('post', data, function(resp){
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, {reload: true});
			});
		},
		/**
		 * # APP用户绑定微信操作逻辑
		 */
		bindWeixin: function(){
			"APP用户绑定微信";
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
		/**
		 * # 微信第三方登录操作逻辑
		 */
		weixinLogin: function(){
			"微信第三方登录";
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
		/**
		 * # 用户登录操作逻辑
		 * @param param
		 * @param back
		 */
		login: function(param, back){
			"用户登录";
			var goto = (unit.isEmpty(back))?configs.state.my:back;
			var data = {model: configs.model.user, module: 'login', data: param};
			service.restful('post', data, function(resp){
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, {reload: true});
			});
		},
		/**
		 * # 实名认证申请操作逻辑
		 * @param param
		 * @param img
		 * @param back
		 */
		realname: function(param, img, back){
			"实名认证申请";
			if(img[0] == 'img/no-astar.jpg'){
				ngSwal.alert({text: '身份证正面必须拍照', type: 'warning'});
			}else{
				if(img[1] == 'img/no-astar.jpg'){
					ngSwal.alert({text: '身份证背面必须拍照', type: 'warning'});
				}else{
					imgPicker.uploads(img, '上传二代身份证图片', function(resp){
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
		/**
		 * # 设定用户头像操作逻辑
		 * @param img
		 * @param back
		 */
		headimg: function(img, back){
			"设定头像";
			imgPicker.headimg(function(img){
				imgPicker.uploads([img], '上传个人头像图片', function(resp){
					var goto = (unit.isEmpty(back))?configs.state.my:back;
					service.restful('post', {model: configs.model.user, module: 'headimg', data: {headimg: resp[0].data.id}}, function(res){
						if(res.type.toLowerCase()=='success')
							if(back != 'notJust') $state.go(goto, {}, { reload: true });
					});
				});
			})
		},
		/**
		 * # 用户重置密码操作逻辑
		 * @param param
		 * @param back
		 */
		setPassword: function(param, back){
			"重置密码";
			service.restful('post', {model: configs.model.user, module: 'setPassword', data: param}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		/**
		 * # 用户忘记密码操作逻辑
		 * @param param
		 * @param back
		 */
		forgotPassword: function(param, back){
			"忘记密码";
			service.restful('post', {model: configs.model.user, module: 'forgotPassword', data: param}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		/**
		 * # 用户发送手机验证码操作逻辑
		 * @param mobile
		 * @param ele
		 * @param ac
		 */
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
		/**
		 * # 用户重置手机号码操作逻辑
		 * @param param
		 * @param back
		 */
		setMobile: function(param, back){
			"重置手机号码";
			service.restful('post', {model: configs.model.user, module: 'setMobile', data: param}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		/**
		 * # 用户设置用户昵称操作逻辑
		 * @param nickname
		 * @param back
		 */
		setNickname: function(nickname, back){
			"设置用户昵称";
			service.restful('post', {model: configs.model.user, module: 'setNickname', data: {nickname: nickname}}, function(resp){
				var goto = (unit.isEmpty(back))?configs.state.my:back;
				if(resp.type.toLowerCase()=='success') $state.go(goto, {}, { reload: true });
			});
		},
		/**
		 * # 退出登录状态操作逻辑
		 * @param callback
		 * @param back
		 */
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
		},
		/**
		 * # 从sqlite中获取用户基础信息操作逻辑
		 * @param callback
		 */
		getUserInfo: function(callback){
			"从sqlite中获取用户基础信息";
			service.sqlite({
				type: 'find',
				table: 'app_user',
				where: 'uuid="' + device.uuid + '"'
			}, function(result){
				if(typeof callback) callback(result.rows.item(0));
			})
		},
		/**
		 * # APP用户设置手势密码操作逻辑
		 * @param param
		 */
		setPatternPassword: function(param){
			"APP用户设置手势密码";
			if(configs.sqlite){
				service.sqlite({
					type: 'save',
					table: 'app_user',
					where: 'uuid="' + device.uuid + '"',
					data: {pattern_password: param}
				}, function(result){
					if(result.type == 'success'){
						that.userLog({type: 'setPatternPassword'}, function() {
							$window.localStorage.setItem("pattern_password", param);
							$state.go('app.appset_identity');
						});
					}
				});
			}else{
				console.log(param);
				$state.go('app.appset_identity');
			}
		},
		/**
		 * # App开启密码设置控制器操作逻辑
		 * @param param
		 */
		lockRegister: function(param){
			"App开启密码设置控制器";
			var data = {
				uuid: device.uuid,
				password: param.password,
				question_1_key: param.question_1_key,
				question_1_value: param.question_1_value,
				question_2_key: param.question_1_key,
				question_2_value: param.question_1_value
			}
			if(configs.sqlite){
				service.sqlite({
					type: 'add',
					table: 'app_user',
					data: data
				}, function(result){
					if(result.type == 'success'){
						delete data.uuid;
						delete data.password;
						that.userLog({type: 'lockRegister'}, function() {
							$window.localStorage.setItem("app_question", angular.toJson(data));
							$window.localStorage.setItem("app_password", data.password);
							$state.go('app.pattern_lock');
						});
					}
				});
			}else{
				console.log(data);
				$state.go('app.pattern_lock');
			}
		},
		/**
		 * # 用户通过手势密码或登录密码解锁手机操作逻辑
		 * @param param
		 * @param type
		 */
		lockLogin: function (param, type) {
			'用户通过手势密码或登录密码解锁手机的逻辑';
			var uuid = device.uuid;
			var data = (type == 'pattern')?{uuid: uuid, pattern_password: param}:{uuid: uuid, password: param};
			var logType = (type == 'pattern')?'patternLogin':'passwordLogin';
			service.sqlite({
				type: 'count',
				table: 'app_user',
				where: data
			}, function(result){
				if(result.counts.counts > 0){
					that.userLog({type: logType}, function(){
						ngSwal.alert({
							type: 'success',
							text: (type == 'pattern')?'手势密码验证正确, 成功登录APP!':'APP密码验证正确, 成功登录APP!'
						}, function(){
							$state.go('app.home');
						});
					})
				}else{
					ngSwal.alert({
						type: 'error',
						text: (type == 'pattern')?'手势密码验证失败, 重新输入手势密码!':'APP密码验证失败, 重新输入APP密码!'
					});
				}
			});
		},
		/**
		 * # 用户对APP设置用户相片操作逻辑
		 * @param callback
		 */
		lockPhoto: function(callback){
			"用户对APP设置用户相片";
			imgPicker.headimg(function(img){
				imgPicker.copyPhoto(img, function(newImg){
					that.userInfo({type: 'setPhoto'}, function(){
						if(typeof callback == 'function') callback(newImg);
					});
				});
			});
		},
		/**
		 * # 用户操作日志记录操作逻辑
		 * @param param
		 * @param callback
		 */
		userLog: function(param, callback){
			"用户操作日志记录逻辑";
			var userInfo = this.getUserInfo();
			var data = {
				uid: userInfo.uid,
				uuid: device.getUUID(),
				changes: param.type,
				dateline: new Date().getTime()
			}
			switch (param.type){
				case 'passwordLogin':
					data.related = 'app_user';
					data.related_pk = userInfo.id;
					data.info = '用户通过登录密码登录APP!';
					break;
				case 'patternLogin':
					data.related = 'app_user';
					data.related_pk = userInfo.id;
					data.info = '用户通过手势密码登录APP!'
					break;
				case 'lockRegister':
					data.related = 'app_user';
					data.related_pk = userInfo.id;
					data.info = '用户初次对App密码进行设置!'
					break;
				case 'setPatternPassword':
					data.related = 'app_user';
					data.related_pk = userInfo.id;
					data.info = '用户对APP设置手势密码!'
					break;
				case 'setPhoto':
					data.related = 'app_user';
					data.related_pk = userInfo.id;
					data.info = '用户对APP设置用户相片!'
					break;
				case 'setIdentity':
					data.related = 'app_user';
					data.related_pk = userInfo.id;
					data.info = '用户对智能锁App进行身份设置';
					break;
				case 'setAutoBluetooth':
					data.related = 'app_user';
					data.related_pk = userInfo.id;
					data.info = '用户设置智能锁APP蓝牙自动设置'
			}
			service.sqlite({
				type: 'add',
				data: data
			}, function(result){
				if(typeof callback == 'function') callback(result);
			}, function(error){
				ngSwal({
					type: 'error',
					text: '向数据库记录操作日志时出错!' + error.message
				});
			})
		},
		/**
		 * # 智能锁APP设置密码操作逻辑
		 * @param param
		 */
		lockSetPassword: function(param){
			"智能锁APP设置密码";
			var data = {
				password: param
			}
			if(configs.sqlite){
				service.sqlite({
					type: 'save',
					table: 'app_user',
					where: 'uuid="' + device.uuid + '"',
					data: data
				}, function(result){
					$state.go('app.openDoor');
				})
			}else{
				console.log(data);
				$state.go('app.openDoor');
			}
		},
		/**
		 * # 智能锁App身份设置操作逻辑
		 * @param param
		 */
		appset_identity: function(param){
			"智能锁App身份设置逻辑";
			var data = {
				app_id: param.app_id,
				server_ip: param.server_ip,
				server_port: param.server_port,
				mobile: param.mobile,
				realname: param.realname,
				num: param.num,
				duty: param.duty,
				idcard: param.idcard,
				telphone: param.telphone,
				photo: param.photo,
				orgname: param.orgname
			}
			if(configs.sqlite){
				service.sqlite({
					type: 'save',
					table: 'app_user',
					where: 'uuid="' + device.uuid + '"',
					data: data
				}, function(result){
					if(result.type == 'success'){
						that.userLog({type: 'setIdentity'}, function(){
							$state.go('app.appset_bluetooth');
						});
					}
				});
			}else{
				console.log(data);
				$state.go('app.appset_bluetooth');
			}
		},
		position: function(param){
			var name = param + '_name';
			service.sqlite({
				type: 'select',
				table: 'prosition_' + param.name,
				where: param.name + '_id = ' + param.id
			}, function(){

			})
		},
		get_position: function(param, callback){
			service.sqlite({
				type: 'select',
				table: 'position_provice' + param.table,
				where: param.where
			}, function(result) {
				var list = [];
				angular.forEach(result.list, function(provice){
					this.push(provice);
				}, list);
				if(typeof callback == 'function') callback(list);
			});
		},
		get_position_1: function(callback){
			var position = new Object;
			service.sqlite({
				type: 'select',
				table: 'position_provice'
			}, function(provice) {
				position.provice = provice.list;
				service.sqlite({
					type: 'select',
					table: 'position_city'
				}, function(city) {
					position.city = city.list;
					var list = [];
					angular.forEach(position.provice, function(obj_provice){
						obj_provice.name = obj_provice.provice_name;
						obj_provice.type = 'provice';
						obj_provice.sync = false;
						obj_provice.tree = [];
						angular.forEach(position.city, function(obj_city){
							if(obj_provice.provice_id == obj_city.provice_id){
								obj_city.name = obj_city.city_name;
								obj_city.type = 'city';
								obj_city.provice_id = obj_provice.provice_id;
								obj_city.sync = true;
								this.tree.push(obj_city);
								obj_city.tree = [];
							}
						}, obj_provice);
						this.push(obj_provice);
					}, list);
					if(typeof callback == 'function') callback(list);
				});
			});
		},
		get_position_0: function(callback){
			"获得数据库中机构分类";
			var position = [];
			service.sqlite({
				type: 'select',
				table: 'position_provice'
			}, function(result_provice){
				angular.forEach(result_provice.list, function(obj_provice){
					obj_provice.name = obj_provice.provice_name;
					obj_provice.sync = false;
					var city = [];
					service.sqlite({
						type: 'select',
						where: {provice_id: obj_provice.provice_id},
						table: 'position_city'
					}, function(result_city){
						angular.forEach(result_city.list, function(obj_city){
							obj_city.name = obj_city.city_name;
							obj_city.provice_id = obj_provice.provice_id;
							obj_city.sync = false;
							service.sqlite({
								type: 'select',
								where: 'city_id=' + obj_city.city_id,
								table: 'position_county'
							}, function(result_county){
								angular.forEach(result_county.list, function(obj_county){
									obj_county.name = obj_county.county_name;
									obj_county.provice_id = obj_provice.provice_id;
									obj_county.city_id = obj_city.city_id;
									service.sqlite({
										type: 'count',
										where: 'county_id=' + obj_county.county_id,
										table: 'position_town'
									}, function(town_count){
										if(town_count.counts == 0){
											obj_county.sync = {table: 'town', name: 'county_id', pid: obj_county.county_id};
										}else{
											obj_county.sync = false;
											service.sqlite({
												type: 'select',
												where: 'county_id=' + obj_county.county_id,
												table: 'position_town'
											}, function(result_town){
												angular.forEach(result_town.list, function(obj_town){
													obj_town.name = obj_town.town_name;
													obj_town.provice_id = obj_provice.provice_id;
													obj_town.city_id = obj_city.city_id;
													obj_town.county_id = obj_county.county_id;
													service.sqlite({
														type: 'count',
														where: 'town_id = ' + obj_town.town_id,
														table: 'position_village'
													}, function(village_count){
														if(village_count.counts == 0){
															obj_town.sync = {table: 'village', name: 'town_id', pid: obj_town.town_id};
														}else{
															obj_town.sync = false;
															service.sqlite({
																type: 'select',
																where: 'town_id = ' + obj_town.town_id,
																table: 'position_village'
															}, function(result_village){
																angular.forEach(result_village.list, function(obj_village){
																	obj_village.name = obj_village.village_name;
																	obj_village.provice_id = obj_provice.provice_id;
																	obj_village.city_id = obj_city.city_id;
																	obj_village.county_id = obj_county.county_id;
																	obj_village.town_id = obj_town.town_id;
																	obj_town.tree = obj_village;
																});
															});
														}
													});
													obj_county.tree = obj_town;
												});
											});
										}
									})
									obj_city.tree = obj_county;
								});
							});
							obj_provice.tree = obj_city;
						});
					});
					position.push(obj_provice)
				});
				console.log(position);
				if(typeof callback == 'function') callback(position);
			});
		},
		get_position_bak: function(callback){
			var data = [{
				name: 'dsgvsdbvdsbvsdfbbds',
				tree: [
					{
						name: 'sdfgsdgdsgsdg',
						tree: [
							{name: 'dsgsdgsdgdsgdsg', sync: {id: 1}},
							{name: 'dfberyb', sync: {id: 2}}
						]
					},
					{
						name: 'fdsbrthb',
						tree: [
							{name: 'dsgsdgsdgdsgdsg'}
						]
					}
				]
			}];
			if(typeof callback == 'function') callback(data);
		},
		ajax_position: function(param, lists, callback){
			service.restful('get', {model: 'appModel', module: 'getPosition', data: param}, function(result){
				if(result.type == 'success'){
					service.sqlite({
						type: 'addAll',
						table: 'position_' + param.table,
						data: result.data
					}, function(resp){
						var list = lists;
						if(resp.type == 'success'){
							angular.forEach(lists, function(obj_provice, index_provice){
								if(param.provice_id == obj_provice.provice_id){
									angular.forEach(obj_provice.tree, function(obj_city, index_city){
										if(param.city_id == obj_city.city_id){
											angular.forEach(obj_city.tree, function(obj_county, index_county) {
												if(param.county_id == obj_county.county_id){
													if(unit.isEmpty(param.town_id)){
														list[index_provice].tree[index_city].tree[index_county].sync = {table: 'town', name: 'county_id', pid: obj_county.county_id};
														angular.forEach(result.data, function(obj, index){
															obj.name = obj.town_name;
															obj.provice_id = obj_provice.provice_id;
															obj.city_id = obj_city.city_id;
															obj.county_id = obj_county.county_id;
															list[index_provice].tree[index_city].tree[index_county].tree[index] = obj;
														})
													}else{
														angular.forEach(obj_county.tree, function(obj_town, index_town){
															if(param.town_id == obj_town.town_id){
																list[index_provice].tree[index_city].tree[index_county].tree[index_town].sync = false;
																angular.forEach(result.data, function(obj, index){
																	obj.name = obj.village_name;
																	obj.provice_id = obj_provice.provice_id;
																	obj.city_id = obj_city.city_id;
																	obj.county_id = obj_county.county_id;
																	obj.town_id = obj_town.town_id;
																	list[index_provice].tree[index_city].tree[index_county].tree[index_town].tree[index] = obj;
																});
															}
														})
													}
												}
											})
										}
									})
								}
							});
						}
						if(typeof callback == 'function') callback(list);
					});
				}
			})
		},
		/**
		 * # 用户APP设定自动开启蓝牙模块操作逻辑
		 * @param param
		 */
		auto_bluetooth: function (param) {
			"用户APP设定自动开启蓝牙模块";
			var data = {auto_bluetooth: param}
			if(configs.sqlite){
				service.sqlite({
					type: 'save',
					table: 'app_user',
					where: 'uuid="' + device.uuid + '"',
					data: data
				}, function(result){
					that.userLog({type: 'setAutoBluetooth'}, function(){
						if(result.type == 'success') $state.go('app.appset_loginMC');
					})
				});
			}else{
				console.log(data);
				$state.go('app.appset_loginMC');
			}
		},
		/**
		 * # 用户APP向服务器请求数据操作逻辑
		 */
		request_server: function(){
			"用户APP向服务器请求数据";
			if(configs.sqlite){
				service.sqlite({
					type: 'find',
					table: 'app_user',
					where: 'uuid="' + device.uuid + '"'
				}, function(result){
					var url = 'http://'+result.server_ip+':'+result.server_port + '/';
					service.httpRequest('post', url, result).then(function(resp){
						if(resp.type == 'success') $state.go('app.appset_loginMC');
					});
				});
			}else{
				$state.go('app.appset_loginMC');
			}
		}
	}
});