/**
 * # AngularJS Controller 通信控制器管理控制器
 * @class controller.form_comSetCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('form_comSetCtrl', function($scope, $state) {
	"通信控制器管理控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});