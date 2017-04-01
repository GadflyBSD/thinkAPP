<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/3/9
 * Time: 15:40
 */
// 检测PHP环境
if (version_compare(PHP_VERSION, '5.3.0', '<')) {
    die('require PHP > 5.3.0 !');
}

// 开启调试模式 建议开发阶段开启 部署阶段注释或者设为false
define('APP_DEBUG', true);
define('BIND_MODULE', 'Manage');

// 定义应用目录
define('APP_PATH', './Application/');
define('DOC_ROOT', dirname(__FILE__));
/**
 * 缓存目录设置
 * 此目录必须可写，建议移动到非WEB目录
 */
define ( 'RUNTIME_PATH', '../Runtime/manage.gadfly.cn/' );

// 引入ThinkPHP入口文件
require './ThinkPHP/ThinkPHP.php';