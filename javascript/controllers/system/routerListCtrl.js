/**
 * Created by gadflybsd on 2017/3/15.
 */
angular.module('MetronicApp').controller('routerListCtrl', function($scope, $state, xhr) {
	xhr.service('get', {model: 'System', module: 'getRouterList'}, function(resp){
		$scope.config = {
			data: resp.data,
			columns: resp.columns
		};
		$scope.action = {
			model: 'System',
			delModule: 'actionRouter',
			saveModule: 'actionRouter'
		};
		$scope.addCallback = function () {
			$state.go('systemRouterAction', {ac: 'add'});
		}
		$scope.editCallback = function (o) {
			$state.go('systemRouterAction', {ac: o.id});
		}
	})
});