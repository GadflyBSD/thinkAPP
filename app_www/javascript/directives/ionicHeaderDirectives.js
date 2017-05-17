/**
 * # ionic APP 头部样式指令
 * Created by gadflybsd on 2017/3/29.
 * @class directives.ionicHeader
 */
var starterApp = angular.module('starter.directives', []);
starterApp.directive('ionicHeader', function() {
	"APP头部样式指令";
	return {
		restict: 'EA',
		replace: true,
		scope: {
			type: '@',
			title: '=',
			model: '=ngModel',
			search: '&'
		},
		templateUrl: function (ele, attr) {
			switch (attr.type){
				case 'menuSearchPopover':
					return 'javascript/directives/ionic_header/menu_search_popover.html';
				case 'menuSearch':
					return 'javascript/directives/ionic_header/menu_search.html';
				case 'searchPopover':
					return 'javascript/directives/ionic_header/search_popover.html';
				case 'menu_popover':
					return 'javascript/directives/ionic_header/menu_popover.html';
				case 'headimgPopover':
					return 'javascript/directives/ionic_header/headimg_popover.html';
				case 'menu':
					return 'javascript/directives/ionic_header/menu.html';
				case 'popover':
					return 'javascript/directives/ionic_header/popover.html';
				case 'menuOneFilterSearch':
					return 'javascript/directives/ionic_header/menu-one-filter-search.html';
				case 'menuTwoFilterSearch':
					return 'javascript/directives/ionic_header/menu-two-filter-search.html';
			}
		},
		controller: function($scope, $ionicPopover, $ionicSideMenuDelegate, $ionicFilterBar, $timeout, unit){
			var type = $scope.type.split("_");
			if(unit.in_array('popover', type)){
				$ionicPopover.fromTemplateUrl('right-popover.html', {
					scope: $scope
				}).then(function(popover) {
					$scope.popover = popover;
				});
				$scope.openPopover = function($event) {
					$scope.popover.show($event);
				};
				$scope.closePopover = function() {
					$scope.popover.hide();
				};
				$scope.$on('$destroy', function() {
					$scope.popover.remove();
				});
				$scope.$on('popover.hidden', function() {
					// Execute action
				});
				$scope.$on('popover.removed', function() {
					// Execute action
				});
			}
			if(unit.in_array('menu', type)){
				$scope.toggleLeftSideMenu = function() {
					$ionicSideMenuDelegate.toggleLeft();
				};
			}
			if(unit.in_array('headimg', type)){
				$scope.user = {}
			}
			if(unit.in_array('filter', type)){
				var filterBarInstance;
				$scope.showFilterBar = function () {
					filterBarInstance = $ionicFilterBar.show({
						items: $scope.items,
						cancelText: '取消',
						update: function (filteredItems, filterText) {
							$scope.items = filteredItems;
							if (filterText) {
								console.log(filterText);
							}
						}
					});
				};
				$scope.refreshItems = function () {
					if (filterBarInstance) {
						filterBarInstance();
						filterBarInstance = null;
					}
					$timeout(function () {
						$scope.$broadcast('scroll.refreshComplete');
					}, 1000);
				};
			}
		}
	}
});