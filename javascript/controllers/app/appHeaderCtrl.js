/**
 * Created by gadflybsd on 2017/3/29.
 */
angular.module('MetronicApp').controller('appHeaderCtrl', function($rootScope, $scope, appLogic) {
	$scope.$on('$viewContentLoaded', function() {
		App.initAjax();
		$rootScope.settings.layout.pageContentWhite = true;
		$rootScope.settings.layout.pageBodySolid = false;
		$rootScope.settings.layout.pageSidebarClosed = false;
	});
	appLogic.getAppHeaderList(1, function(result){
		$scope.lists =result;
	});
	$scope.del = function(ids){
		appLogic.delAppHeader(ids, function(result){
			$scope.lists =result;
		});
	}
});