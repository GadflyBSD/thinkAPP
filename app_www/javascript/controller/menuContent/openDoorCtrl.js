/**
 * # AngularJS Controller 手机APP开门控制器
 * @class controller.openDoorCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('openDoorCtrl', function($scope, $state) {
	"手机APP开门控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});