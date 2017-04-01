/**
 * Created by gadflybsd on 2017/3/12.
 */
var starterApp = angular.module('starter.directives', []);
starterApp.directive('registerPage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			model: '=ngModel',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/register.html';
		},
		controller: function($rootScope, $scope, $element, $window, unit, userLogic){
			$scope.model = {}
			$scope.title = $rootScope.$$childHead.$title;
			$scope.weixin = function(){
				userLogic.weixinLogin();
			}
			$scope.sendSms = function(){
				var sendButton = $element.find('button.sendSms');
				userLogic.sendSms($scope.model.mobile, sendButton, 'register');
			}
			$scope.submit = function(){
				if(!unit.isEmptyObject($window.sessionStorage.weixin)) $scope.model.weixin = JSON.parse($window.sessionStorage.weixin);
				userLogic.register($scope.model);
			}
		}
	}
});
starterApp.directive('loginPage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			model: '=ngModel',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/login.html';
		},
		controller: function($rootScope, $scope, $window, configs, userLogic, unit){
			$scope.model = {}
			$scope.title = $rootScope.$$childHead.$title;
			$scope.submit = function(){
				if(!unit.isEmptyObject($window.sessionStorage.weixin)) $scope.model.weixin = JSON.parse($window.sessionStorage.weixin);
				userLogic.login($scope.model);
			};
			$scope.weixin = function(){
				userLogic.weixinLogin();
			}
		}
	}
});
/**
 * 实名认证指令，页面调用方法
<realname-dom model="'MustachUser'" module="'realname'" back="'app.my'" form="form" title="'实名认证标题'">
	<!-- 额外新增的表单字段开始 -->
	<label class="item-input">
		<input type="tel" name="nickname" ng-model="form.realname" placeholder="请填写真实姓名">
	</label>
	<!-- 额外新增的表单字段结束 -->
</realname-dom>
 */
starterApp.directive('realnamePage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			model: '=ngModel',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/realname.html';
		},
		controller: function($rootScope, imgPickerService, $scope, $window, userLogic){
			userLogic.userState('login', function(user){
				$scope.title = $rootScope.$$childHead.$title;
				$scope.model = {
					realname: user.realname,
					idcard: user.idcard
				};
				$scope.idcard1 = user.idcard_url_1;
				$scope.idcard2 = user.idcard_url_2;
				$scope.setIdcard1 = function(){
					imgPickerService.camera(function(res){
						$scope.idcard1 = res;
					})
				};
				$scope.setIdcard2 = function(){
					imgPickerService.camera(function(res){
						$scope.idcard2 = res;
					})
				};
				$scope.submit = function(){
					userLogic.realname($scope.model, [$scope.idcard1, $scope.idcard2]);
				}
			}, true);
		}
	}
});
/**
 * 设定头像指令，页面调用方法
<set-headimg-dom model="'MustachUser'" module="'setHeadimg'" back="'app.my'" form="form" title="'设定头像标题'">
	<!-- 额外新增的表单字段开始 -->
	<label class="item-input">
		<input type="tel" name="nickname" ng-model="form.realname" placeholder="请填写真实姓名">
	</label>
	<!-- 额外新增的表单字段结束 -->
</set-headimg-dom>
 */
starterApp.directive('setHeadimgPage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/headimg.html';
		},
		controller: function($rootScope, $scope, userLogic){
			userLogic.userState('login', function(user){
				$scope.title = $rootScope.$$childHead.$title;
				$scope.headimg = user.headimg;
				$scope.setHeadimg = function () {
					userLogic.headimg([$scope.headimg]);
				}
			}, true);
		}
	}
});

starterApp.directive('setPasswordPage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			model: '=ngModel',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/password.html';
		},
		controller: function($rootScope, $scope, $state, $element, userLogic){
			userLogic.userState('login', function(user){
				$scope.model = {mobile: user.mobile};
				$scope.title = $rootScope.$$childHead.$title;
				$scope.sendSms = function(){
					var sendButton = $element.find('button.sendSms');
					userLogic.sendSms($scope.model.mobile, sendButton, 'setPassword');
				}
				$scope.submit = function(){
					userLogic.setPassword($scope.model);
				}
			}, true);
		}
	}
});

starterApp.directive('forgotPasswordPage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			model: '=ngModel',
			mobile: '=',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/forgot-password.html';
		},
		controller: function($rootScope, $scope, $element, userLogic){
			userLogic.userState('login', function(){
				$scope.model = {};
				$scope.title = $rootScope.$$childHead.$title;
				$scope.sendSms = function(){
					var sendButton = $element.find('button.sendSms');
					userLogic.sendSms($scope.model.mobile, sendButton, 'forgotPassword');
				}
				$scope.submit = function(){
					userLogic.forgotPassword($scope.model);
				}
			}, true);
		}
	}
});

starterApp.directive('setMobilePage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			model: '=model',
			module: '=module',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/mobile.html';
		},
		controller: function($rootScope, $scope, $element, $state, userLogic){
			userLogic.userState('login', function(user){
				$scope.model = {mobile: user.mobile};
				$scope.title = $rootScope.$$childHead.$title;
				$scope.sendSms = function(){
					var sendButton = $element.find('button.sendSms');
					userLogic.sendSms($scope.model.mobile, sendButton, 'forgotPassword');
				}
				$scope.submit = function(){
					userLogic.setMobile($scope.model);
				}
			}, true);
		}
	}
});

starterApp.directive('setNicknamePage',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/nickname.html';
		},
		controller: function($rootScope, $scope, $state, userLogic){
			xhr.userState('login', function(user){
				$scope.nickname = user.nickname;
				$scope.title = $rootScope.$$childHead.$title;
				$scope.submit = function(){
					userLogic.setNickname($scope.nickname);
				}
			}, true);
		}
	}
});

/**
 * 设定头像指令，页面调用方法
 <set-headimg-dom model="'MustachUser'" module="'setHeadimg'" back="'app.my'" form="form" title="'设定头像标题'">
 <!-- 额外新增的表单字段开始 -->
 <label class="item-input">
 <input type="tel" name="nickname" ng-model="form.realname" placeholder="请填写真实姓名">
 </label>
 <!-- 额外新增的表单字段结束 -->
 </set-headimg-dom>
 */
starterApp.directive('myProfileDom',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			user: '=user',
			state: '=state',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/myProfile.html';
		},
		controller: function($scope, $rootScope, userLogic){
			$scope.title = $rootScope.$$childHead.$title;
			$scope.weixin = function(){
				userLogic.bindWeixin();
			};
			var back = (angular.isUndefined($scope.back) || $scope.back === null)?'app.home':$scope.back;
			$scope.logout = function(){
				userLogic.logout(function(user, identity){
					$scope.state = identity;
					$scope.user = user;
				});
			}
		}
	}
});

starterApp.directive('myCenterDom',function(){
	return {
		restrict: 'AEC',
		scope: {
			back: '=back',
			user: '=user',
			state: '=state',
			title: '=title'
		},
		transclude: true,
		templateUrl: function(){
			return 'javascript/directives/user_tpl/myCenter.html';
		},
		controller: function($rootScope, $scope, $state, $window, userLogic){
			userLogic.userState('login', function(user){
				$scope.title = $rootScope.$$childHead.$title;
				$scope.user = user;
				$scope.weixin = function(){
					userLogic.bindWeixin();
				};
				$scope.logout = function(){
					userLogic.logout(function(user, identity){
						$scope.state = identity;
						$scope.user = user;
					});
				}
			}, true);
		}
	}
});