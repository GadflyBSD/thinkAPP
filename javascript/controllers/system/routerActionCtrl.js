/**
 * Created by gadflybsd on 2017/3/16.
 */
angular.module('MetronicApp').controller('routerActionCtrl', function($scope, $state, $stateParams, xhr) {
	$scope.ac = $stateParams.ac;
	$scope.nodes = [
		{ id:0, pId:0, name:"跟路径,顶级菜单", ckey: "home", open:true},
		{ id:1, pId:0, name:"父节点1 - 展开", open:true},
		{ id:11, pId:1, name:"父节点11 - 折叠"},
		{ id:111, pId:11, name:"叶子节点111"},
		{ id:112, pId:11, name:"叶子节点112"},
		{ id:113, pId:11, name:"叶子节点113"},
		{ id:114, pId:11, name:"叶子节点114"},
		{ id:12, pId:1, name:"父节点12 - 折叠"},
		{ id:121, pId:12, name:"叶子节点121"},
		{ id:122, pId:12, name:"叶子节点122"},
		{ id:123, pId:12, name:"叶子节点123"},
		{ id:124, pId:12, name:"叶子节点124"},
		{ id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
		{ id:2, pId:0, name:"父节点2 - 折叠"},
		{ id:21, pId:2, name:"父节点21 - 展开", open:true},
		{ id:211, pId:21, name:"叶子节点211"},
		{ id:212, pId:21, name:"叶子节点212"},
		{ id:213, pId:21, name:"叶子节点213"},
		{ id:214, pId:21, name:"叶子节点214"},
		{ id:22, pId:2, name:"父节点22 - 折叠"},
		{ id:221, pId:22, name:"叶子节点221"},
		{ id:222, pId:22, name:"叶子节点222"},
		{ id:223, pId:22, name:"叶子节点223"},
		{ id:224, pId:22, name:"叶子节点224"},
		{ id:23, pId:2, name:"父节点23 - 折叠"},
		{ id:231, pId:23, name:"叶子节点231"},
		{ id:232, pId:23, name:"叶子节点232"},
		{ id:233, pId:23, name:"叶子节点233"},
		{ id:234, pId:23, name:"叶子节点234"},
		{ id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
	];
	$scope.ac = $stateParams.ac;
	if($stateParams.ac == 'add'){
		$scope.page_title = '新增';
		$scope.form = {ckey: null, template: 'templates/', ctrl_file: 'javascript/controller/'};
		$scope.$watch('form.category',function(newValue, oldValue){
			if(newValue != oldValue){
				$scope.form.router = '/'+newValue;
			}
		});
		$scope.$watch('form.label',function(newValue, oldValue){
			if(newValue != oldValue){
				$scope.form.tips = newValue;
			}
		});
		$scope.$watch('form.ckey',function(newValue, oldValue){
			if(newValue != oldValue){
				$scope.form.controller = newValue+'Ctrl';
				$scope.form.router = '/'+$scope.form.category+'/'+newValue;
			}
		});
		$scope.$watch('form.views',function(newValue, oldValue){
			if(newValue != oldValue){
				$scope.form.template = 'templates/'+newValue+'/'+$scope.form.ckey+'.html';
				$scope.form.controller_url = 'javascript/controller/'+newValue+'/'+$scope.form.ckey+'Ctrl.js';
			}
		});
	}else{
		$scope.page_title = '编辑';
		xhr.service('get', {model: 'appRouter', module:'getInfo', pk: $stateParams.ac}, function(resp){
			$scope.form = resp.data;
		});
	}


});