(function() {
	var app = angular.module('starter', ['ionic',
		'ngSQLite',
		'ionicLazyLoad', 
		'angular-image-404',
		'ngCordova',
		'jett.ionic.filter.bar',
		'oc.lazyLoad',
		'starter.services',
		'starter.router',
		'starter.directives'
	]);
	/**
	 * # 设置APP项目配置文件
	 * @class angular.constant
	 * @author GadflyBSD
	 */
	app.constant('configs', {
		db_name: 'app_ionic.db',
		url: {
			restful: 'http://gadfly.cn/manage.php?s=/Restful/angular.html',
			upload: 'http://gadfly.cn/manage.php?s=/File/uploadPicture.html',
		},
		state: {
			home: 'app.home',
			my: 'app.my',
			login: 'app.login',
			register: 'app.register'
		},
		model: {
			user: 'appUser'
		}
	});
	/**
	 * # RUN
	 * @class angular.run
	 * @author GadflyBSD
	 */
	app.run(function(service, $rootScope, $ionicPlatform){
		if(!service.isInitialRun()){
			service.sqlite({
				type: 'createTableFromJson',
				file: 'www/json/position.json'
			}).then(function(){
				service.setInitialRun(true);
			}, function(error){
				console.log(error)
			});
		}
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
			/*if (unit.isEmptyObject($window.localStorage.device)) {
			 var device = $cordovaDevice.getDevice();
			 $window.localStorage.setItem("device", JSON.stringify(device));
			 }*/
		});
	});
	/**
	 * # Config
	 * @class angular.config
	 * @author GadflyBSD
	 */
	app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
		$httpProvider.defaults.headers = {
			post: {'Content-Type': 'application/x-www-form-urlencoded'},
			get: {'Content-Type': 'application/x-www-form-urlencoded'},
			put: {'Content-Type': 'application/x-www-form-urlencoded'},
			delete: {'Content-Type': 'application/x-www-form-urlencoded'}
		}
		$httpProvider.defaults.transformRequest = function (obj) {
			var str = [];
			for (var p in obj) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
			return str.join("&");
		};
		$ionicConfigProvider.platform.android.tabs.style('standard');
		$ionicConfigProvider.platform.android.tabs.position('bottom');
		$ionicConfigProvider.platform.android.navBar.alignTitle('center');
		$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
		$ionicConfigProvider.platform.android.views.transition('android');
	});
}());