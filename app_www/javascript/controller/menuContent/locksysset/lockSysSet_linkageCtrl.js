/**
 * # AngularJS Controller 门锁互锁功能控制器
 * @class controller.lockSysSet_linkageCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('lockSysSet_linkageCtrl', function($scope, $state) {
	"门锁互锁功能控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});