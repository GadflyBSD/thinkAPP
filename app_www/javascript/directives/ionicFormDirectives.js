/**
 * # Ionic表单元素指令
 * Created by gadflybsd on 2017/3/26.
 * @class directives.ionicForm
 */
var starterApp = angular.module('starter.directives', []);
/**
 * # 表单input输入框
 * @method ionicInput
 */
starterApp.directive('ionicInput', function() {
	"表单input输入框";
	return {
		restict: 'EA',
		replace: true,
		scope: {
			label: '@',
			name: '@',
			type: '@',
			pattern: '@',
			model: '=ngModel',
			invalid: '=invalid',
			changes: '&',
		},
		templateUrl: function (ele, attr) {
			switch (attr.type){
				case 'mobile':
					return 'form_tpl/input_mobile.html';
				case 'text':
					return 'form_tpl/input_text.html';
			}
		}
	}
});