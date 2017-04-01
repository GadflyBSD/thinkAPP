/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", ["ui.router", "ui.bootstrap", "oc.lazyLoad", "ngSanitize", "ngFileUpload"]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(function ($stateProvider, $httpProvider, $ocLazyLoadProvider){
    $httpProvider.defaults.headers = {
        post: {'Content-Type': 'application/x-www-form-urlencoded'},
        get: {'Content-Type': 'application/x-www-form-urlencoded'},
        put: {'Content-Type': 'application/x-www-form-urlencoded'},
        delete: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    $httpProvider.defaults.transformRequest = function(obj){
        var str = [];
        for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };
    /*$ocLazyLoadProvider.config({
        debug: true, //知否启用调试模式  
        events:true  //事件绑定是否启用 
    });*/
    /*jq.getJSON('json/ui-router.json', function(resp){
        window.sessionStorage.menu = angular.toJson(resp);
    });*/
});
/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'javascript',
        globalPath: 'javascript/global',
        layoutPath: 'javascript/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

MetronicApp.factory('getMenu', function($http){
	var config = {
		url: 'json/menu.json',
		cache: false,
		timeout: 30000,
		method: 'get'
	}
	return {
		service: function(callback){
			return $http(config).success(function(resp){
				window.localStorage.menu = angular.toJson(resp);
				if(typeof(callback) == 'function') callback(resp);
			})
		}
	}
});

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', 'getMenu', function($scope, getMenu) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
	getMenu.service(function(resp){
		$scope.menu = resp;
	});
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");  
    $stateProvider

        // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",            
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'javascript/global/plugins/morris/morris.css',                            
                            'javascript/global/plugins/morris/morris.min.js',
                            'javascript/global/plugins/morris/raphael-min.js',                            
                            'javascript/global/plugins/jquery.sparkline.min.js',
                            'javascript/pages/scripts/dashboard.min.js',
                            'javascript/controllers/DashboardController.js',
                        ] 
                    });
                }]
            }
        })
        .state('appRouter', {
            url: "/appRouter/lists",
            templateUrl: "views/app/router/lists.html",
            data: {pageTitle: 'APP 路由、Tabs、Menu设置'},
            controller: "appRouterCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/plugins/datatables/datatables.min.css',
                            'javascript/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'javascript/plugins/datatables/datatables.all.min.js',
                            'javascript/pages/scripts/table-datatables-managed.min.js',
	                        'javascript/service/appLogic.js',
                            'javascript/controllers/app/appRouterCtrl.js'
                        ]
                    });
                }]
            }
        })
        .state('appRouterAction', {
            url: "/appRouter/action/{ac}",
            templateUrl: "views/app/router/action.html",
            data: {pageTitle: '操作APP 路由、Tabs、Menu设置'},
            controller: "appRouterActionCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
	                        'javascript/service/appLogic.js',
                            'javascript/controllers/app/appRouterActionCtrl.js'
                        ]
                    }]);
                }]
            }
        })
	    .state('appHeader', {
		    url: "/appHeader/lists",
		    templateUrl: "views/app/header/lists.html",
		    data: {pageTitle: '操作APP 路由、Tabs、Menu设置'},
		    controller: "appHeaderCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
					    files: [
						    'javascript/plugins/datatables/datatables.min.css',
						    'javascript/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
						    'javascript/plugins/datatables/datatables.all.min.js',
						    'javascript/pages/scripts/table-datatables-managed.min.js',
						    'javascript/service/appLogic.js',
						    'javascript/controllers/app/appHeaderCtrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
	    .state('appHeaderAction', {
		    url: "/appHeader/action/{ac}",
		    templateUrl: "views/app/header/action.html",
		    data: {pageTitle: '操作APP 路由、Tabs、Menu设置'},
		    cache: false,
		    controller: "appHeaderActionCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
					    files: [
						    'javascript/service/appLogic.js',
						    'javascript/controllers/app/appHeaderActionCtrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
	    .state('appFunction', {
		    url: "/appFunction/lists",
		    templateUrl: "views/app/function/lists.html",
		    data: {pageTitle: '操作APP 路由、Tabs、Menu设置'},
		    controller: "appFunctionCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
					    files: [
						    'javascript/plugins/datatables/datatables.min.css',
						    'javascript/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
						    'javascript/plugins/datatables/datatables.all.min.js',
						    'javascript/pages/scripts/table-datatables-managed.min.js',
						    'javascript/service/appLogic.js',
						    'javascript/controllers/app/appFunctionCtrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
	    .state('appFunctionAction', {
		    url: "/appFunction/action/{ac}",
		    templateUrl: "views/app/function/action.html",
		    data: {pageTitle: '操作APP 路由、Tabs、Menu设置'},
		    cache: false,
		    controller: "appFunctionActionCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
					    files: [
						    'javascript/service/appLogic.js',
						    'javascript/controllers/app/appFunctionActionCtrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
	    .state('systemRouter', {
		    url: "/system/router",
		    templateUrl: "views/system/router/lists.html",
		    data: {pageTitle: '新增APP 路由、Tabs、Menu设置'},
		    controller: "routerListCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    files: [
						    'javascript/controllers/system/routerListCtrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
	    .state('systemRouterAction', {
		    url: "/system/router/action/{ac}",
		    templateUrl: "views/system/router/action.html",
		    data: {pageTitle: '操作APP 路由、Tabs、Menu设置'},
		    controller: "routerActionCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    files: [
						    'javascript/controllers/system/routerActionCtrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
	    .state('systemDataStructure', {
		    url: "/system/dataStructure",
		    templateUrl: "views/system/dataStructure.html",
		    data: {pageTitle: '系统数据库结构管理'},
		    controller: "dataStructureCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    files: [
						    'javascript/controllers/system/dataStructureCtrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
	    .state('systemDataModel', {
		    url: "/system/dataModel",
		    templateUrl: "views/system/dataModel.html",
		    data: {pageTitle: '系统数模型管理'},
		    controller: "dataModelCtrl",
		    resolve: {
			    deps: ['$ocLazyLoad', function($ocLazyLoad) {
				    return $ocLazyLoad.load([{
					    name: 'MetronicApp',
					    files: [
						    'javascript/controllers/system/dataModeltrl.js'
					    ]
				    }]);
			    }]
		    }
	    })
        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "views/file_upload.html",
            data: {pageTitle: 'AngularJS File Upload'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            'javascript/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ] 
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'javascript/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "views/ui_select.html",
            data: {pageTitle: 'AngularJS Ui Select'},
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'javascript/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ] 
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'javascript/controllers/UISelectController.js'
                        ] 
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'javascript/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })

        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: {pageTitle: 'jQuery Tree View'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/jstree/dist/themes/default/style.min.css',
                            'javascript/global/plugins/jstree/dist/jstree.min.js',
                            'javascript/pages/scripts/ui-tree.min.js',
                            'javascript/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })     

        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "views/form_tools.html",
            data: {pageTitle: 'Form Tools'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'javascript/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            'javascript/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            'javascript/global/plugins/typeahead/typeahead.css',

                            'javascript/global/plugins/fuelux/js/spinner.min.js',
                            'javascript/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'javascript/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'javascript/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            'javascript/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            'javascript/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            'javascript/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            'javascript/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            'javascript/global/plugins/typeahead/handlebars.min.js',
                            'javascript/global/plugins/typeahead/typeahead.bundle.min.js',
                            'javascript/pages/scripts/components-form-tools-2.min.js',

                            'javascript/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })        

        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "views/pickers.html",
            data: {pageTitle: 'Date & Time Pickers'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/clockface/css/clockface.css',
                            'javascript/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'javascript/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'javascript/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            'javascript/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                            'javascript/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'javascript/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            'javascript/global/plugins/clockface/js/clockface.js',
                            'javascript/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'javascript/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
                            'javascript/pages/scripts/components-date-time-pickers.min.js',
                            'javascript/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        })

        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "views/dropdowns.html",
            data: {pageTitle: 'Custom Dropdowns'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                            'javascript/global/plugins/select2/css/select2.min.css',
                            'javascript/global/plugins/select2/css/select2-bootstrap.min.css',
                            'javascript/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                            'javascript/global/plugins/select2/js/select2.full.min.js',
                            'javascript/pages/scripts/components-bootstrap-select.min.js',
                            'javascript/pages/scripts/components-select2.min.js',
                            'javascript/controllers/GeneralPageController.js'
                        ] 
                    }]);
                }] 
            }
        }) 

        // Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/managed.html",
            templateUrl: "views/datatables/managed.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [                             
                            'javascript/global/plugins/datatables/datatables.min.css', 
                            'javascript/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'javascript/global/plugins/datatables/datatables.all.min.js',
                            'javascript/pages/scripts/table-datatables-managed.min.js',
                            'javascript/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "views/datatables/ajax.html",
            data: {pageTitle: 'Ajax Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/datatables/datatables.min.css', 
                            'javascript/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            'javascript/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'javascript/global/plugins/datatables/datatables.all.min.js',
                            'javascript/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'javascript/global/scripts/datatable.js',
                            'javascript/scripts/table-ajax.js',
                            'javascript/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: {pageTitle: 'User Profile'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'javascript/pages/css/profile.css',
                            'javascript/global/plugins/jquery.sparkline.min.js',
                            'javascript/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'javascript/pages/scripts/profile.min.js',
                            'javascript/controllers/UserProfileController.js'
                        ]                    
                    });
                }]
            }
        })

        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: {pageTitle: 'User Profile'}
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: {pageTitle: 'User Account'}
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: {pageTitle: 'User Help'}      
        })

        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "views/todo.html",
            data: {pageTitle: 'Todo'},
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({ 
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'javascript/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'javascript/apps/css/todo-2.css',
                            'javascript/global/plugins/select2/css/select2.min.css',
                            'javascript/global/plugins/select2/css/select2-bootstrap.min.css',
                            'javascript/global/plugins/select2/js/select2.full.min.js',
                            'javascript/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'javascript/apps/scripts/todo-2.min.js',
                            'javascript/controllers/TodoController.js'  
                        ]                    
                    });
                }]
            }
        })
	/*angular.forEach(angular.fromJson(window.localStorage.menu), function(obj){
		$stateProvider.state('get.' + obj.name, {
			url: '/' + obj.name,
			resolve: {
				des: function ($ocLazyLoad) {
					return $ocLazyLoad.load('javascript/controller/' + obj.js +'.js');
				}
			},
			views: {
				"body": {
					templateUrl: function () {
						return 'template/' + obj.template +'.html';
					},
					controller: obj.controller
				}
			}
		});
	})*/

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);