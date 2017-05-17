/**
 * Created by gadflybsd on 2017/3/9.
 */
angular.module('MetronicApp').controller('appRouterCtrl', function($rootScope, $scope, appLogic) {
    $scope.$on('$viewContentLoaded', function() {
        App.initAjax();
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
	function Range(from, to) {
		this.from = from;
		this.to = to;
	}
	Range.prototype = {
		includes: function(x){
			return this.from <= x && x <= this.to;
		}
	}
	var r = new Range(1, 3);
	console.log(r);
	console.log(r.includes(5));
	appLogic.getAppRouterList().then(function(result){
	    $scope.lists = result;
    });
	$scope.del = function(ids){
		appLogic.delAppRouter(ids, function(result){
			$scope.lists = result;
		});
	}
	$scope.build = function(){
		appLogic.appBuild();
	}
});