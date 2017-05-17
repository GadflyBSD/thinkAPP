/**
 * # AngularJS Controller App动态开门控制器
 * @class controller.open_dynamicCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('open_dynamicCtrl', function($scope, $state) {
	"App动态开门控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});