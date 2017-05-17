angular.module('MetronicApp').controller('DashboardController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });
	var fact = {
		add: function(x){
			if(x <= 1) this.result = 1;
			else this.result = x * this.add(x-1);
		}
	}
	fact.add(6);
	console.log('Add: ', fact.result);
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});