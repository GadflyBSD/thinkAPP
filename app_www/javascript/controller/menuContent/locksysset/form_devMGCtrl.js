/**
 * # AngularJS Controller 门锁管理控制器
 * @class controller.form_devMGCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('form_devMGCtrl', function($scope, $state) {
	"门锁管理控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});