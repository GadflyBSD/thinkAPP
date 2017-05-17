/**
 * # AngularJS Controller App远程开门控制器
 * @class controller.open_remoteCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('open_remoteCtrl', function($scope, $state) {
	"App远程开门控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});