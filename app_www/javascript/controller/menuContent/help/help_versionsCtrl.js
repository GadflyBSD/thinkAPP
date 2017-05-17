/**
 * # AngularJS Controller 版本说明控制器
 * @class controller.help_versionsCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('help_versionsCtrl', function($scope, $state) {
	"版本说明控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});