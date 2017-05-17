/**
 * # AngularJS Controller 手机App设置控制器
 * @class controller.appsetCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('appsetCtrl', function($scope, $state) {
	"手机App设置控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});