/**
 * # AngularJS UI Router
 * @class angular.router
 * @author GadflyBSD
 */
var app = angular.module('starter.router', []);
app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/app/home');
	/**
	 * # app Router
	 * @method app
	 */
	$stateProvider.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/app.html',
		controller: function($scope, $state, $rootScope, unit){
			$scope.state = new Array();
			$rootScope.$on('$ionicView.beforeEnter', function(){
				if(unit.in_array($state.current.name, $scope.state))
					$rootScope.hideTabs = false;
				else
					$rootScope.hideTabs = true;
			});
		}
	});
		
	/**
	 * # 门锁系统设置 路由配置项
	 * @method lockset
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.lockset;
	 *     路由Url: /lockset;
	 *     路由数据Data: {pageTitle: '门锁系统设置'};
	 *     控制器文件路径: javascript/controller/menuContent/locksetCtrl.js;
	 *     控制器名称: locksetCtrl;
	 *     模板文件路径: templates/menuContent/lockset.html;
	 *
	 */
	$stateProvider.state('app.lockset', {
		url: '/lockset',
		cache: false,
		data: {pageTitle: '门锁系统设置'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/locksetCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/lockset.html';
				},
				controller: 'locksetCtrl'
			}
		}
	});	
	/**
	 * # 手机App设置 路由配置项
	 * @method appset
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.appset;
	 *     路由Url: /appset;
	 *     路由数据Data: {pageTitle: '手机App设置'};
	 *     控制器文件路径: javascript/controller/menuContent/appsetCtrl.js;
	 *     控制器名称: appsetCtrl;
	 *     模板文件路径: templates/menuContent/appset.html;
	 *
	 */
	$stateProvider.state('app.appset', {
		url: '/appset',
		cache: false,
		data: {pageTitle: '手机App设置'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/appsetCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/appset.html';
				},
				controller: 'appsetCtrl'
			}
		}
	});	
	/**
	 * # 开门权限设置 路由配置项
	 * @method authoritySet
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.authoritySet;
	 *     路由Url: /authoritySet;
	 *     路由数据Data: {pageTitle: '开门权限设置'};
	 *     控制器文件路径: javascript/controller/menuContent/authoritySetCtrl.js;
	 *     控制器名称: authoritySetCtrl;
	 *     模板文件路径: templates/menuContent/authoritySet.html;
	 *
	 */
	$stateProvider.state('app.authoritySet', {
		url: '/authoritySet',
		cache: false,
		data: {pageTitle: '开门权限设置'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/authoritySetCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/authoritySet.html';
				},
				controller: 'authoritySetCtrl'
			}
		}
	});	
	/**
	 * # 蓝牙型应急电子钥匙权限下载 路由配置项
	 * @method down_blueKey
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.down_blueKey;
	 *     路由Url: /down_blueKey;
	 *     路由数据Data: {pageTitle: '蓝牙型应急电子钥匙权限下载'};
	 *     控制器文件路径: javascript/controller/menuContent/down_blueKeyCtrl.js;
	 *     控制器名称: down_blueKeyCtrl;
	 *     模板文件路径: templates/menuContent/down_blueKey.html;
	 *
	 */
	$stateProvider.state('app.down_blueKey', {
		url: '/down_blueKey',
		cache: false,
		data: {pageTitle: '蓝牙型应急电子钥匙权限下载'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/down_blueKeyCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/down_blueKey.html';
				},
				controller: 'down_blueKeyCtrl'
			}
		}
	});	
	/**
	 * # 手机APP开门 路由配置项
	 * @method openDoor
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.openDoor;
	 *     路由Url: /openDoor;
	 *     路由数据Data: {pageTitle: '手机APP开门'};
	 *     控制器文件路径: javascript/controller/menuContent/openDoorCtrl.js;
	 *     控制器名称: openDoorCtrl;
	 *     模板文件路径: templates/menuContent/openDoor.html;
	 *
	 */
	$stateProvider.state('app.openDoor', {
		url: '/openDoor',
		cache: false,
		data: {pageTitle: '手机APP开门'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/openDoorCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/openDoor.html';
				},
				controller: 'openDoorCtrl'
			}
		}
	});	
	/**
	 * # 报警及日志管理 路由配置项
	 * @method MG_record
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.MG_record;
	 *     路由Url: /MG_record;
	 *     路由数据Data: {pageTitle: '报警及日志管理'};
	 *     控制器文件路径: javascript/controller/menuContent/MG_recordCtrl.js;
	 *     控制器名称: MG_recordCtrl;
	 *     模板文件路径: templates/menuContent/MG_record.html;
	 *
	 */
	$stateProvider.state('app.MG_record', {
		url: '/MG_record',
		cache: false,
		data: {pageTitle: '报警及日志管理'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/MG_recordCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/MG_record.html';
				},
				controller: 'MG_recordCtrl'
			}
		}
	});	
	/**
	 * # 管理中心数据恢复控制 路由配置项
	 * @method MC_dateRecovery
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.MC_dateRecovery;
	 *     路由Url: /MC_dateRecovery;
	 *     路由数据Data: {pageTitle: '管理中心数据恢复控制'};
	 *     控制器文件路径: javascript/controller/menuContent/MC_dateRecoveryCtrl.js;
	 *     控制器名称: MC_dateRecoveryCtrl;
	 *     模板文件路径: templates/menuContent/MC_dateRecovery.html;
	 *
	 */
	$stateProvider.state('app.MC_dateRecovery', {
		url: '/MC_dateRecovery',
		cache: false,
		data: {pageTitle: '管理中心数据恢复控制'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/MC_dateRecoveryCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/MC_dateRecovery.html';
				},
				controller: 'MC_dateRecoveryCtrl'
			}
		}
	});	
	/**
	 * # 帮助 路由配置项
	 * @method help
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.help;
	 *     路由Url: /help;
	 *     路由数据Data: {pageTitle: '帮助'};
	 *     控制器文件路径: javascript/controller/menuContent/helpCtrl.js;
	 *     控制器名称: helpCtrl;
	 *     模板文件路径: templates/menuContent/help.html;
	 *
	 */
	$stateProvider.state('app.help', {
		url: '/help',
		cache: false,
		data: {pageTitle: '帮助'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/helpCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/help.html';
				},
				controller: 'helpCtrl'
			}
		}
	});	
	/**
	 * # App开启密码设置 路由配置项
	 * @method appset_password
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.appset_password;
	 *     路由Url: /appset_password;
	 *     路由数据Data: {pageTitle: 'App开启密码设置'};
	 *     控制器文件路径: javascript/controller/menuContent/appset/appset_passwordCtrl.js;
	 *     控制器名称: appset_passwordCtrl;
	 *     模板文件路径: templates/menuContent/appset/appset_password.html;
	 *
	 */
	$stateProvider.state('app.appset_password', {
		url: '/appset_password',
		cache: false,
		data: {pageTitle: 'App开启密码设置'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/appset/appset_passwordCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/appset/appset_password.html';
				},
				controller: 'appset_passwordCtrl'
			}
		}
	});	
	/**
	 * # App身份设置 路由配置项
	 * @method appset_identity
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.appset_identity;
	 *     路由Url: /appset_identity;
	 *     路由数据Data: {pageTitle: 'App身份设置'};
	 *     控制器文件路径: javascript/controller/menuContent/appset/appset_identityCtrl.js;
	 *     控制器名称: appset_identityCtrl;
	 *     模板文件路径: templates/menuContent/appset/appset_identity.html;
	 *
	 */
	$stateProvider.state('app.appset_identity', {
		url: '/appset_identity',
		cache: false,
		data: {pageTitle: 'App身份设置'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/appset/appset_identityCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/appset/appset_identity.html';
				},
				controller: 'appset_identityCtrl'
			}
		}
	});	
	/**
	 * # 蓝牙自动开启关闭设置 路由配置项
	 * @method appset_bluetooth
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.appset_bluetooth;
	 *     路由Url: /appset_bluetooth;
	 *     路由数据Data: {pageTitle: '蓝牙自动开启关闭设置'};
	 *     控制器文件路径: javascript/controller/menuContent/appset/appset_bluetoothCtrl.js;
	 *     控制器名称: appset_bluetoothCtrl;
	 *     模板文件路径: templates/menuContent/appset/appset_bluetooth.html;
	 *
	 */
	$stateProvider.state('app.appset_bluetooth', {
		url: '/appset_bluetooth',
		cache: false,
		data: {pageTitle: '蓝牙自动开启关闭设置'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/appset/appset_bluetoothCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/appset/appset_bluetooth.html';
				},
				controller: 'appset_bluetoothCtrl'
			}
		}
	});	
	/**
	 * # App登陆管理中心及权限获取设置 路由配置项
	 * @method appset_loginMC 
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.appset_loginMC ;
	 *     路由Url: /appset_loginMC ;
	 *     路由数据Data: {pageTitle: 'App登陆管理中心及权限获取设置'};
	 *     控制器文件路径: javascript/controller/menuContent/appset/appset_loginMC Ctrl.js;
	 *     控制器名称: appset_loginMC Ctrl;
	 *     模板文件路径: templates/menuContent/appset/appset_loginMC .html;
	 *
	 */
	$stateProvider.state('app.appset_loginMC ', {
		url: '/appset_loginMC ',
		cache: false,
		data: {pageTitle: 'App登陆管理中心及权限获取设置'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/appset/appset_loginMC Ctrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/appset/appset_loginMC .html';
				},
				controller: 'appset_loginMC Ctrl'
			}
		}
	});	
	/**
	 * # 设置校对时间 路由配置项
	 * @method lockSysSet_proTime
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.lockSysSet_proTime;
	 *     路由Url: /lockSysSet_proTime;
	 *     路由数据Data: {pageTitle: '设置校对时间'};
	 *     控制器文件路径: javascript/controller/menuContent/locksysset/lockSysSet_proTimeCtrl.js;
	 *     控制器名称: lockSysSet_proTimeCtrl;
	 *     模板文件路径: templates/menuContent/locksysset/lockSysSet_proTime.html;
	 *
	 */
	$stateProvider.state('app.lockSysSet_proTime', {
		url: '/lockSysSet_proTime',
		cache: false,
		data: {pageTitle: '设置校对时间'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/locksysset/lockSysSet_proTimeCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/locksysset/lockSysSet_proTime.html';
				},
				controller: 'lockSysSet_proTimeCtrl'
			}
		}
	});	
	/**
	 * # 单钥匙开门权限 路由配置项
	 * @method form_keyAlone
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_keyAlone;
	 *     路由Url: /form_keyAlone;
	 *     路由数据Data: {pageTitle: '单钥匙开门权限'};
	 *     控制器文件路径: javascript/controller/menuContent/authorityset/form_keyAloneCtrl.js;
	 *     控制器名称: form_keyAloneCtrl;
	 *     模板文件路径: templates/menuContent/authorityset/form_keyAlone.html;
	 *
	 */
	$stateProvider.state('app.form_keyAlone', {
		url: '/form_keyAlone',
		cache: false,
		data: {pageTitle: '单钥匙开门权限'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/authorityset/form_keyAloneCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/authorityset/form_keyAlone.html';
				},
				controller: 'form_keyAloneCtrl'
			}
		}
	});	
	/**
	 * # 双钥匙组合开门权限 路由配置项
	 * @method form_keyDouble
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_keyDouble;
	 *     路由Url: /form_keyDouble;
	 *     路由数据Data: {pageTitle: '双钥匙组合开门权限'};
	 *     控制器文件路径: javascript/controller/menuContent/authorityset/form_keyDoubleCtrl.js;
	 *     控制器名称: form_keyDoubleCtrl;
	 *     模板文件路径: templates/menuContent/authorityset/form_keyDouble.html;
	 *
	 */
	$stateProvider.state('app.form_keyDouble', {
		url: '/form_keyDouble',
		cache: false,
		data: {pageTitle: '双钥匙组合开门权限'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/authorityset/form_keyDoubleCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/authorityset/form_keyDouble.html';
				},
				controller: 'form_keyDoubleCtrl'
			}
		}
	});	
	/**
	 * # 三钥匙组合开门权限 路由配置项
	 * @method form_keyThree
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_keyThree;
	 *     路由Url: /form_keyThree;
	 *     路由数据Data: {pageTitle: '三钥匙组合开门权限'};
	 *     控制器文件路径: javascript/controller/menuContent/authorityset/form_keyThreeCtrl.js;
	 *     控制器名称: form_keyThreeCtrl;
	 *     模板文件路径: templates/menuContent/authorityset/form_keyThree.html;
	 *
	 */
	$stateProvider.state('app.form_keyThree', {
		url: '/form_keyThree',
		cache: false,
		data: {pageTitle: '三钥匙组合开门权限'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/authorityset/form_keyThreeCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/authorityset/form_keyThree.html';
				},
				controller: 'form_keyThreeCtrl'
			}
		}
	});	
	/**
	 * # 标准型应急电子钥匙开门权限 路由配置项
	 * @method form_keyEmergency
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_keyEmergency;
	 *     路由Url: /form_keyEmergency;
	 *     路由数据Data: {pageTitle: '标准型应急电子钥匙开门权限'};
	 *     控制器文件路径: javascript/controller/menuContent/authorityset/form_keyEmergencyCtrl.js;
	 *     控制器名称: form_keyEmergencyCtrl;
	 *     模板文件路径: templates/menuContent/authorityset/form_keyEmergency.html;
	 *
	 */
	$stateProvider.state('app.form_keyEmergency', {
		url: '/form_keyEmergency',
		cache: false,
		data: {pageTitle: '标准型应急电子钥匙开门权限'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/authorityset/form_keyEmergencyCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/authorityset/form_keyEmergency.html';
				},
				controller: 'form_keyEmergencyCtrl'
			}
		}
	});	
	/**
	 * # 查询、修改、删除开门权限 路由配置项
	 * @method form_MG
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_MG;
	 *     路由Url: /form_MG;
	 *     路由数据Data: {pageTitle: '查询、修改、删除开门权限'};
	 *     控制器文件路径: javascript/controller/menuContent/authorityset/form_MGCtrl.js;
	 *     控制器名称: form_MGCtrl;
	 *     模板文件路径: templates/menuContent/authorityset/form_MG.html;
	 *
	 */
	$stateProvider.state('app.form_MG', {
		url: '/form_MG',
		cache: false,
		data: {pageTitle: '查询、修改、删除开门权限'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/authorityset/form_MGCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/authorityset/form_MG.html';
				},
				controller: 'form_MGCtrl'
			}
		}
	});	
	/**
	 * # 机构管理 路由配置项
	 * @method form_orgMG
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_orgMG;
	 *     路由Url: /form_orgMG;
	 *     路由数据Data: {pageTitle: '机构管理'};
	 *     控制器文件路径: javascript/controller/menuContent/form_orgMG/form_orgMGCtrl.js;
	 *     控制器名称: form_orgMGCtrl;
	 *     模板文件路径: templates/menuContent/form_orgMG/form_orgMG.html;
	 *
	 */
	$stateProvider.state('app.form_orgMG', {
		url: '/form_orgMG',
		cache: false,
		data: {pageTitle: '机构管理'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/form_orgMG/form_orgMGCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/form_orgMG/form_orgMG.html';
				},
				controller: 'form_orgMGCtrl'
			}
		}
	});	
	/**
	 * # 通信控制器管理 路由配置项
	 * @method form_comSet
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_comSet;
	 *     路由Url: /form_comSet;
	 *     路由数据Data: {pageTitle: '通信控制器管理'};
	 *     控制器文件路径: javascript/controller/menuContent/locksysset/form_comSetCtrl.js;
	 *     控制器名称: form_comSetCtrl;
	 *     模板文件路径: templates/menuContent/locksysset/form_comSet.html;
	 *
	 */
	$stateProvider.state('app.form_comSet', {
		url: '/form_comSet',
		cache: false,
		data: {pageTitle: '通信控制器管理'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/locksysset/form_comSetCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/locksysset/form_comSet.html';
				},
				controller: 'form_comSetCtrl'
			}
		}
	});	
	/**
	 * # 门锁管理 路由配置项
	 * @method form_devMG
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_devMG;
	 *     路由Url: /form_devMG;
	 *     路由数据Data: {pageTitle: '门锁管理'};
	 *     控制器文件路径: javascript/controller/menuContent/locksysset/form_devMGCtrl.js;
	 *     控制器名称: form_devMGCtrl;
	 *     模板文件路径: templates/menuContent/locksysset/form_devMG.html;
	 *
	 */
	$stateProvider.state('app.form_devMG', {
		url: '/form_devMG',
		cache: false,
		data: {pageTitle: '门锁管理'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/locksysset/form_devMGCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/locksysset/form_devMG.html';
				},
				controller: 'form_devMGCtrl'
			}
		}
	});	
	/**
	 * # 开门人登记 路由配置项
	 * @method form_opePpRegist
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_opePpRegist;
	 *     路由Url: /form_opePpRegist;
	 *     路由数据Data: {pageTitle: '开门人登记'};
	 *     控制器文件路径: javascript/controller/menuContent/locksysset/form_opePpRegistCtrl.js;
	 *     控制器名称: form_opePpRegistCtrl;
	 *     模板文件路径: templates/menuContent/locksysset/form_opePpRegist.html;
	 *
	 */
	$stateProvider.state('app.form_opePpRegist', {
		url: '/form_opePpRegist',
		cache: false,
		data: {pageTitle: '开门人登记'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/locksysset/form_opePpRegistCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/locksysset/form_opePpRegist.html';
				},
				controller: 'form_opePpRegistCtrl'
			}
		}
	});	
	/**
	 * #  钥匙登记 路由配置项
	 * @method form_keyRegist
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.form_keyRegist;
	 *     路由Url: /form_keyRegist;
	 *     路由数据Data: {pageTitle: ' 钥匙登记'};
	 *     控制器文件路径: javascript/controller/menuContent/locksysset/form_keyRegistCtrl.js;
	 *     控制器名称: form_keyRegistCtrl;
	 *     模板文件路径: templates/menuContent/locksysset/form_keyRegist.html;
	 *
	 */
	$stateProvider.state('app.form_keyRegist', {
		url: '/form_keyRegist',
		cache: false,
		data: {pageTitle: ' 钥匙登记'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/locksysset/form_keyRegistCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/locksysset/form_keyRegist.html';
				},
				controller: 'form_keyRegistCtrl'
			}
		}
	});	
	/**
	 * # 手机App开锁 路由配置项
	 * @method home
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.home;
	 *     路由Url: /home;
	 *     路由数据Data: {pageTitle: '手机App开锁'};
	 *     控制器文件路径: javascript/controller/menuContent/homeCtrl.js;
	 *     控制器名称: homeCtrl;
	 *     模板文件路径: templates/menuContent/home.html;
	 *
	 */
	$stateProvider.state('app.home', {
		url: '/home',
		cache: false,
		data: {pageTitle: '手机App开锁'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/homeCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/home.html';
				},
				controller: 'homeCtrl'
			}
		}
	});	
	/**
	 * # 门锁互锁功能 路由配置项
	 * @method lockSysSet_linkage
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.lockSysSet_linkage;
	 *     路由Url: /lockSysSet_linkage;
	 *     路由数据Data: {pageTitle: '门锁互锁功能'};
	 *     控制器文件路径: javascript/controller/menuContent/locksysset/lockSysSet_linkageCtrl.js;
	 *     控制器名称: lockSysSet_linkageCtrl;
	 *     模板文件路径: templates/menuContent/locksysset/lockSysSet_linkage.html;
	 *
	 */
	$stateProvider.state('app.lockSysSet_linkage', {
		url: '/lockSysSet_linkage',
		cache: false,
		data: {pageTitle: '门锁互锁功能'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/locksysset/lockSysSet_linkageCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/locksysset/lockSysSet_linkage.html';
				},
				controller: 'lockSysSet_linkageCtrl'
			}
		}
	});	
	/**
	 * # 蓝牙开锁 路由配置项
	 * @method open_bluetooth
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.open_bluetooth;
	 *     路由Url: /open_bluetooth;
	 *     路由数据Data: {pageTitle: '蓝牙开锁'};
	 *     控制器文件路径: javascript/controller/menuContent/opendoor/open_bluetoothCtrl.js;
	 *     控制器名称: open_bluetoothCtrl;
	 *     模板文件路径: templates/menuContent/opendoor/open_bluetooth.html;
	 *
	 */
	$stateProvider.state('app.open_bluetooth', {
		url: '/open_bluetooth',
		cache: false,
		data: {pageTitle: '蓝牙开锁'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/opendoor/open_bluetoothCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/opendoor/open_bluetooth.html';
				},
				controller: 'open_bluetoothCtrl'
			}
		}
	});	
	/**
	 * # App远程开门 路由配置项
	 * @method open_remote
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.open_remote;
	 *     路由Url: /open_remote;
	 *     路由数据Data: {pageTitle: 'App远程开门'};
	 *     控制器文件路径: javascript/controller/menuContent/opendoor/open_remoteCtrl.js;
	 *     控制器名称: open_remoteCtrl;
	 *     模板文件路径: templates/menuContent/opendoor/open_remote.html;
	 *
	 */
	$stateProvider.state('app.open_remote', {
		url: '/open_remote',
		cache: false,
		data: {pageTitle: 'App远程开门'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/opendoor/open_remoteCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/opendoor/open_remote.html';
				},
				controller: 'open_remoteCtrl'
			}
		}
	});	
	/**
	 * # App动态开门 路由配置项
	 * @method open_dynamic
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.open_dynamic;
	 *     路由Url: /open_dynamic;
	 *     路由数据Data: {pageTitle: 'App动态开门'};
	 *     控制器文件路径: javascript/controller/menuContent/opendoor/open_dynamicCtrl.js;
	 *     控制器名称: open_dynamicCtrl;
	 *     模板文件路径: templates/menuContent/opendoor/open_dynamic.html;
	 *
	 */
	$stateProvider.state('app.open_dynamic', {
		url: '/open_dynamic',
		cache: false,
		data: {pageTitle: 'App动态开门'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/opendoor/open_dynamicCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/opendoor/open_dynamic.html';
				},
				controller: 'open_dynamicCtrl'
			}
		}
	});	
	/**
	 * # 开门/巡检/报警、提示 记录查询 路由配置项
	 * @method record_condition
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.record_condition;
	 *     路由Url: /record_condition;
	 *     路由数据Data: {pageTitle: '开门/巡检/报警、提示 记录查询'};
	 *     控制器文件路径: javascript/controller/menuContent/mgrecord/record_conditionCtrl.js;
	 *     控制器名称: record_conditionCtrl;
	 *     模板文件路径: templates/menuContent/mgrecord/record_condition.html;
	 *
	 */
	$stateProvider.state('app.record_condition', {
		url: '/record_condition',
		cache: false,
		data: {pageTitle: '开门/巡检/报警、提示 记录查询'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/mgrecord/record_conditionCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/mgrecord/record_condition.html';
				},
				controller: 'record_conditionCtrl'
			}
		}
	});	
	/**
	 * # 记录提取 路由配置项
	 * @method record_extract
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.record_extract;
	 *     路由Url: /record_extract;
	 *     路由数据Data: {pageTitle: '记录提取'};
	 *     控制器文件路径: javascript/controller/menuContent/mgrecord/record_extractCtrl.js;
	 *     控制器名称: record_extractCtrl;
	 *     模板文件路径: templates/menuContent/mgrecord/record_extract.html;
	 *
	 */
	$stateProvider.state('app.record_extract', {
		url: '/record_extract',
		cache: false,
		data: {pageTitle: '记录提取'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/mgrecord/record_extractCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/mgrecord/record_extract.html';
				},
				controller: 'record_extractCtrl'
			}
		}
	});	
	/**
	 * # 记录查询结果 路由配置项
	 * @method record_result
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.record_result;
	 *     路由Url: /record_result;
	 *     路由数据Data: {pageTitle: '记录查询结果'};
	 *     控制器文件路径: javascript/controller/menuContent/mgrecord/record_resultCtrl.js;
	 *     控制器名称: record_resultCtrl;
	 *     模板文件路径: templates/menuContent/mgrecord/record_result.html;
	 *
	 */
	$stateProvider.state('app.record_result', {
		url: '/record_result',
		cache: false,
		data: {pageTitle: '记录查询结果'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/mgrecord/record_resultCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/mgrecord/record_result.html';
				},
				controller: 'record_resultCtrl'
			}
		}
	});	
	/**
	 * # 帮助列表 路由配置项
	 * @method help_list
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.help_list;
	 *     路由Url: /help_list;
	 *     路由数据Data: {pageTitle: '帮助列表'};
	 *     控制器文件路径: javascript/controller/menuContent/help/help_listCtrl.js;
	 *     控制器名称: help_listCtrl;
	 *     模板文件路径: templates/menuContent/help/help_list.html;
	 *
	 */
	$stateProvider.state('app.help_list', {
		url: '/help_list',
		cache: false,
		data: {pageTitle: '帮助列表'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/help/help_listCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/help/help_list.html';
				},
				controller: 'help_listCtrl'
			}
		}
	});	
	/**
	 * # 帮助详情 路由配置项
	 * @method help_detail
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.help_detail;
	 *     路由Url: /help_detail;
	 *     路由数据Data: {pageTitle: '帮助详情'};
	 *     控制器文件路径: javascript/controller/menuContent/help/help_detailCtrl.js;
	 *     控制器名称: help_detailCtrl;
	 *     模板文件路径: templates/menuContent/help/help_detail.html;
	 *
	 */
	$stateProvider.state('app.help_detail', {
		url: '/help_detail',
		cache: false,
		data: {pageTitle: '帮助详情'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/help/help_detailCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/help/help_detail.html';
				},
				controller: 'help_detailCtrl'
			}
		}
	});	
	/**
	 * # 版本说明 路由配置项
	 * @method help_versions
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.help_versions;
	 *     路由Url: /help_versions;
	 *     路由数据Data: {pageTitle: '版本说明'};
	 *     控制器文件路径: javascript/controller/menuContent/help/help_versionsCtrl.js;
	 *     控制器名称: help_versionsCtrl;
	 *     模板文件路径: templates/menuContent/help/help_versions.html;
	 *
	 */
	$stateProvider.state('app.help_versions', {
		url: '/help_versions',
		cache: false,
		data: {pageTitle: '版本说明'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/help/help_versionsCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/help/help_versions.html';
				},
				controller: 'help_versionsCtrl'
			}
		}
	});	
	/**
	 * # 设定手势密码 路由配置项
	 * @method patternLock
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.patternLock;
	 *     路由Url: /patternLock;
	 *     路由数据Data: {pageTitle: '设定手势密码'};
	 *     控制器文件路径: javascript/controller/menuContent/appset/appset_patternLockCtrl.js;
	 *     控制器名称: appset_patternLockCtrl;
	 *     模板文件路径: templates/menuContent/appset/appset_patternLock.html;
	 *
	 */
	$stateProvider.state('app.patternLock', {
		url: '/patternLock',
		cache: false,
		data: {pageTitle: '设定手势密码'},
		resolve: {
			des: function($ocLazyLoad) {
				return $ocLazyLoad.load([
					'javascript/controller/menuContent/appset/appset_patternLockCtrl.js'
				]);
			}
		},
		views: {
			'menuContent': {
				templateUrl: function(){
					return 'templates/menuContent/appset/appset_patternLock.html';
				},
				controller: 'appset_patternLockCtrl'
			}
		}
	});
});