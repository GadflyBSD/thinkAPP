/**
 * # AngularJS Controller 门锁系统设置控制器
 * @class controller.locksetCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('locksetCtrl', function($scope, $state) {
	"门锁系统设置控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});