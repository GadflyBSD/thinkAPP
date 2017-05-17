/**
 * # AngularJS Controller 帮助控制器
 * @class controller.helpCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('helpCtrl', function($scope, $state) {
	"帮助控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});