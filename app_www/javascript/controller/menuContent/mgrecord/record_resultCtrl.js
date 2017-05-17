/**
 * # AngularJS Controller 记录查询结果控制器
 * @class controller.record_resultCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('record_resultCtrl', function($scope, $state) {
	"记录查询结果控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});