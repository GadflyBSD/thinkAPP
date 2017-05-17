/**
 * # AngularJS Controller 帮助列表控制器
 * @class controller.help_listCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('help_listCtrl', function($scope, $state) {
	"帮助列表控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});