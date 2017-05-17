/**
 * # AngularJS Controller 管理中心数据恢复控制控制器
 * @class controller.MC_dateRecoveryCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('MC_dateRecoveryCtrl', function($scope, $state) {
	"管理中心数据恢复控制控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});