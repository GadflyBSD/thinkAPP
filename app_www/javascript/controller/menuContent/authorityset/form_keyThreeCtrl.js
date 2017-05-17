/**
 * # AngularJS Controller 三钥匙组合开门权限控制器
 * @class controller.form_keyThreeCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('form_keyThreeCtrl', function($scope, $state) {
	"三钥匙组合开门权限控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});