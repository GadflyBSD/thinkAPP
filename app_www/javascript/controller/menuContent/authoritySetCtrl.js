/**
 * # AngularJS Controller 开门权限设置控制器
 * @class controller.authoritySetCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('authoritySetCtrl', function($scope, $state) {
	"开门权限设置控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});