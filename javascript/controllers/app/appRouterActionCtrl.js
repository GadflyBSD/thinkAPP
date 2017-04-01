/**
 * Created by gadflybsd on 2017/3/9.
 */
angular.module('MetronicApp').controller('appRouterActionCtrl', function($rootScope, $scope, $stateParams, unit, appLogic) {
    $scope.$on('$viewContentLoaded', function() {
        App.initAjax();
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
    $scope.option = [
        {label: 'Tabs 页面', value: 'tabs'},
        {label: '左侧菜单页面', value: 'leftMenus'},
        {label: '右侧菜单页面', value: 'rightMenus'},
        {label: '非Tabs、非菜单页面', value: null},
    ]
	$scope.ac = $stateParams.ac;
	$scope.select = {}
    if($stateParams.ac == 'add'){
    	appLogic.getAppRouterSelect(function(result){
		    $scope.form ={}
		    $scope.page_title = '新增';
		    $scope.appHeader = result.header;
		    $scope.appFunction = result.function;
		    $scope.form = {ckey: null, level: null, template: '', ctrl_file: 'controller/'};
		    $scope.$watch('form.ckey',function(newValue, oldValue){
			    if(newValue != oldValue){
				    $scope.form.template = $scope.form.ckey+'.html';
				    $scope.form.controller = $scope.form.ckey+'Ctrl';
				    $scope.form.ctrl_file = $scope.form.ckey+'Ctrl.js';
			    }
		    });
	    });
    }else{
	    $scope.page_title = '编辑';
	    appLogic.getAppRouterInfo($stateParams.ac, function(result){
		    $scope.form = result.data;
		    $scope.form.sort = parseInt($scope.form.sort);
		    $scope.appHeader = result.header;
		    $scope.appFunction = result.function;
		    angular.forEach(result.header, function(obj){
		    	if(obj.ckey == result.data.header){
				    $scope.select.header = obj;
			    }
		    });
		    $scope.header_param = angular.fromJson(result.data.header_param);
		    $scope.headerParams = new Array;
		    angular.forEach($scope.header_param, function(obj, i){
			    $scope.headerParams.push(obj.value);
		    });
		    angular.forEach(result.function, function(obj){
		    	if(obj.ckey == result.data.function)
		    		$scope.select.function = obj;
		    });
		    $scope.function_param = angular.fromJson(result.data.function_param);
		    $scope.functionParams = new Array;
		    angular.forEach($scope.function_param, function(obj, i){
			    $scope.functionParams.push(obj.value);
		    });
		    console.log($scope.select);
		    $scope.$watch('form.ckey',function(newValue, oldValue){
			    if(newValue != oldValue){
				    $scope.form.template = $scope.form.ckey+'.html';
				    $scope.form.controller = $scope.form.ckey+'Ctrl';
				    $scope.form.ctrl_file = $scope.form.ckey+'Ctrl.js';
			    }
		    });
	    });
    }
	$scope.nextStep = function(param){
		$scope.active = param;
	};
    $scope.headerChange = function () {
	    $scope.header_param = unit.isEmpty($scope.select.header.params)?[]:angular.fromJson($scope.select.header.params);
	    $scope.form.header = $scope.select.header.ckey;
	    $scope.headerParams = new Array;
	    $scope.form.header_param = new Array;
	    angular.forEach($scope.header_param, function(obj){
	    	var ckey = (obj.ckey=='title')?obj.ckey:obj.ckey+'()';
		    $scope.headerParams.push(ckey);
		    $scope.form.header_param.push({ckey: obj.ckey, label: obj.label, value: ckey});
	    });
    }
	$scope.functionChange = function () {
		$scope.function_param = unit.isEmpty($scope.select.function.params)?[]:angular.fromJson($scope.select.function.params);
		$scope.form.function = $scope.select.function.ckey;
		$scope.form.function_param = new Array;
		angular.forEach($scope.function_param, function(obj){
			var ckey = (obj.ckey=='title')?obj.ckey:obj.ckey+'()';
			$scope.form.function_param.push({ckey: obj.ckey, label: obj.label, value: ckey});
		});
	}
    $scope.submit = function(){
	    appLogic.actionAppRouter($stateParams.ac, $scope.form);
    }
});