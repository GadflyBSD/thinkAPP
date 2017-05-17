/**
 * Created by gadflybsd on 2017/3/17.
 */
angular.module('MetronicApp').controller('dataStructureCtrl', function($scope, $state, xhr) {
	xhr.service('get', {model: 'System', module: 'getDataStructureList'}, function(resp){
		$scope.config = {
			selModel: 'rows',
			columnLines: false,
			data: resp.data.list,
			columns: resp.data.columns
		};
		$scope.sub_columns = resp.data.sub_columns;
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