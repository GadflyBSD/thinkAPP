/**
 * Created by gadflybsd on 2017/3/31.
 */
MetronicApp.factory('appLogic', function($q, $state, xhr, ngSwal, unit){
	var deferred = $q.defer();
	return {
		getAppRouterList: function(){
			xhr.service('get', {module: 'getLists', model: 'AppRouter'}, function(result){
				deferred.resolve(result.data);
			});
			return deferred.promise;
		},
		getAppRouterSelect: function(callback){
			xhr.service('get', {model: 'appRouter', module:'getRouterSelect'}, function(result){
				if (typeof callback == 'function') callback(result);
			});
		},
		getAppRouterInfo: function(pk, callback){
			xhr.service('get', {model: 'appRouter', module:'getRouterInfo', pk: pk}, function(result){
				if (typeof callback == 'function') callback(result);
			});
		},
		delAppRouter: function (ids, callback) {
			ngSwal.confirm({text: '您真的要删除ID-'+ids+'的路由规则数据吗?'}, function(){
				xhr.service('delete', {model: 'AppRouter', module: 'del', pk: ids}, function(result){
					if (typeof callback == 'function') callback(result.data);
				});
			});
		},
		actionAppRouter: function(pk, data, back, callback){
			var method = (pk == 'add')?'post':'put';
			var goto = (unit.isEmpty(back))?'appRouter':back;
			xhr.service(method, {model: 'appRouter', module:'action', data: data, pk: pk}, function(result){
				if (typeof callback == 'function')
					callback(result);
				else
				if(result.type == 'Success') $state.go(goto, {}, { reload: true });
			});
		},
		appBuild: function(){
			xhr.service('get', {model: 'AppRouter', module: 'appBuild'}, function (result) {
				ngSwal.alert(result, function () {
					deferred.resolve(result);
				});
			});
			return deferred.promise;
		},
		getAppHeaderList: function(p, callback){
			var page = unit.isEmpty(p)?1:p;
			xhr.service('get', {model: 'AppHeader', module: 'getLists', p: page}, function (result) {
				if (typeof callback == 'function') callback(result.data);
			});
		},
		getAppHeaderInfo: function(id, callback){
			xhr.service('get', {model: 'AppHeader', module: 'getInfo', pk: id}, function(result){
				if (typeof callback == 'function') callback(result.data);
			});
			return deferred.promise;
		},
		delAppHeader: function(ids, callback){
			ngSwal.confirm({text: '您真的要删除ID-'+ids+'的APP头部样式数据吗?'}, function(){
				xhr.service('post', {model: 'AppHeader', module: 'del', pk: ids, op: 'delete'}, function(result){
					if (typeof callback == 'function') callback(result.data);
				});
			});
		},
		actionAppHeader: function(pk, data, back, callback){
			var method = (pk == 'add')?'post':'put';
			var goto = (unit.isEmpty(back))?'appHeader':back;
			xhr.service(method, {model: 'AppHeader', module:'action', data: data, pk: pk}, function(result){
				if (typeof callback == 'function')
					callback(result);
				else
					if(result.type == 'Success') $state.go(goto, {}, { reload: true });
			});
		},
		getAppFunctionList: function(p, callback){
			var page = unit.isEmpty(p)?1:p;
			xhr.service('get', {model: 'AppFunction', module: 'getLists', p: page}, function (result) {
				if (typeof callback == 'function') callback(result.data);
			});
		},
		getAppFunctionInfo: function(id, callback){
			xhr.service('get', {model: 'AppFunction', module: 'getInfo', pk: id}, function(result){
				if (typeof callback == 'function') callback(result.data);
			});
		},
		delAppFunction: function(ids, callback){
			ngSwal.confirm({text: '您真的要删除ID-'+ids+'的APP功能页面数据吗?'}, function(){
				xhr.service('post', {model: 'AppFunction', module: 'del', pk: ids, op: 'delete'}, function(result){
					if (typeof callback == 'function') callback(result.data);
				});
			});
		},
		actionAppFunction: function(pk, data, back, callback){
			var method = (pk == 'add')?'post':'put';
			var goto = (unit.isEmpty(back))?'appFunction':back;
			xhr.service(method, {model: 'AppFunction', module:'action', data: data, pk: pk}, function(result){
				if (typeof callback == 'function')
					callback(result);
				else
				if(result.type == 'Success') $state.go(goto, {}, { reload: true });
			});
		}
	}
})