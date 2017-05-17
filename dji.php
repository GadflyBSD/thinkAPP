<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/2/8
 * Time: 10:14
 */
// 检测PHP环境
if (version_compare(PHP_VERSION, '5.3.0', '<')) {
	die('require PHP > 5.3.0 !');
}

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_DEBUG', true);
define('BIND_MODULE', 'Dji');

// 定义应用目录
define('APP_PATH', './Application/');

/**
 * 缓存目录设置
 * 此目录必须可写，建议移动到非WEB目录
 */
define ( 'RUNTIME_PATH', '../Runtime/dji.gadfly.cn/' );

// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';