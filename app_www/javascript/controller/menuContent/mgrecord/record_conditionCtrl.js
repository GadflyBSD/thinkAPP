/**
 * # AngularJS Controller 开门/巡检/报警、提示 记录查询控制器
 * @class controller.record_conditionCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('record_conditionCtrl', function($scope, $state) {
	"开门/巡检/报警、提示 记录查询控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});