/**
 * # AngularJS Controller 帮助详情控制器
 * @class controller.help_detailCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('help_detailCtrl', function($scope, $state) {
	"帮助详情控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});