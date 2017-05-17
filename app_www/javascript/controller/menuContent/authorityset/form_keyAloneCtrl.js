/**
 * # AngularJS Controller 单钥匙开门权限控制器
 * @class controller.form_keyAloneCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('form_keyAloneCtrl', function($scope, $state) {
	"单钥匙开门权限控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});