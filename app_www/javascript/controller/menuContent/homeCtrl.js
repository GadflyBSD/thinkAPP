/**
 * # AngularJS Controller 手机App开锁控制器
 * @class controller.homeCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('homeCtrl', function($scope, $state) {
	"手机App开锁控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});