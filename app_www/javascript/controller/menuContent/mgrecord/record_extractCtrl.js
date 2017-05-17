/**
 * # AngularJS Controller 记录提取控制器
 * @class controller.record_extractCtrl
 * @author GadflyBSD
 */
angular.module('starter').controller('record_extractCtrl', function($scope, $state) {
	"记录提取控制器";
	$scope.bar_title = $state.current.data.pageTitle;1
	
});