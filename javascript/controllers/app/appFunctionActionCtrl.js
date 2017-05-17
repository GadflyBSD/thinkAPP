/**
 * Created by gadflybsd on 2017/3/29.
 */
angular.module('MetronicApp').controller('appFunctionActionCtrl', function($rootScope, $scope, $stateParams, appLogic) {
	$scope.$on('$viewContentLoaded', function () {
		App.initAjax();
		$rootScope.settings.layout.pageContentWhite = true;
		$rootScope.settings.layout.pageBodySolid = false;
		$rootScope.settings.layout.pageSidebarClosed = false;
	});
	$scope.params = {ckey: {name: 'param_key', label: '请填写参数键名'}, label: {name: 'param_label', label: '请填写参数说明'}};
	$scope.ac = $stateParams.ac;
	if($stateParams.ac == 'add'){
		$scope.form ={
			params: [{ckey: '', label: ''}], 
			sort: 0
		}
		$scope.page_title = '新增';
	}else{
		appLogic.getAppFunctionInfo($stateParams.ac, function(result){
			$scope.form = result;
			$scope.form.params = JSON.parse(result.params);
			$scope.form.sort = parseInt(result.sort);
			$scope.page_title = '编辑';
		});
	}
	$scope.submit = function(){
		appLogic.actionAppFunction($stateParams.ac, $scope.form);
	}
});