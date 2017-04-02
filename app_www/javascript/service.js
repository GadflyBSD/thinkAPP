/**
 * Created by gadflybsd on 2017/3/26.
 */
var app = angular.module('starter.services', []);
app.factory('unit', function(){
	var wait=60;
	return {
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
		isEmpty: function (e) {
			if(!e || angular.isUndefined(e) || e === null)
				return true;
			else
				return false;
		},
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
		in_array: function(search, array) {
			for(var i in array){
				if(array[i].toString() == search) return true;
			}
			return false;
		},
		is_array: function (value) {
			return value &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				typeof value.splice === 'function' &&
				!(value.propertyIsEnumerable('length'));
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
				for(var i=0; i<obj[i].data.length; i++){
					value.push('?');
				}
				sql.push({sql: 'INSERT INTO `' + i + '` (' + obj[i].field.join(', ') + ') VALUES (' + value.join(', ') + ');', data: obj[i].data});
			}
			return sql;
		}
	}
});
app.factory('ngSwal', function($ionicActionSheet, unit){
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
		if(unit.isEmptyObject(title)){
			switch(type){
				case 'success':
					return 'APP操作成功！';
				case 'error':
					return 'APP操作失败！';
				case 'warning':
					return 'APP操作警告！';
				case 'info':
					return 'APP操作提示！';
			}
		}else{
			return title;
		}
	}
	return {
		alert: function(param, callback){
			var config = {}
			config.type = (unit.isEmptyObject(param.type))?'success':param.type.toLowerCase();
			config.title = getTitle(config.type, param.title)
			swal(angular.extend(defaults, param, config), function(){
				if(typeof(callback) == 'function') callback();
			});
		},
		confirm: function(param, callback_ok, callback_cancel){
			var config = {}
			config.type = (unit.isEmptyObject(param.type))?'warning':param.type.toLowerCase();
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
		prompt: function (param, callback) {
			var config ={}
			config.type = (unit.isEmptyObject(param.type))?'input':param.type.toLowerCase();
			config.showCancelButton = true;
			config.closeOnConfirm= false;
			config.disableButtonsOnConfirm = true;
			config.animation = "slide-from-top";
			swal(angular.extend(defaults, config, param), function(inputValue){
				if(inputValue) if(typeof(callback) == 'function') callback(inputValue);
			});
		},
		close: function(){
			swal.close();
		},
		enableButtons: function(){
			swal.enableButtons();
		},
		disableButtons: function(){
			swal.disableButtons();
		},
		sheetCamera: function(Camera, defaults, callback){
			$ionicActionSheet.show({
				buttons: [
					{text: '拍照'},
					{text: '从相册选择'}
				],
				titleText: '选择照片',
				cancelText: '取消',
				cancel: function(){},
				buttonClicked: function(index){
					if(index == 0){
						defaults.sourceType = Camera.PictureSourceType.CAMERA;
					}else if(index == 1){
						defaults.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
					}
					if(typeof(callback) == 'function') callback(defaults);
					return true;
				}
			});
		}
	}
});
app.factory('imgPickerService', function($cordovaCamera, $cordovaBarcodeScanner, $cordovaFileTransfer, $state, configs, unit, ngSwal){
	var Camera = {
		DestinationType:{
			DATA_URL : 0,   //返回Base64编码字符串的图像数据
			FILE_URI : 1    //返回图像文件的URI
		},
		PictureSourceType: {
			PHOTOLIBRARY : 0,
			CAMERA : 1,
			SAVEDPHOTOALBUM : 2
		},
		EncodingType:{
			JPEG : 0,       // 返回JPEG格式图片
			PNG : 1         // 返回PNG格式图片
		},
		PopoverArrowDirection: {
			ARROW_UP: 1,
			ARROW_DOWN: 2,
			ARROW_LEFT: 4,
			ARROW_RIGHT: 8,
			ARROW_ANY: 15
		}
	}
	var defaults = {
		quality: 80,                                           //存储图像的质量，范围是[0,100]。
		destinationType: Camera.DestinationType.FILE_URI,       //选择返回数据的格式
		sourceType: Camera.PictureSourceType.CAMERA,            //设定图片来源。
		allowEdit: true,                                        //在选择图片进行操作之前允许对其进行简单编辑。
		encodingType: Camera.EncodingType.JPEG,                 //选择返回图像文件的编码方式
		targetWidth: 800,                                       //以像素为单位的图像缩放宽度，必须和targetHeight同时使用。
		targetHeight: 600,                                      //以像素为单位的图像缩放高度，必须和targetWidth同时使用。
		popoverOptions: Camera.PopoverArrowDirection.ARROW_UP,  //iOS设备弹出框的位置
		saveToPhotoAlbum: false,                                //保存进手机相册
		mediaType: 0,   //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
		cameraDirection: 0,                                     //枪后摄像头类型：Back= 0,Front-facing = 1
		correctOrientation:true                                 // 设置摄像机拍摄的图像是否为正确的方向
	};
	return {
		headimg: function(callback){
			ngSwal.sheetCamera(Camera, defaults, function(defaults){
				var options = {
					quality: 75,
					cameraDirection: 1,
					targetWidth: 128,
					targetHeight: 128
				}
				$cordovaCamera.getPicture(angular.extend(defaults, options)).then(
					function (imageUrl) {
						if(typeof(callback) == 'function') callback(imageUrl);
					}, function (err) {
						ngSwal.alert({title: '获取摄像机出错啦!', text: err.message, type: 'error'},
							function(){ $state.go(configs.home_url); });
					}
				);
			});
		},
		camera: function(callback){
			var options = {
				quality: 85,
				allowEdit:false,
				targetWidth: 1200,
				targetHeight: 900
			}
			$cordovaCamera.getPicture(angular.extend(defaults, options)).then(
				function (imageUrl) {
					if(typeof(callback) == 'function') callback(imageUrl);
				}, function (err) {
					ngSwal.alert({title: '获取摄像机出错啦!', text: err.message, type: 'error'},
						function(){ $state.go(configs.home_url); });
				}
			);
		},
		photo: function(callback){
			ngSwal.sheetCamera(Camera, defaults, function(defaults){
				$cordovaCamera.getPicture(defaults).then(
					function (imageUrl) {
						if(typeof(callback) == 'function') callback(imageUrl);
					}, function (err) {
						ngSwal.alert({title: '获取照片出错啦!', text: err.message, type: 'error'},
							function(){ $state.go(configs.home_url); });
					}
				);
			});
		},
		upload: function(param, callback){
			document.addEventListener('deviceready', function () {
				$cordovaFileTransfer.upload(configs.url.upload, param, {}).then(
					function (result) {
						var response = (result.response)?eval('(' + result.response + ')'):null;
						response.type = 'success';
						if(typeof(callback) == 'function') callback(response);
					}, function (error) {
						error.type = error;
						if(typeof(callback) == 'function') callback(error);
						ngSwal.alert({title: '图片上传出错啦!', text: error.info, type: 'error'},
							function(){ $state.go(configs.home_url); });
					}, function (progress) {
						var width = Math.floor(parseInt(progress.loaded) / parseInt(progress.total) * 10000)/100;
						jq('div.showSweetAlert').find('div.progress-bar').css('width', width+'%');
					}
				);
			}, false);
		},
		uploads: function(param, text, callback){
			document.addEventListener('deviceready', function(){
				var uploads = function(targetPath, num, response){
					$cordovaFileTransfer.upload(configs.url.upload, targetPath[num], {}).then(
						function (result) {
							++num;
							response.push((result.response)?eval('(' + result.response + ')'):null);
							jq('div.showSweetAlert').find('span.progressText').text(text + '（' + (num+1) + '/' + targetPath.length +'）');
							jq('div.showSweetAlert').find('div.progress-bar').css('width', '0%');
							if(num < targetPath.length){
								uploads(targetPath, num, response);
							}else{
								ngSwal.close();
								if(typeof(callback) == 'function') callback(response);
							}
						}, function (error) {
							ngSwal.alert({title: '图片上传出错啦!', text: error.info, type: 'error'},
								function(){ $state.go(configs.home_url); });
						}, function (progress) {
							var width = Math.floor(parseInt(progress.loaded) / parseInt(progress.total) * 10000)/100;
							jq('div.showSweetAlert').find('div.progress-bar').css('width', width+'%');
						}
					);
				}
				if(unit.isEmptyObject(param)){
					ngSwal.alert({text: '没有指定需要上传的图片', type: 'error'});
				}else{
					if(typeof param == 'string')
						var targetPath = new Array(param);
					else
						var targetPath = param;
					ngSwal.progress({text: text + '（1/' + targetPath.length +'）', width: 0});
					uploads(targetPath, 0, []);
				}
			}, false);
		},
		scanQR: function(callback){
			$cordovaBarcodeScanner
				.scan()
				.then(function(barcodeData) {
					if(barcodeData.format == 'QR_CODE' && barcodeData.cancelled == 0){
						if(typeof(callback) == 'function') callback(barcodeData.text);
					}
				}, function(error) {
					ngSwal.alert({title: '扫描二维码出错啦!', text: err.message, type: 'error'},
						function(){ $state.go(configs.home_url); });
				});
		}
	}
});
app.factory('service', function($http, $q, $window, $ionicLoading, $SQLite, $state, configs, unit, ngSwal){
	var deferred = $q.defer();
	return {
		sqlite: function (param) {
			var field = new Array;
			var data = new Array;
			var where = new Array;
			var val = new Array;
			if(!unit.isEmptyObject(param.data)){
				for(var i in param.data){
					field.push(i + ' = ?');
					data.push(param.data[i]);
				}
			}
			if(!unit.isEmptyObject(param.where)){
				for(var i in param.where){
					where.push(i + ' = ?');
					val.push(param.where[i]);
				}
			}
			var value = new Array;
			for(var i=0; i<field.length; i++){
				value.push('?');
			}
			var db = null;
			document.addEventListener('deviceready', function() {
				db = window.sqlitePlugin.openDatabase({name: configs.db_name, location: 'default'});
				if(param.type == 'addAll') {
					db.transaction(function(tx){
						angular.forEach(param.data, function (obj) {
							tx.executeSql('Insert INTO ' + param.table + ' VALUES (' + value.split(', ') + ')', obj)
						})
					}), function (error) {
						console.log('Transaction ERROR: ' + error.message);
						deferred.reject(error);
					}, function () {
						console.log('Populated database OK');
					}
				}else if(param.type = 'createTable'){
					function _create_table(table, data){
						db.transaction(function(tx){
							for(var t in table){
								var i = 1;
								var sql = 'CREATE TABLE IF NOT EXISTS ' + t + '(';
								for(var p in table[t]){
									sql += '`'+p+'` ';
									if(table[t][p].type = 'key'){
										sql += 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT';
									}else{
										sql =+ table[t][p].type;
										if(table[t][p].null) sql += ' NOT NULL';
										if(!angular.isUndefined(table[t][p].default)){
											if(table[t][p].default === null) sql += ' DEFAULT NULL';
											else sql += ' DEFAULT "'+ table[t][p].default + '"';
										}
									}
									i++;
									if(table[t][p].length != i) sql += ',';
								}
								tx.executeSql(sql + ')');
								angular.forEach(data[t], function(obj){
									var key = new Array;
									var values = new Array;
									for(var k in obj){
										key.push('?');
										values.push(obj[k]);
									}
									tx.executeSql('INSERT INTO '+t +' VALUES (' + key.split(', ') +')', values);
								})
							}
						}, function(error){
							console.log('Transaction ERROR: ' + error.message);
							deferred.reject(error);
						}, function(){
							console.log('Populated database OK');
						});
					}
					if(unit.is_array(param.table))
						for(var p in param.table){
							_create_table(param.table[p], param.data[p]);
						}
					else
						_create_table(param.table, param.data);
				}else{
					switch (param.type){
						case 'add':
							db.executeSql('INSERT INTO '+ param.table +' VALUES (' + value.split(', ') +')', data, function(tx, result){
								console.log('Insert Into '+param.table+' OK!');
								deferred.resolve(result);
							}, function(error){
								console.log('Insert Into '+param.table+' Error: '.error.message);
								deferred.reject(error);
							});
							break;
						case 'save':
							db.executeSql('UPDATE '+param.table+' SET '+field.split(', ')+' WHERE '+where, angular.extend(data, val), function(tx, result){
								console.log('UPDATE '+param.table+' OK!');
								deferred.resolve(result);
							}, function(error){
								console.log('UPDATE '+param.table+' Error: '.error.message);
								deferred.reject(error);
							});
							break;
						case 'del':
							db.executeSql('DELETE FROM ' + param.table + ' WHERE '+ where, val, function(tx, result){
								console.log('DELETE FROM '+param.table+' OK!');
								deferred.resolve(result);
							}, function(error){
								console.log('DELETE FROM '+param.table+' Error: '.error.message);
								deferred.reject(error);
							});
							break;
						case 'find':
							var mySelect = (where.length > 0)?' WHERE '+where:'';
							db.executeSql('SELECT * FROM ' + param.table + mySelect + ' LIMIT 1', val, function(tx, result){
								console.log('FIND FROM '+param.table+' OK!');
								deferred.resolve(result);
							}, function(error){
								console.log('FIND FROM '+param.table+' Error: '.error.message);
								deferred.reject(error);
							});
							break;
						default:
							var mySelect = (where.length > 0)?' WHERE '+where:'';
							db.executeSql('SELECT * FROM ' + param.table + mySelect, val, function(tx, result){
								console.log('FIND FROM '+param.table+' OK!');
								deferred.resolve(result);
							}, function(error){
								console.log('FIND FROM '+param.table+' Error: '.error.message);
								deferred.reject(error);
							});
					}
				}
			});
			return deferred.promise;
		},
		getJson: function (url, callback) {
			$http({url: url, method: 'get'}).success(function(resp){
				if(typeof callback == 'function') callback(resp);
			}).error(function(error){
				console.log('Error: ', error.message);
			});
		},
		restful: function(method, param){
			$ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
			var config = {
				url: configs.url.restful,
				cache: false,
				timeout: 30000,
			}
			switch(method.toLowerCase()){
				case 'get':
				case 'delete':
					config.method = method.toLowerCase();
					config.params = param;
					break;
				case 'post':
				case 'put':
				default:
					config.method = method.toLowerCase();
					config.data = param;
			}
			if (!unit.isEmptyObject(param.data)) {
				var device = JSON.parse($window.localStorage.getItem("device"));
				if(typeof param.data == 'object')
					param.data.uuid = device.uuid;
				else
					param.data = {uuid: device.uuid}
				param.data = JSON.stringify(param.data);
			}
			$http(config).success(function(resp){
				$ionicLoading.hide();
				if(resp.type == 'Success'){
					if (!unit.isEmptyObject(resp.localStorage)){
						if(typeof resp.localStorage == 'object'){
							for (var p in resp.localStorage) {
								if(typeof resp.localStorage[p] == 'string' && resp.localStorage[p] == 'empty'){
									$window.localStorage.removeItem(p);
								}else{
									if(p == 'device'){
										var device = JSON.parse($window.localStorage.getItem("device"));
										var local = angular.extend(device, resp.localStorage[p]);
									}else{
										var local = resp.localStorage[p];
									}
									$window.localStorage.setItem(p, (typeof local == 'object') ? JSON.stringify(local) : local);
								}
							}
						}
					}
					if (!unit.isEmptyObject(resp.sessionStorage)){
						if(typeof resp.localStorage == 'object'){
							for (var p in resp.sessionStorage) {
								if(typeof resp.sessionStorage[p] == 'string' && resp.sessionStorage[p] == 'empty'){
									$window.sessionStorage.removeItem(p);
								}else{
									var session = resp.sessionStorage[p];
									$window.sessionStorage.setItem(p, (typeof session == 'object') ? JSON.stringify(session) : session);
								}
							}
						}
					}
				}
				if(method.toLowerCase() == 'post'){
					ngSwal.alert({
						text: resp.msg,
						type: resp.type.toLowerCase(),
						closeOnConfirm: true,
						confirmButtonText: '确定',
						showCancelButton: false,
					},function(){
						deferred.resolve(resp)
					});
				}else{
					deferred.reject(resp);
				}
			});
			return deferred.promise;
		},
		getStorage: function(){
			var localStorage = {};
			var sessionStorage = {};
			var checkData = {};
			for(var p in $window.localStorage){
				localStorage[p] = JSON.parse($window.localStorage.getItem(p));
				if(unit.isEmptyObject(localStorage[p].md5) && unit.isEmptyObject(localStorage[p].sha1))
					checkData[p] = {md5: localStorage[p].md5, sha1: localStorage[p].sha1};
			}
			for(var p in $window.sessionStorage){
				sessionStorage[p] = JSON.parse($window.sessionStorage.getItem(p));
				if(unit.isEmptyObject(sessionStorage[p].md5) && unit.isEmptyObject(sessionStorage[p].sha1))
					checkData[p] = {md5: sessionStorage[p].md5, sha1: sessionStorage[p].sha1};
			}
			if(unit.isEmptyObject(checkData)){
				$http({
					url: url,
					cache: false,
					timeout: 30000,
					method: 'get',
					params: {action: 'Restful', module: 'getCacheData', data: checkData}
				}).success(function(resp){
					if(resp.type == 'Success'){
						if(!unit.isEmptyObject(resp.sessionStorage)){
							for (var p in resp.sessionStorage) {
								if(typeof resp.sessionStorage[p] == 'string' && resp.sessionStorage[p] == 'empty'){
									$window.sessionStorage.removeItem(p);
								}else {
									var local = resp.sessionStorage[p];
									$window.sessionStorage.setItem(p, (typeof local == 'object') ? JSON.stringify(local) : local);
								}
							}
						}
						if(!unit.isEmptyObject(resp.localStorage)){
							for (var p in resp.localStorage) {
								var local = resp.localStorage[p];
								$window.localStorage.setItem(p, (typeof local == 'object') ? JSON.stringify(local) : local);
							}
						}

					}
				});
			}
			deferred.resolve(localStorage, sessionStorage);
			return deferred.promise;
		},
		setInitialRun: function (initial) {
			$window.localStorage.setItem("initialRun", (initial ? "true" : "false"));
		},
		isInitialRun: function () {
			var value = $window.localStorage.getItem("initialRun") || "true";
			return value == "true";
		}
	}
});