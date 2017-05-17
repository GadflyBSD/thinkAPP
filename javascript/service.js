/**
 * # 这是一个Service.unit类的描述
 * @class Service.unit
 * @author GadflyBSD
 */
MetronicApp.factory('unit', function(){
	var wait=60;
	return {
		/**
		 * # 发送短信验证码服务
		 * @param ele
		 */
		sendSmsTimer: function(ele){
			if (wait == 0) {
				ele.removeAttr('disabled').text("重新获取验证码");
				wait = 60;
			} else {
				ele.attr('disabled', 'disabled').text(wait + "秒后重发验证码");
				wait--;
				setTimeout(function(){this.sendSmsTimer(ele)}, 1000)
			}
		},
		/**
		 * # 判断是否是空值
		 * @param e
		 * @returns {boolean}
		 */
		isEmpty: function (e) {
			if(!e || angular.isUndefined(e) || e === null)
				return true;
			else 
				return false;
		},
		/**
		 * # 判断是否是空对象
		 * @param e
		 * @returns {boolean}
		 */
		isEmptyObject: function(e){
			if(angular.isUndefined(e) || e === null){
				return true;
			}else{
				var t;
				for (t in e)
					return !true;
				return !false;
			}
		},
		/**
		 * # 判断[search] 是否在[array]数组中
		 * @param {String} search
		 * @param {Array} array
		 * @returns {boolean}
		 */
		in_array: function(search, array) {
			for(var i in array){
				if(array[i].toString() == search) return true;
			}
			return false;
		},
		analyze_sql: function(obj){
			var sql = new Array;
			for(var i in obj){
				sql.push('DROP TABLE IF EXISTS `'+ i +'`;')
				var temp = 'CREATE TABLE `'+ i +'` (';
				var field = new Array;
				for(var p in obj[i]){
					if(obj[i][p] == 'key'){
						field.push('`'+p+'` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT');
					}else{
						var isNull = (obj[i][p].null)?' NOT NULL':'';
						var defaults = (obj[i][p].defaults)?obj[i][p].defaults:'';
						field.push('`'+p+'` ' + obj[i][p].type + isNull + defaults);
					}
				}
				sql.push(temp + field.join(', ') + ');')
			}
			return sql;
		},
		analyze_data: function(obj){
			var sql = new Array;
			for(var i in obj){
				var value = new Array;
				obj[i].field.forEach(function(obj){
					value.push('?');
				});
				sql.push({sql: 'INSERT INTO `' + i + '` (' + obj[i].field.join(', ') + ') VALUES (' + value.join(', ') + ');', data: obj[i].data});
			}
			return sql;
		}
	}
});

/**
 * # 这是一个Service.ngSwal类的描述
 * @class Service.ngSwal
 * @param {Object} defaults
 * @param {Boolean} defaults.allowOutsideClick=false 如果设置为“true”，用户可以通过点击警告框以外的区域关闭警告框。
 * @param {String} defaults.confirmButtonColor=#DD6B55 该参数用来改变确认按钮的背景颜色（必须是一个HEX值）
 * @param {String} defaults.confirmButtonText=确定 该参数用来改变确认按钮上的文字。如果设置为"true"，那么确认按钮将自动将"Confirm"替换为"OK"。
 * @param {String} defaults.type=info 窗口的类型。有4种类型的图标动画："warning", "error", "success" 和 "info".可以将它放在"type"数组或通过第三个参数传递。
 * @param {String} defaults.title 窗口的名称。可以通过对象的"title"属性或第一个参数进行传递。
 * @param {String} defaults.text 窗口的描述。可以通过对象的"text"属性或第二个参数进行传递。
 * @param {Boolean} defaults.showCancelButton=false 如果设置为“true”，“cancel”按钮将显示，点击可以关闭警告框。
 * @param {Boolean} defaults.showConfirmButton=true 如果设置为“false”，“Confirm”按钮将不显示。
 * @param {String} defaults.cancelButtonText=取消 该参数用来改变取消按钮的文字。
 * @param {Boolean} defaults.closeOnConfirm=true 如果希望以后点击了确认按钮后模态窗口仍然保留就设置为"false"。该参数在其他SweetAlert触发确认按钮事件时十分有用。
 * @param {Number} defaults.timer 警告框自动关闭的时间。单位是ms。
 */
MetronicApp.factory('ngSwal', function(){
    var defaults = {
        allowOutsideClick: false,		// 如果设置为“true”，用户可以通过点击警告框以外的区域关闭警告框。
        confirmButtonColor: "#DD6B55",	// 该参数用来改变确认按钮的背景颜色（必须是一个HEX值）。
        confirmButtonText: "确定",		// 该参数用来改变确认按钮上的文字。如果设置为"true"，那么确认按钮将自动将"Confirm"替换为"OK"。
        type: 'info',					// 窗口的类型。有4种类型的图标动画："warning", "error", "success" 和 "info".可以将它放在"type"数组或通过第三个参数传递。
        title: null,					// 窗口的名称。可以通过对象的"title"属性或第一个参数进行传递。
        text: null,						// 窗口的描述。可以通过对象的"text"属性或第二个参数进行传递。
        showCancelButton: false,		// 如果设置为“true”，“cancel”按钮将显示，点击可以关闭警告框。
        showConfirmButton: true,		// 如果设置为“false”，“Confirm”按钮将不显示。
        cancelButtonText: '取消',		// 该参数用来改变取消按钮的文字。
        closeOnConfirm: true,			// 如果希望以后点击了确认按钮后模态窗口仍然保留就设置为"false"。该参数在其他SweetAlert触发确认按钮事件时十分有用。
        timer: null						// 警告框自动关闭的时间。单位是ms。
    }
    function getTitle(type, title){
        if(angular.isUndefined(title) || title === null){
            switch(type){
                case 'success':
                    return '操作成功！';
                case 'error':
                    return '操作失败！';
                case 'warning':
                    return '操作警告！';
                case 'info':
                    return '操作提示！';
            }
        }else{
            return title;
        }
    }
    return {
	    /**
	     * # 弹出框方法
	     * @param {Object} param
	     * @param {String} param.type=success 弹出框类型 ['success', 'error', 'warning', 'info']
	     * @param {String} param.title=操作成功！ 弹出框标题
	     * @param {String} param.text 弹出框内容
	     * @param {Function} callback
	     * 
	     * **使用范例**：
	     * 
	     *     @example
	     *     var opts={
	     *          type: "success",
	     *          title: "成功啦!",
	     *          text: "操作成功啦!"
	     *     }
	     *     ngSwal.alert(opts, function(){
	     *          //回调函数
	     *     });
	     */
        alert: function(param, callback){
            var config = {}
            config.type = (angular.isUndefined(param.type) || param.type === null)?'success':param.type.toLowerCase();
            config.title = getTitle(config.type, param.title)
            swal(angular.extend(defaults, param, config), function(){
                if(typeof(callback) == 'function') callback();
            });
        },
	    /**
	     * # 用于显示一个带有指定消息和 OK 及取消按钮的对话框。
	     * @param {Object} param
	     * @param {String} param.type=warning 弹出框类型 ['success', 'error', 'warning', 'info']
	     * @param {String} param.title=操作警告！ 弹出框标题
	     * @param {String} param.text 弹出框显示内容
	     * @param {String} param.showCancelButton=true 是否显示取消按钮
	     * @param {Function} callback
	     *
	     * **使用范例**：
	     *
	     *     @example
	     *     var opts={
	     *          type: "success",
	     *          title: "成功啦!",
	     *          text: "操作成功啦!"
	     *     }
	     *     ngSwal.confirm(opts, function(){
	     *          // 点击确定按钮所执行的回调函数
	     *     }, function(){
	     *          // 点击取消按钮所执行的回调函数
	     *     });
	     */
        confirm: function(param, callback_ok, callback_cancel){
            var config = {}
            config.type = (angular.isUndefined(param.type) || param.type === null)?'warning':param.type.toLowerCase();
            config.title = getTitle(config.type, param.title);
            config.showCancelButton = true;
            swal(angular.extend(defaults, param, config), function(isConfirm){
                if (isConfirm) {
                    if(typeof(callback_ok) == 'function') callback_ok();
                }else{
                    if(typeof(callback_cancel) == 'function') callback_cancel();
                }
            });
        },
	    /**
	     * # 用于显示一个带有进度滚动条的提示框。
	     * @param {Object} param
	     * @param {String} param.width 进度滚动条百分比
	     * @param {String} param.text 弹出框显示内容
	     *
	     * **使用范例**：
	     *
	     *     @example
	     *     var opts={
	     *          width: 25,
	     *          text: "操作成功啦!"
	     *     }
	     *     ngSwal.progress(opts);
	     */
        progress: function(param){
            var config = {
                type: 'info',
                html: true,
                title: getTitle('info'),
                text: '<h5 style="color: #797979">正在 <span class="progressText">'+param.text+'</span> 请等待！</h5><div class = "progress progress-striped active">' +
                '<div class = "progress-bar progress-bar-success" role="progressbar" style="width: '+param.width+'%;"></div></div>',
                showLoaderOnConfirm: true,
            };
            swal(angular.extend(defaults, config));
            swal.disableButtons();
        },
	    /**
	     * # 关闭弹出框
	     */
        close: function(){
            swal.close();
        },
	    /**
	     * # 打开按钮
	     */
        enableButtons: function(){
            swal.enableButtons();
        },
	    /**
	     * # 关闭按钮
	     */
        disableButtons: function(){
            swal.disableButtons();
        }
    }
});
MetronicApp.factory('xhr', function($http, $window, ngSwal) {
    var baseUrl = 'http://gadfly.cn/manage.php?s=';
    return {
        service: function (method, param, callback) {
            var config = {
                url: baseUrl + '/Restful/angular.html',
                cache: false,
                timeout: 30000,
            }
            switch (method.toLowerCase()) {
                case 'get':
                    config.method = method.toLowerCase();
                    config.params = param;
                    break;
	            case 'delete':
		            config.url = config.url + '?model='+param.model+'&module='+param.module+'&pk='+param.pk;
                case 'post':
                case 'put':
                default:
                    config.method = method.toLowerCase();
                    config.data = param;
            }
            if (!angular.isUndefined(param.data) || param.data === null) {
                /*var device = JSON.parse($window.localStorage.getItem("device"));
                if (typeof param.data == 'object')
                    param.data.uuid = device.uuid;
                else
                    param.data = {uuid: device.uuid}*/
                param.data = JSON.stringify(param.data);
            }
            return $http(config).success(function (resp) {
                if (resp.type == 'Success') {
                    if (!angular.isUndefined(resp.localStorage) || resp.localStorage !== null) {
                        if (typeof resp.localStorage == 'object') {
                            for (var p in resp.localStorage) {
                                if (typeof resp.localStorage[p] == 'string' && resp.localStorage[p] == 'empty') {
                                    $window.localStorage.removeItem(p);
                                } else {
                                    if (p == 'device') {
                                        var device = JSON.parse($window.localStorage.getItem("device"));
                                        var local = angular.extend(device, resp.localStorage[p]);
                                    } else {
                                        var local = resp.localStorage[p];
                                    }
                                    $window.localStorage.setItem(p, (typeof local == 'object') ? JSON.stringify(local) : local);
                                }
                            }
                        }
                    }
                    if (!angular.isUndefined(resp.sessionStorage) || resp.sessionStorage !== null) {
                        if (typeof resp.localStorage == 'object') {
                            for (var p in resp.sessionStorage) {
                                if (typeof resp.sessionStorage[p] == 'string' && resp.sessionStorage[p] == 'empty') {
                                    $window.sessionStorage.removeItem(p);
                                } else {
                                    var session = resp.sessionStorage[p];
                                    $window.sessionStorage.setItem(p, (typeof session == 'object') ? JSON.stringify(session) : session);
                                }
                            }
                        }
                    }
                }
                if(method.toLowerCase() == 'post' || method.toLowerCase() == 'put' || method.toLowerCase() == 'delete'){
                    ngSwal.alert({text: resp.msg, type: resp.type.toLowerCase(), closeOnConfirm: true}, function () {
                        if (typeof(callback) == 'function') callback(resp);
                    });
                } else {
                    if (typeof(callback) == 'function') callback(resp);
                }
            });
        }
    }
});
MetronicApp.factory('method', function($q, $state, xhr, ngSwal, unit){
	var deferred = $q.defer();
	return {
		getAppRouterList: function(){
			xhr.service('get', {module: 'lists', model: 'AppRouter'}, function(result){
				deferred.resolve(result.data);
			});
			return deferred.promise;
		},
		delAppRouter: function (ids) {
			ngSwal.confirm({text: '您真的要删除ID-'+ids+'的路由规则数据吗?'}, function(){
				xhr.service('delete', {model: 'AppRouter', module: 'del', pk: ids}, function(result){
					deferred.resolve(result.data);
				});
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
			xhr.service('get', {model: 'AppHeader', module: 'getList', p: page}, function (result) {
				if (typeof callback == 'function') callback(result.data);
			});
		},
		getAppHeaderInfo: function(id, callback){
			xhr.service('get', {model: 'AppHeader', module: 'getInfo', pk: id}, function(result){
				if (typeof callback == 'function') callback(result.data);
			});
			return deferred.promise;
		},
		delAppHeader: function(ids){
			ngSwal.confirm({text: '您真的要删除ID-'+ids+'的APP头部样式数据吗?'}, function(){
				xhr.service('post', {model: 'AppHeader', module: 'del', pk: ids, op: 'delete'}, function(result){
					deferred.resolve(result.data);
				});
			});
			return deferred.promise;
		},
		actionHeader: function(param, goto){
			var method = unit.isEmpty(param.id)?'post':'put';
			xhr.service(method, {model: 'AppHeader', module:'action', data: param}, function(result){
				deferred.resolve(result.data);
				if(result.type == 'Success') $state.go(goto);
			});
			return deferred.promise;
		},
		getAppFunctionList: function(p, callback){
			var page = unit.isEmpty(p)?1:p;
			xhr.service('get', {model: 'AppFunction', module: 'getList', p: page}, function (result) {
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
		actionFunction: function(param, goto){
			var method = unit.isEmpty(param.id)?'post':'put';
			xhr.service(method, {model: 'AppFunction', module:'action', data: param}, function(result){
				if(result.type == 'Success') $state.go(goto);
			});
		}
	}
})