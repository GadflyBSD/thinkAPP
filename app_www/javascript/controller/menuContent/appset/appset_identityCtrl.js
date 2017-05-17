/**
 * # AngularJS Controller App身份设置控制器
 * @class controller.appset_identityCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('appset_identityCtrl', function($scope, $state) {
	"App身份设置控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});