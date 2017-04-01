/**
 * Created by gadflybsd on 2017/3/26.
 */
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
	app.constant('configs', {
		db_name: 'app_ionic.db',
		url: {
			restful: 'http://gadfly.cn/manage.php?s=/Restful/angular.html',
			upload: 'http://gadfly.cn/manage.php?s=/File/uploadPicture.html',
		},
		state: {
			home: 'tab.home',
			my: 'tab.my',
			login: 'tab.login',
			register: 'tab.register'
		},
		model: {
			user: 'appUser'
		}
	});
	app.run(function ($SQLite, configs, service) {
		$SQLite.dbConfig({
			name: configs.db_name,
			description: 'Test DB',
			version: '1.0'
		});
		//if (!service.isInitialRun()) {
			service.getJson('json/table.json', function(response){
				$SQLite.init(function (init) {
					var createInsert = function(name, config){
						init.step();
						$SQLite.createTable(name, config).then(function(){
							service.getJson('json/app_router.json', function(resp) {
								$SQLite.ready(function () {
									console.log(resp.data);
									angular.forEach(resp.data, function(obj){
										$SQLite.insert(resp.table, obj)
									});
									init.done;
									//service.setInitialRun(true);
								});
							});
						});
					}
					angular.forEach(response, function (config, name) {
						$SQLite.tableExists(name).then(
							function(resp){
								if(resp.rows.length > 0){
									$SQLite.dropTable(name).then(
										function(){
											createInsert(name, config);
										},function(error){
											console.log('Error: ', error.message);
										}
									);
								}else{
									init.step();
									$SQLite.createTable(name, config).then(init.done);
								}
							},
							function(error){
								console.log('Error: ', error.message);
							}
						);
					});
					init.finish();
				});
			});
		//}
	});
	app.run(function ($rootScope, $ionicPlatform, $window, $cordovaDevice, $cordovaSplashscreen, unit) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
			if (unit.isEmptyObject($window.localStorage.device)) {
				var device = $cordovaDevice.getDevice();
				$window.localStorage.setItem("device", JSON.stringify(device));
			}
		});
	});
	app.config(function($provide) {
		$provide.decorator('$SQLite', function ($delegate) {
			return $delegate;
		});
	});
	app.config(function($SQLiteProvider) {
		var $SQLite = $SQLiteProvider.$get();
		$SQLite.dbConfig({
			name: 'app_ionic.db',
			description: 'Test DB',
			version: '1.0'
		});
		$SQLite.selectAll('SELECT * FROM app_router;', []).then(
			function(){
				console.log('onEmpty');
			}, function(error){
				console.log(error);
			},
			function (result) {
				window.localStorage.menu = JSON.stringify(result.rows);
			}
		);
	});
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