/**
 * Created by gadflybsd on 2017/3/15.
 */
MetronicApp.directive('fancygrid', function($ocLazyLoad, xhr, ngSwal){
	return {
		restrict: 'EA',
		scope: {
			action: '=',
			addCallback: '&',
			editCallback: '&',
			fgConfig: '=',
			sub_columns: '='
		},
		link : function(scope, element, attrs){
			element.hide();
			$ocLazyLoad.load(['node_modules/fancygrid/client/fancy.min.css', 'node_modules/fancygrid/client/fancy.full.min.js']).then(function(){
				Fancy.MODULESDIR="node_modules/fancygrid/client/modules/";
				element.attr('id', 'fancyGrid_'+new Date().getTime());
				var defaults = {
					title: {
						text: attrs.title,
						tools: [{
							text: '添加新的数据 <i class="fa fa-plus"></i>',
							type: 'button',
							handler: function (ele) {
								if(typeof scope.addCallback == 'function') scope.addCallback(ele);
							}
						}]
					},
					renderTo: element.attr('id'),
					trackOver: true,
					defaults: {
						type: 'string',
						editable: true,
						sortable: true,
						resizable: true,
						ellipsis: true,
						vtype: 'notempty'
					},
					expander: {
						render: function(renderTo, data, columnsWidth){
							new FancyGrid({
								renderTo: renderTo,
								width: columnsWidth - 20,
								theme: 'gray',
								height: 200,
								minHeight: 100,
								trackOver: true,
								selModel: 'rows',
								cellHeight: 92,
								data: data.sold,
								emptyText: 'Nothing to display',
								columns: scope.sub_columns
							});
						}
					},
					width: element.parent().width(),
					height: 590,
					i18n: 'zh-CN',
					theme: 'gray',
					selModel: 'cell',
					rowEdit: true,
					paging: {pageSize: 15,	pageSizeData: [10,15,25,50]},
					events: [{set: 'onUpdateCallback'},{remove: 'onDelCallback'}],
					onUpdateCallback: function(grid, o){
						xhr.service('put', {model: scope.action.model, module: scope.action.saveModule, pk: o.id, data:{}}, function(resp){
							console.log(resp);
						});
					},
					onDelCallback: function(grid, o){
						ngSwal.confirm({
							type: "warning",
							text: "请确认：您真的要删除此数据吗？",
							confirmButtonText: "是的，立即删除",
							closeOnConfirm: false
						},function() {
							xhr.service('post', {
								pk: o.id,
								op: 'delete',
								model: scope.action.model,
								module: scope.action.delModule,
								data: {}
							}, function (resp) {
								ngSwal.close();
							});
						});
					}
				}
				var actions = {
					type: 'action',
					title: '操作',
					items: [{
						text: '编辑',
						cls: 'btn btn-warm btn-sm',
						handler: function (grid, o) {
							if(typeof scope.editCallback == 'function') scope.editCallback(o);
						}
					}, {
						text: '删除',
						cls: 'btn btn-warm btn-sm',
						handler: function (grid, o) {
							defaults.onDelCallback(grid, o);
						}
					}]
				};
				if(scope.fgConfig || !angular.isUndefined(scope.fgConfig) || scope.fgConfig!== null || angular.isArray(scope.fgConfig)){
					var config = angular.extend(defaults, scope.fgConfig);
					//config.columns.unshift({type: 'select', locked: true});
					config.columns.push(actions);
					new FancyGrid(config);
					element.show();
				}
			});
		}
	};
});