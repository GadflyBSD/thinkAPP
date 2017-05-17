/**
 * # AngularJS Controller 报警及日志管理控制器
 * @class controller.MG_recordCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('MG_recordCtrl', function($scope, $state) {
	"报警及日志管理控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});