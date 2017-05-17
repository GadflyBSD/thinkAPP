var app = angular.module('starter.services', []);
/**
 * # service.unit 类的描述: 常用工具类
 * @class Service.unit
 * @author GadflyBSD
 */
app.factory('unit', function(){
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
		/**
		 * 判断是否是数组
		 * @param value
		 * @returns {*|boolean}
		 */
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
/**
 * # service.device 类的描述:
 * @class Service.device
 * @author GadflyBSD
 */
app.factory('device', function(unit, $window, $cordovaDevice){
	return {
		/**
		 * # 获取设备device信息
		 * @return {String} 返回JSON数据
		 */
		getDevice: function(){
			if(unit.isEmpty($window.localStorage.getItem("device"))){
				document.addEventListener("deviceready", function (){
					var device = $cordovaDevice.getDevice();
					$window.localStorage.setItem("device", JSON.stringify(device));
				});
				return JSON.parse($window.localStorage.getItem("device"));
			}
		},
		/**
		 * #获取设备UUID
		 * @return {String} 返回设备UUID数据
		 */
		getUUID: function () {
			return this.getDevice().uuid;
		},
		/**
		 * # 获取设备platform
		 * @return {String} 返回设备platform数据
		 */
		getPlatform: function(){
			return this.getDevice().platform;
		},
		/**
		 * # 获取设备version
		 * @return {String} 获取设备version数据
		 */
		getVersion: function(){
			return this.getDevice().version;
		}
	}
});
/**
 * # Service.ngSwal 类的描述
 * @class Service.ngSwal
 * @author GadflyBSD
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
			config.type = (unit.isEmptyObject(param.type))?'success':param.type.toLowerCase();
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
		 * # 用于显示可提示用户进行输入的对话框。
		 * @param {Object} param
		 * @param {String} param.type=input 弹出框类型 ['success', 'error', 'warning', 'info', 'input']
		 * @param {String} param.title=操作警告！ 弹出框标题
		 * @param {String} param.text 弹出框显示内容
		 * @param {String} param.showCancelButton=true 是否显示取消按钮
		 * @param {String} param.closeOnConfirm=false 如果希望以后点击了确认按钮后模态窗口仍然保留就设置为"false"。该参数在其他SweetAlert触发确认按钮事件时十分有用。
		 * @param {String} param.disableButtonsOnConfirm=true 是否显示取消按钮
		 * @param {String} param.animation="slide-from-top" 是否显示取消按钮
		 * @param callback
		 */
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
		/**
		 * # 关闭当前弹出框
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
		},
		/**
		 * # 底部弹出框,用来显示拍照和从相册选择选项
		 * @param Camera
		 * @param defaults
		 * @param callback
		 */
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
/**
 * # Service.imgPicker 类的描述
 * @class Service.imgPicker
 * @author GadflyBSD
 * @param {Object} defaults
 * @param {Number} defaults.quality=80 存储图像的质量，范围是[0,100]。
 * @param {Number} defaults.destinationType=1 返回图像文件的URI,当选择0时返回Base64编码字符串的图像数据
 * @param {Number} defaults.sourceType=1 设定图片来源。
 * @param {Boolean} defaults.allowEdit=true 在选择图片进行操作之前允许对其进行简单编辑。
 * @param {Number} defaults.encodingType=0 选择返回图像文件的编码方式, 默认0为JPEG, 选择1时为PNG
 * @param {Number} defaults.targetWidth=800 以像素为单位的图像缩放宽度，必须和targetHeight同时使用。
 * @param {Number} defaults.targetHeight=600 以像素为单位的图像缩放高度，必须和targetWidth同时使用。
 * @param {Number} defaults.popoverOptions=1 iOS设备弹出框的位置[ARROW_UP: 1, ARROW_DOWN: 2, ARROW_LEFT: 4, ARROW_RIGHT: 8, ARROW_ANY: 15]
 * @param {Boolean} defaults.saveToPhotoAlbum=false 是否保存进手机相册
 * @param {Number} defaults.mediaType=0 可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
 * @param {Number} defaults.cameraDirection=0 枪后摄像头类型：Back= 0,Front-facing = 1
 * @param {Boolean} defaults.correctOrientation=true 设置摄像机拍摄的图像是否为正确的方向
 */
app.factory('imgPicker', function($cordovaCamera, $cordovaBarcodeScanner, $cordovaFileTransfer, $state, configs, unit, ngSwal){
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
		quality: 80,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.CAMERA,
		allowEdit: true,
		encodingType: Camera.EncodingType.JPEG,
		targetWidth: 800,
		targetHeight: 600,
		popoverOptions: Camera.PopoverArrowDirection.ARROW_UP,
		saveToPhotoAlbum: false,
		mediaType: 0,
		cameraDirection: 0,
		correctOrientation:true
	};
	return {
		/**
		 * # 设定用户头像
		 * @param callback
		 */
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
		/**
		 * # 调用摄像头
		 * @param callback
		 */
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
		/**
		 * # 调用相册
		 * @param callback
		 */
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
		/**
		 * 拷贝照片到本地
		 * @param img
		 * @param callback
		 */
		copyPhoto: function(img, callback){
			var targetDirName = cordova.file.dataDirectory;
			return Promise.all([
				new Promise(function (resolve, reject) {
					resolveLocalFileSystemURL(img, resolve, reject);
				}),
				new Promise(function (resolve, reject) {
					resolveLocalFileSystemURL(targetDirName, resolve, reject);
				})
			]).then(function (files) {
				var sourceFile = files[0];
				var targetDir = files[1];
				sourceFile.copyTo(targetDir, sourceFile.name, function(){
					if(typeof callback == 'function') callback(targetDirName + sourceFile.name);
				}, function(error){
					console.log(error)
				});
			}, function(error){
				console.log(error);
			});
		},
		/**
		 * 上传单张照片数据
		 * @param param
		 * @param callback
		 */
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
						angular.element('div.showSweetAlert').find('div.progress-bar').css('width', width+'%');
					}
				);
			}, false);
		},
		/**
		 * 上传单张证件并进行识别
		 * @param param
		 * @param text
		 * @param options
		 * @param callback
		 */
		upload_ocr: function(param, text, options, callback){
			document.addEventListener('deviceready', function () {
				ngSwal.progress({text: text, width: 0});
				$cordovaFileTransfer.upload(configs.url.upload, param, {params: options}).then(
					function (result) {
						angular.element('div.showSweetAlert').find('span.progressText').text(text);
						angular.element('div.showSweetAlert').find('div.progress-bar').css('width', '0%');
						var response =  (result.response)?eval('(' + result.response + ')'):result;
						ngSwal.close();
						if(typeof(callback) == 'function') callback(response);
					}, function (error) {
						error.type = error;
						ngSwal.alert({title: '图片上传出错啦!', text: error.info, type: 'error'}, function(){
							ngSwal.close();
							if(typeof(callback) == 'function') callback(error);
						});
					}, function (progress) {
						var width = Math.floor(parseInt(progress.loaded) / parseInt(progress.total) * 10000)/100;
						angular.element('div.showSweetAlert').find('div.progress-bar').css('width', width+'%');
						if(width = 100) angular.element('div.showSweetAlert').find('span.progressText').text('正在识别证件');
					}
				);
			}, false);
		},
		/**
		 * 上传多张照片
		 * @param param
		 * @param text
		 * @param callback
		 */
		uploads: function(param, text, callback){
			document.addEventListener('deviceready', function(){
				var uploads = function(targetPath, num, response){
					$cordovaFileTransfer.upload(configs.url.upload, targetPath[num], {}).then(
						function (result) {
							++num;
							response.push((result.response)?eval('(' + result.response + ')'):null);
							angular.element('div.showSweetAlert').find('span.progressText').text(text + '（' + (num+1) + '/' + targetPath.length +'）');
							angular.element('div.showSweetAlert').find('div.progress-bar').css('width', '0%');
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
							angular.element('div.showSweetAlert').find('div.progress-bar').css('width', width+'%');
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
		/**
		 * 扫描二维码
		 * @param callback
		 */
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
/**
 * # Service.service 类的描述
 * @class Service.service
 * @author GadflyBSD
 */
app.factory('service', function($http, $q, $window, $ionicLoading, $state, configs, unit, device, ngSwal){
	var deferred = $q.defer();
	return {
		/**
		 * # 导入sqlite数据库
		 * @param db
		 * @param table
		 * @param {Function} on_success
		 * @param {Function} on_error
		 */
		import_sqlite: function(db, table, on_success, on_error){
			db.transaction(function (tx) {
				for (var t in table) {
					tx.executeSql('DROP TABLE IF EXISTS `'+t+'`;');
					var i = 0;
					var sql = 'CREATE TABLE IF NOT EXISTS `' + t + '`(';
					var c = 0;
					for(var key in table[t].struct) c++;
					for (var p in table[t].struct) {
						sql += '`' + p + '` ';
						if(table[t].struct[p] == 'key'){
							sql += 'INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT';
						}else{
							sql += table[t].struct[p];
						}
						i++;
						if (c != i) sql += ',';
					}
					tx.executeSql(sql + ')');
					angular.forEach(table[t].data, function (obj) {
						var key = new Array;
						var values = new Array;
						for (var k in obj) {
							key.push('?');
							values.push(obj[k]);
						}
						tx.executeSql('INSERT INTO ' + t + ' VALUES (' + key.join(', ') + ')', values);
					})
				}
			}, function (error) {
				$ionicLoading.hide();
				if(configs.debug) console.log('Import Table and Insert All Data ERROR: ' + error.message, error);
				if(typeof on_error == 'function') on_error(error);
			}, function (result) {
				$ionicLoading.hide();
				if(configs.debug) console.log('Import Table and Insert All Data Success!', result);
				if(typeof on_success == 'function') on_success(result);
			});
		},
		/**
		 * # sqlite 操作服务
		 * @param param
		 * @param {Function} on_success
		 * @param {Function} on_error
		 */
		sqlite: function (param, on_success, on_error) {
			var that = this;
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
			if(angular.isString(param.where)){
				where.push(param.where);
			}else{
				if(!unit.isEmptyObject(param.where)){
					for(var i in param.where){
						if(angular.isArray(param.where[i])) {
							switch(param.where[i][0]){
								case 'between':
									where.push(i + ' BETWEEN ? AND ?');
									val.push(param.where[i][1]);
									val.push(param.where[i][2]);
									break;
								case 'not between':
									where.push(i + ' NOT BETWEEN ? AND ?');
									val.push(param.where[i][1]);
									val.push(param.where[i][2]);
									break;
								case 'in':
									where.push(i + ' IN (' + param.where[i][1].join(', ') + ')');
									break;
								case 'not in':
									where.push(i + ' NOT IN (' + param.where[i][1].join(', ') + ')');
									break;
								default:
									where.push(i + ' ' + param.where[i][0] + ' ?');
									val.push(param.where[i][1]);
							}
						}else{
							where.push(param.where[0] + ' = ?');
							val.push(param.where[1]);
						}
					}
				}
			}
			var value = new Array;
			for(var i=0; i<field.length; i++){
				value.push('?');
			}
			var db = null;
			document.addEventListener('deviceready', function() {
				$ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
				db = window.sqlitePlugin.openDatabase({name: configs.db_name, location: 'default'});
				if(param.type == 'addAll') {
					db.transaction(function(tx){
						angular.forEach(param.data, function (obj) {
							tx.executeSql('Insert INTO ' + param.table + ' VALUES (' + value.join(', ') + ')', obj)
						});
					}), function (error) {
						$ionicLoading.hide();
						error.msg = 'Transaction inert into ' + param.table + ' All Data ERROR: ' + error.message;
						error.type = 'error';
						if(configs.debug) console.log(error);
						if(typeof on_error == 'function') on_error(error);
					}, function () {
						$ionicLoading.hide();
						var result = {
							type: 'success',
							table: param.table,
							msg: 'Populated inert into ' + param.table + ' All Data Success'
						}
						if(configs.debug) console.log(result.msg);
						if(typeof on_success == 'function') on_success(result);
					}
				}else if(param.type == 'createTable') {
					if (unit.is_array(param.table))
						for (var p in param.table) {
							that.import_sqlite(db, param.table[p], on_success, on_error);
						}
					else
						that.import_sqlite(db, param.table, on_success, on_error);
					$ionicLoading.hide();
				}else if(param.type == 'createTableFromJson'){
					that.getLocalityJson(param.file, function(json){
						that.import_sqlite(db, json, on_success, on_error);
					});
				}else{
					switch (param.type){
						case 'add':
							db.executeSql('INSERT INTO '+ param.table +' VALUES (' + value.join(', ') +')', data, function(result){
								result.type = 'success';
								result.msg = 'Insert Into '+param.table+' Success!';
								if(configs.debug) console.log(result);
								$ionicLoading.hide();
								if(typeof on_success == 'function') on_success(result);
							}, function(error){
								error.type = 'error';
								error.msg = 'Insert Into '+param.table+' Error: ' + error.message;
								if(configs.debug) console.log(error);
								$ionicLoading.hide();
								if(typeof on_error == 'function') on_error(error);
							});
							break;
						case 'save':
							var mySelect = (where.length > 0)?' WHERE '+where.join(' AND '):'';
							db.executeSql('UPDATE '+param.table+' SET '+field.join(', ') + mySelect, angular.extend(data, val), function(result){
								result.type = 'success';
								result.msg = 'UPDATE '+param.table+' Success!';
								if(configs.debug) console.log(result, mySelect, angular.extend(data, val));
								$ionicLoading.hide();
								if(typeof on_success == 'function') on_success(result);
							}, function(error){
								error.type = 'error';
								error.msg = 'UPDATE '+param.table+' Error: ' + error.message;
								if(configs.debug) console.log(error);
								$ionicLoading.hide();
								if(typeof on_error == 'function') on_error(error);
							});
							break;
						case 'del':
							var mySelect = (where.length > 0)?' WHERE '+where.join(' AND '):'';
							db.executeSql('DELETE FROM ' + param.table + mySelect, val, function(result){
								result.type = 'success';
								result.msg = 'DELETE FROM '+param.table+' Success!';
								if(configs.debug) console.log(result, mySelect, val);
								$ionicLoading.hide();
								if(typeof on_success == 'function') on_success(result);
							}, function(error){
								error.type = 'error';
								error.msg = 'DELETE FROM '+param.table+' Error: ' + error.message;
								if(configs.debug) console.log(error);
								$ionicLoading.hide();
								if(typeof on_error == 'function') on_error(error);
							});
							break;
						case 'count':
							var mySelect = (where.length > 0)?' WHERE '+where.join(' AND '):'';
							db.executeSql('SELECT COUNT(*) AS counts FROM ' + param.table + mySelect + ' LIMIT 1', val, function(result){
								var resp = {
									length: result.rows.length,
									counts: result.rows.item(0),
									type: 'success',
									msg: 'SELECT COUNT(*) FROM '+param.table+' run Success!'
								}
								if(configs.debug) console.log(result, mySelect, val);
								$ionicLoading.hide();
								if(typeof on_success == 'function') on_success(resp, result);
							}, function(error){
								error.type = 'error';
								error.msg = 'COUNT FROM '+param.table+' Error: ' + error.message;
								if(configs.debug) console.log(error);
								$ionicLoading.hide();
								if(typeof on_error == 'function') on_error(error);
							});
							break;
						case 'find':
							var mySelect = (where.length > 0)?' WHERE '+where.join(' AND '):'';
							db.executeSql('SELECT * FROM ' + param.table + mySelect + ' LIMIT 1', val, function(result){
								var resp = {
									count: result.rows.length,
									find: result.rows.item(0),
									type: 'success',
									msg: 'FIND * FROM '+param.table+' run Success!'
								}
								if(configs.debug) console.log(result, mySelect, val);
								$ionicLoading.hide();
								if(typeof on_success == 'function') on_success(resp, result);
							}, function(error){
								error.type = 'error';
								error.msg = 'FIND FROM '+param.table+' Error: ' + error.message;
								if(configs.debug) console.log(error);
								$ionicLoading.hide();
								if(typeof on_error == 'function') on_error(error);
							});
							break;
						case 'execute':
							db.executeSql(param.sql, function(result){
								result.type = 'success';
								result.msg = 'Execute "'+param.sql+'" Success!';
								if(configs.debug) console.log(result);
								$ionicLoading.hide();
								if(typeof on_success == 'function') on_success(result);
							}, function(error){
								error.type = 'error';
								error.msg = 'Execute "'+param.sql+'" Error: ' + error.message;
								if(configs.debug) console.log(error);
								$ionicLoading.hide();
								if(typeof on_error == 'function') on_error(error);
							})
							break;
						case 'SelectAlls':
							var lists= [];
							angular.forEach(param.table, function (obj, index) {
								var arr = new Object();
								var mySelect = (where.length > 0)?' WHERE '+where.join(' AND '):'';
								function resultFn(result) {
									var list = [];
									for(var i=0; i<result.rows.length; i++){
										list.push(result.rows.item(i));
									}
									console.log({table: obj, list: list});
									arr[obj] = list;
								}
								db.executeSql('SELECT * FROM ' + obj + mySelect, val, resultFn());
								console.log(arr);
							}, lists);
							console.log('Lists:', lists);
							return lists;
						case 'selectAll':
							var lists = [];
							db.transaction(function (tx){
								angular.forEach(param.table, function (obj, index) {
									var mySelect = (where.length > 0)?' WHERE '+where.join(' AND '):'';
									tx.executeSql('SELECT * FROM ' + obj + mySelect, val, function(result){
										var list = [];
										for(var i=0; i<result.rows.length; i++){
											list.push(result.rows.item(i));
										}
										lists[index] = {table: obj, list: list};
									},function(error){
										console.log('Error : ', error);
									});
								});
							}, function (error) {
								console.log('transaction error: ' + error.message);
							}, function () {
								console.log('transaction ok');
							});
							$ionicLoading.hide();
							console.log('Lists:', lists);
							return lists;
						case 'closeDB':
							db.close(function () {
								console.log("DB closed!");
							}, function (error) {
								console.log("Error closing DB:" + error.message);
							});
						default:
							var mySelect = (where.length > 0)?' WHERE '+where.join(' AND '):'';
							db.executeSql('SELECT * FROM ' + param.table + mySelect, val, function(result){
								var resp = {
									count: result.rows.length,
									list: [],
									type: 'success',
									msg: 'SELECT * FROM '+param.table+' run Success!'
								}
								for(var i=0; i<result.rows.length; i++){
									resp.list.push(result.rows.item(i));
								}
								if(configs.debug) console.log(resp, result, mySelect, val);
								$ionicLoading.hide();
								if(typeof on_success == 'function') on_success(resp, result);
							}, function(error){
								error.type = 'error';
								error.msg = 'SELECT FROM '+param.table+' Error: ' + error.message
								if(configs.debug) console.log(error);
								$ionicLoading.hide();
								if(typeof on_error == 'function') on_error(error);
							});
					}
				}
			});
		},
		/**
		 * # http数据请求服务
		 * @param mothod
		 * @param url
		 * @param param
		 */
		httpRequest: function(mothod, url, param){
			$ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
			var config = {
				url: url,
				cache: false,
				timeout: 30000,
			}
			if (!unit.isEmptyObject(param.data)) {
				param.data.uuid = device.getUUID();
			}else{
				param.data = {uuid: device.getUUID()}
			}
			param.data = JSON.stringify(param.data);
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
			$http(config).success(function(result, status, headers, config){
				if(configs.debug) console.log('XMLHttpRequest Success: ', status, result, headers, config);
				$ionicLoading.hide();
				if(unit.in_array(method.toLowerCase(), ['post', 'put'])){
					ngSwal.alert({
						text: result.msg,
						type: result.type.toLowerCase(),
						closeOnConfirm: true,
						confirmButtonText: '确定',
						showCancelButton: false,
					},function(){
						deferred.resolve(result)
					});
				}else{
					deferred.resolve(result);
				}
			}.error(function(result, status, headers, config){
				if(configs.debug) console.log('XMLHttpRequest Error: ', status, result, headers, config);
				$ionicLoading.hide();
				ngSwal.alert({
					text: 'HTTP 请求出现错误, 请与管理员联系!',
					type: 'error',
					closeOnConfirm: true,
					confirmButtonText: '确定',
					showCancelButton: false,
				},function(){
					deferred.reject(result, status, headers, config);
				});
			}));
			return deferred.promise;
		},
		/**
		 * # 读取本地JSON数据文件
		 * @param files
		 * @param {Function} on_success
		 * @param {Function} on_error
		 */
		getLocalityJson: function(files, on_success, on_error){
			$ionicLoading.show({ content: 'Loading', animation: 'fade-in', showBackdrop: true, maxWidth: 200, showDelay: 0 });
			var sourceFileName = cordova.file.applicationDirectory + files;
			resolveLocalFileSystemURL(sourceFileName, function (fileEntry) {
				fileEntry.file(function (file) {
					var reader = new FileReader();
					reader.onloadend = function() {
						$ionicLoading.hide();
						if(configs.debug) console.log('get Locality Json File Success: ', JSON.parse(this.result));
						if(typeof on_success == 'function') on_success(JSON.parse(this.result));
					};
					reader.readAsText(file);
				}, function(error){
					$ionicLoading.hide();
					if(configs.debug) console.log('get Locality Json File Error: ', error);
					if(typeof on_error == 'function') on_error(error);
				});
			});
		},
		/**
		 * # 获取网络JSON数据
		 * @param url
		 * @param {Function} callback
		 */
		getJson: function (url, callback) {
			$http({url: url, method: 'get'}).success(function(resp){
				if(typeof callback == 'function') callback(resp);
			}).error(function(error){
				console.log('Error: ', error.message);
			});
		},
		/**
		 * # restful 数据请求服务
		 * @param method
		 * @param param
		 */
		restful: function(method, param){
			this.httpRequest(method, configs.url.restful, param).then(function(result, status, headers, config){
				if(result.type == 'Success'){
					if (!unit.isEmptyObject(result.localStorage)){
						if(typeof result.localStorage == 'object'){
							for (var p in result.localStorage) {
								if(typeof result.localStorage[p] == 'string' && result.localStorage[p] == 'empty'){
									$window.localStorage.removeItem(p);
								}else{
									if(p == 'device'){
										var local = angular.extend(device.getDevice(), result.localStorage[p]);
									}else{
										var local = result.localStorage[p];
									}
									$window.localStorage.setItem(p, (typeof local == 'object') ? JSON.stringify(local) : local);
								}
							}
						}
					}
					if (!unit.isEmptyObject(result.sessionStorage)){
						if(typeof result.localStorage == 'object'){
							for (var p in result.sessionStorage) {
								if(typeof result.sessionStorage[p] == 'string' && result.sessionStorage[p] == 'empty'){
									$window.sessionStorage.removeItem(p);
								}else{
									var session = result.sessionStorage[p];
									$window.sessionStorage.setItem(p, (typeof session == 'object') ? JSON.stringify(session) : session);
								}
							}
						}
					}
				}
				deferred.resolve(result, status, headers, config);
			}, function(result, status, headers, config){
				deferred.reject(result, status, headers, config);
			});
			return deferred.promise;
		},
		/**
		 * # 获取本地Storage数据服务
		 * @return 
		 */
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
		/**
		 * 第一次数据安装设置标志
		 * @param initial
		 */
		setInitialRun: function (initial) {
			$window.localStorage.setItem("initialRun", (initial ? "true" : "false"));
		},
		/**
		 * # 判断是否是第一次APP安装
		 * @return {boolean}
		 */
		isInitialRun: function () {
			var value = $window.localStorage.getItem("initialRun") || "true";
			return value == "true";
		},
		/**
		 * # 是否设置过APP登录密码
		 * @return {*|boolean}
		 */
		isSetPassword: function(){
			return unit.isEmpty($window.localStorage.getItem("app_password"));
		},
		/**
		 * # 获取最后一次登录操作时间截
		 * @return {Number}
		 */
		getLastTimestamp: function(){
			return parseInt($window.localStorage.getItem('lastTimestamp'));
		},
		/**
		 * # 设置最后一次登录操作时间截
		 */
		setLastTimestamp: function(){
			$window.localStorage.setItem('lastTimestamp', new Date().getTime());
		},
		/**
		 * # 是否锁屏
		 * @param {Function} callback
		 */
		isLockScreen: function(callback){
			if(this.isSetPassword){
				$state.go('app.appset_password')
			}else{
				if(new Date().getTime() > (this.getLastTimestamp() + configs.timeout))
					$state.go('app.lock_screen');
				else
				if(typeof callback == 'function') callback();
			}
		}
	}
});