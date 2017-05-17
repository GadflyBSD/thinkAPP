/**
 * # Input 输入框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3Input
 * 
 * **页面调用方法**
 *
 *      @example
 * <bs3-input label="测试用表单元素" tips="该路由在同级中的排序序号!" type="text" name="test" ng-model="form.test"
 *      icons="fa-star"                  //所指定的表单元数图标，不指定则不按照图标形式展示
 *      required="true"                  // 是否需要验证，可以和其他表单元素进行组合验证， 例如：equired="form.level=='tabs'"
 *      pattern="pattern"                // 表单验证正则
 *      invalid="theForm.test.$invalid"  // 表单验证字段
 *  ></bs3-input>
 */
MetronicApp.directive('bs3Input', function () {
	return {
		restict: 'EA',
		replace: true,
		scope: {
			label: '@',
			tips: '@',
			name: '@',
			type: '@',
			pattern: '@',
			model: '=ngModel',
			invalid: '=invalid',
			changes: '&',
		},
		templateUrl: function(ele, attr){
			if(attr.icon){
				if(attr.invalid)
					return 'tpl/bs3-form/iconInputRequired.html';
				else
					return 'tpl/bs3-form/iconInput.html';
			}else{
				if(attr.invalid)
					return 'tpl/bs3-form/inputRequired.html';
				else
					return 'tpl/bs3-form/input.html';
			}
			return 'tpl/bs3-form/input.html';
		},
		link: function(scope, ele){
			$('input', ele).change(function(){
				scope.$apply(function(){
					scope.model = $('input', ele).val();
				});
			})
		},
		controller: function($scope){
			if(!$scope.hasOwnProperty('tips') || angular.isUndefined($scope.tips) || $scope.tips===null)
				$scope.tips = $scope.label;
			/*if($scope.hasOwnProperty('value') || !angular.isUndefined($scope.value) || $scope.value!==null || $scope.value)
			 $scope.model = $scope.default + $scope.value;*/
		}
	}
});
/**
 * # bootstrap 3 按钮指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3Button
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3Button', function () {
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		template: function(tEle, tAttr){
			return '<div class="form-group"><label class="control-label col-md-3">'+tAttr.label+'</label>' +
				'<div class="col-md-5"><div class="btn-group btn-group-devided" ng-transclude></div>'+
				'<p class="help-block">'+tAttr.tips+'</p></div></div>';
		}
	}
});
/**
 * # bootstrap 3 下啦选择框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3Select
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3Select', function ($ocLazyLoad) {
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		template: function(tEle, tAttr){
			return '<div class="form-group"><label class="control-label col-md-3">'+tAttr.label+'</label>' +
				'<div class="col-md-5"><div ng-transclude></div>'+
				'<p class="help-block">'+tAttr.tips+'</p></div></div>';
		},
		link: function(scope, element, attrs){
			element.hide();
			$ocLazyLoad.load(['javascript/plugins/bootstrap-select/css/bootstrap-select.min.css',
				'javascript/plugins/bootstrap-select/js/bootstrap-select.min.js']).then(function(){
				element.find('select').selectpicker();
				element.show();
			})
		}
	}
});
/**
 * # bootstrap 3 滑动开关指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3Switch
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3Switch', function ($ocLazyLoad) {
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		template: function(tEle, tAttr){
			return '<div class="form-group"><label class="control-label col-md-3">'+tAttr.label+'</label>' +
				'<div class="col-md-5"><div ng-transclude></div>'+
				'<p class="help-block">'+tAttr.tips+'</p></div></div>';
		},
		link: function(scope, element, attrs){
			element.hide();
			$ocLazyLoad.load(['javascript/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
				'javascript/plugins/bootstrap-switch/js/bootstrap-switch.min.js']).then(function(){
				element.find('input').bootstrapSwitch();
				element.show();
			})
		}
	}
});
/**
 * # bootstrap 3 密码输入框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3Password
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3Password', function ($ocLazyLoad) {
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		template: function(tEle, tAttr){
			return '<div class="form-group"><label class="control-label col-md-3">'+tAttr.label+'</label>' +
				'<div class="col-md-5"><div ng-transclude></div>'+
				'<p class="help-block"><input type="checkbox" id="show-password"><label for="show-password">显示密码</label> '+tAttr.tips+'</p></div></div>';
		},
		link: function(scope, element, attrs){
			element.hide();
			element.find('input:password').addClass('form-control');
			var pwstrength = {
				ui: {
					showVerdictsInsideProgressBar: true,
					verdicts: ["非常弱","一般","中等","强","非常强"]
				}
			}
			$ocLazyLoad.load(['javascript/plugins/hideshowpassword/hideshowpassword.js',
				'javascript/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js']).then(function(){
				element.find('input:password').pwstrength(pwstrength);
				element.find('div.progress').css('margin-bottom', '2px');
				var password = element.find('input:password');
				$('#show-password').change(function(){
					password.hideShowPassword($('#show-password').prop('checked'));
				});
				element.show();
			})
		}
	}
});
/**
 * # bootstrap 3 标签输入框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3Tags
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3Tags', function ($ocLazyLoad) {
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			model: '=ngModel'
		},
		template: function (tEle, tAttr) {
			return '<div class="form-group"><label class="control-label col-md-3">'+tAttr.label+'</label>' +
				'<div class="col-md-5"><input type="text" name="tags" class="form-control" placeholder="请在此处填写一个标签后回车，再添加其他标签！">' +
				'<p class="help-block">'+tAttr.tips+'</p></div></div>';
		},
		link: function(scope, element, attrs){
			if (!angular.isArray(scope.model))scope.model = [];
			var tags = element.find('input')
			element.hide();
			$ocLazyLoad.load(['javascript/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css',
				'javascript/plugins/bootstrap-tagsinput/bootstrap-tagsinput.js']).then(function(){
				tags.tagsinput();
				for (var i = 0; i < scope.model.length; i++) {
					tags.tagsinput('add', scope.model[i]);
				}
				tags.on('itemAdded', function(event) {
					if (scope.model.indexOf(event.item) === -1)
						scope.model.push(event.item);
				});
				tags.on('itemRemoved', function(event) {
					var idx = scope.model.indexOf(event.item);
					if (idx !== -1)
						scope.model.splice(idx, 1);
				});
				var prev = scope.model.slice();
				scope.$watch("model", function() {
					var added = scope.model.filter(function(i) {return prev.indexOf(i) === -1;}),
						removed = prev.filter(function(i) {return scope.model.indexOf(i) === -1;}),
						i;

					prev = scope.model.slice();

					// Remove tags no longer in binded model
					for (i = 0; i < removed.length; i++) {
						tags.tagsinput('remove', removed[i]);
					}

					// Refresh remaining tags
					tags.tagsinput('refresh');

					// Add new items in model as tags
					for (i = 0; i < added.length; i++) {
						tags.tagsinput('add', added[i]);
					}
				}, true);
				element.show();
			});
		}
	}
});
/**
 * # bootstrap 3 图标选择框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3Iconselect
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3Iconselect', function () {
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			label: '@',
			tips: '@',
			invalid: '=invalid',
			required: '=required',
			model: '=ngModel'
		},
		templateUrl: function(){
			return 'tpl/bs3-form/iconSelect.html'
		},
		controller: function($scope, $uibModal, xhr){
			$scope.tips = (angular.isUndefined($scope.tips) || $scope.tips === null)?'从 Font Awesome 4.7 图标集中选择一个图标样式':$scope.tips;
			$scope.openIconModel = function(){
				var modalInstance =$uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: function(){
						return 'tpl/bs3-form/iconModalContent.html'
					},
					controller: function($scope, $uibModalInstance){
						$scope.loading = true;
						xhr.service('get',{action: 'Restful', module: 'getFontAwesome'}, function(resp){
							$scope.icons = resp;
							$scope.loading = false;
							$scope.selectedIcon = function(dom){
								$uibModalInstance.close('fa-'+dom);
							}
							$scope.ok = function () {
								$uibModalInstance.close();
							};

							$scope.cancel = function () {
								$uibModalInstance.dismiss('cancel');
							};
						});
					}
				});
				modalInstance.result.then(function (selectedItem) {
					$scope.model = selectedItem;
				});
			}
		}
	}
});
/**
 * # bootstrap 3 树形下拉选择框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3TreeSelect
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3TreeSelect', function ($ocLazyLoad) {
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			label: '@',
			tips: '@',
			name: '@',
			nodes: '=nodes',
			invalid: '=invalid',
			required: '=required',
			model: '=ngModel',
			category: '='
		},
		templateUrl: function(ele, attr){
			if(attr.invalid)
				return 'tpl/bs3-form/treeSelectRequired.html';
			else
				return 'tpl/bs3-form/treeSelect.html';
		},
		link: function(scope, element, attrs){
			element.hide();
			$ocLazyLoad.load(['javascript/plugins/zTree_v3-master/css/metroStyle/metroStyle.css',
				'javascript/plugins/zTree_v3-master/js/jquery.ztree.core.js']).then(function(){
				var setting = {
					data: {
						simpleData: {
							enable: true,
							idKey: "id",
							pIdKey: "pId",
							rootPId: 0
						}
					},
					callback: {
						onClick: function(event, treeId, treeNode){
							scope.$apply(function(){
								scope.model = treeNode.id;
								scope.category =treeNode.ckey;
							});
							$('input[type=text]', element).val(treeNode.name);
							$("div.ztreeSelect", element).hide();
						}
					}
				};
				$.fn.zTree.init($("div.ztreeSelect", element), setting, scope.nodes);
				var isShow = false;
				function ztreeShowHide(isShow){
					if(isShow)
						$("div.ztreeSelect", element).show();
					else
						$("div.ztreeSelect", element).hide();
				}
				ztreeShowHide(isShow);
				$('input[type=text]', element).on('click', function(){
					isShow = !isShow;
					ztreeShowHide(isShow);
				});
				$(document).mouseup(function(e){
					if($(e.target).parent("#big_map").length==0){
						$("div.ztreeSelect", element).hide();
					}
				});
				element.show();
			})
		},
		controller: function($scope){
			if(!$scope.hasOwnProperty('tips') || angular.isUndefined($scope.tips) || $scope.tips===null)
				$scope.tips = $scope.label;
		}
	}
});
/**
 * # bootstrap 3 一个加减输入框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3PlusInput
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3PlusInput', function(){
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			label: '@',
			tips: '@',
			name: '@',
			model: '=ngModel'
		},
		templateUrl: function (ele, attr) {
			return 'tpl/bs3-form/plusInput.html';
		},
		link: function (scope, element, attrs) {
			var plusHtml = '<div class="input-group itemDom" style="padding-top:10px;"><input type="text" name="{{name}}" class="form-control" placeholder="请填写'+scope.label+'" />'+
					'<div class="input-group-addon"><a class="removeItem">删除</a></div></div>';
			function changeValue(){
				var value = new Array;
				$('input[type=text]', element).each(function(i, dom){
					value.push($(dom).val());
				});
				scope.$apply(function(){
					scope.model = value;
				});
			}
			function changeEvent(){
				$('.removeItem', element).on('click', function(){
					$(this).closest('div.itemDom').remove();
					changeValue();
				});
				$('input[type=text]', element).change(function () {
					changeValue()
				});
			}
			$('.addItem', element).on('click', function(){
				$('.listItem>.itemDom:last', element).after(plusHtml);
				changeEvent();
			});
			changeEvent();
		}
	}
});
/**
 * # bootstrap 3 两个加减输入框指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3PlusTwoInput
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3PlusTwoInput', function(){
	return {
		restict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			label: '@',
			tips: '@',
			params: '=',
			value: '=',
			model: '=ngModel'
		},
		templateUrl: function (ele, attr) {
			return 'tpl/bs3-form/plusTwoInput.html';
		},
		controller: function($scope){
			$scope.plusButton = function(i){
				if(i==0){
					$scope.model.push({ckey: '', label: ''})
				}else {
					for (var key = 0; key < $scope.model.length; key++) {
						if (key == i) {
							$scope.model.splice(key, 1);
							break;
						}
					}
				}
			}
		}
	}
});
/**
 * # bootstrap 3 提交按钮指令
 * Created by gadflybsd on 2017/3/10.
 * @class directives.bs3SubmitButton
 *
 * **页面调用方法**
 */
MetronicApp.directive('bs3SubmitButton', function() {
	return {
		restict: 'EA',
		replace: true,
		scope: {
			submit: '&',
			model: '=ngModel',
			invalid: '=invalid',
			ac: '=',
			module: '=',
			pk: '=',
			back: '='
		},
		templateUrl: function (ele, attr) {
			return 'tpl/bs3-form/submitButton.html';
		},
		controller: function ($scope, $state, xhr) {
			$scope.submitForm = function(){
				if(typeof $scope.model == 'object' && !angular.isUndefined($scope.ac) && !angular.isUndefined($scope.module) && !angular.isUndefined($scope.pk)){
					var back = (angular.isUndefined($scope.back) || $scope.back === null)?'home':$scope.back;
					var method = ($scope.pk == 'add')?'post':'put';
					xhr.service(method, {model: $scope.ac, module: $scope.module, pk: $scope.pk, data: $scope.model}, function(){
						$state.go(back);
					})
				}else{
					$scope.submit();
				}
			}
		}
	}
});