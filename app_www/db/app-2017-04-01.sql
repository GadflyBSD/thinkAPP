
--
-- 数据库表结构: `gadfly_app_router`
--
DROP TABLE IF EXISTS `gadfly_app_router`;
CREATE TABLE `gadfly_app_router`(
  `id` int(11) not null  primary key auto_increment,
  `label` varchar(20) not null   ,
  `ckey` varchar(50) not null   ,
  `level` varchar(10) null   ,
  `views` varchar(50) not null   ,
  `icon` varchar(50) null   ,
  `params` varchar(250) null   ,
  `template` varchar(150) null   ,
  `ctrl_file` varchar(50) null   ,
  `controller` varchar(150) not null   ,
  `header` varchar(150) null   ,
  `header_param` varchar(250) null   ,
  `function` varchar(150) null   ,
  `function_param` varchar(150) null   ,
  `sort` int(8) null default 0  ,
  `status` tinyint(2) null default 1  
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 数据表: `gadfly_app_router` 中的数据
--
INSERT INTO `gadfly_app_router` VALUES ('1','门锁系统设置','lockset','leftMenus','tab.lockset','fa-home','null','lockset.html','locksetCtrl.js','locksetCtrl','menuPopover','\"\\\"[{\\\\\\\"ckey\\\\\\\":\\\\\\\"title\\\\\\\",\\\\\\\"label\\\\\\\":\\\\\\\"\\\\\\\\u9875\\\\\\\\u5934\\\\\\\\u6807\\\\\\\\u9898\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"title\\\\\\\"}]\\\"\"','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('2','手机App设置','appset','leftMenus','tab.appset','fa-home','null','appset.html','appsetCtrl.js','appsetCtrl','menuPopover','\"\\\"\\\\\\\"[{\\\\\\\\\\\\\\\"ckey\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"title\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"label\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\u9875\\\\\\\\\\\\\\\\u5934\\\\\\\\\\\\\\\\u6807\\\\\\\\\\\\\\\\u9898\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"value\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"title\\\\\\\\\\\\\\\"}]\\\\\\\"\\\"\"','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('3','开门权限设置','authoritySet','leftMenus','tab.authoritySet','fa-user','null','authoritySet.html','authoritySetCtrl.js','authoritySetCtrl','menuPopover','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"value\":\"title\"}]','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('4','蓝牙型应急电子钥匙权限下载','down_blueKey','leftMenus','tab.down_blueKey','fa-times-circle-o','null','down_blueKey.html','down_blueKeyCtrl.js','down_blueKeyCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('5','手机APP开门','openDoor','leftMenus','tab.openDoor','fa-lock','null','openDoor.html','openDoorCtrl.js','openDoorCtrl','menuPopover','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"value\":\"title\"}]','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('6','报警及日志管理','MG_record','leftMenus','tab.MG_record','fa-search-minus','null','MG_record.html','MG_recordCtrl.js','MG_recordCtrl','menuPopover','\"[{\\\"ckey\\\":\\\"title\\\",\\\"label\\\":\\\"\\\\u9875\\\\u5934\\\\u6807\\\\u9898\\\",\\\"value\\\":\\\"title\\\"}]\"','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('7','管理中心数据恢复控制','MC_dateRecovery','leftMenus','tab.MC_dateRecovery','fa-refresh','null','MC_dateRecovery.html','MC_dateRecoveryCtrl.js','MC_dateRecoveryCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('8','帮助','help','leftMenus','tab.help','fa-handshake-o','null','help.html','helpCtrl.js','helpCtrl','menuPopover','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"value\":\"title\"}]','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('9','App开启密码设置','appset_password','leftMenus','tab.appset_password','fa-snowflake-o','null','appset/appset_password.html','appset/appset_passwordCtrl.js','appset_passwordCtrl','menuPopover','\"[{\\\"ckey\\\":\\\"title\\\",\\\"label\\\":\\\"\\\\u9875\\\\u5934\\\\u6807\\\\u9898\\\",\\\"value\\\":\\\"title\\\"}]\"','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('10','App身份设置','appset_identity','leftMenus','tab.appset_identity','fa-users','null','appset_identity.html','appset_identityCtrl.js','appset_identityCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('11','蓝牙自动开启关闭设置','appset_bluetooth','leftMenus','tab.appset_bluetooth','fa-eye','null','appset_bluetooth.html','appset_bluetoothCtrl.js','appset_bluetoothCtrl','menuPopover','\"[{\\\"ckey\\\":\\\"title\\\",\\\"label\\\":\\\"\\\\u9875\\\\u5934\\\\u6807\\\\u9898\\\",\\\"value\\\":\\\"title\\\"}]\"','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('12','App登陆管理中心及权限获取设置','appset_loginMC ','leftMenus','tab.appset_loginMC ','fa-plane','null','appset/appset_loginMC .html','appset/appset_loginMC Ctrl.js','appset_loginMC Ctrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('13','单钥匙开门权限','form_keyAlone','leftMenus','tab.form_keyAlone','fa-qrcode','null','authorityset/form_keyAlone.html','authorityset/form_keyAloneCtrl.js','form_keyAloneCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('14','双钥匙组合开门权限','form_keyDouble','leftMenus','tab.form_keyDouble','fa-lemon-o','null','authorityset/form_keyDouble.html','authorityset/form_keyDoubleCtrl.js','form_keyDoubleCtrl','menuPopover','\"[{\\\"ckey\\\":\\\"title\\\",\\\"label\\\":\\\"\\\\u9875\\\\u5934\\\\u6807\\\\u9898\\\",\\\"value\\\":\\\"title\\\"}]\"','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('15','三钥匙组合开门权限','form_keyThree','leftMenus','tab.form_keyThree','fa-credit-card','null','authorityset/form_keyThree.html','authorityset/form_keyThreeCtrl.js','form_keyThreeCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('16','标准型应急电子钥匙开门权限','form_keyEmergency','leftMenus','tab.form_keyEmergency','fa-exclamation-triangle','null','authorityset/form_keyEmergency.html','authorityset/form_keyEmergencyCtrl.js','form_keyEmergencyCtrl','menuPopover','\"[{\\\"ckey\\\":\\\"title\\\",\\\"label\\\":\\\"\\\\u9875\\\\u5934\\\\u6807\\\\u9898\\\",\\\"value\\\":\\\"title\\\"}]\"','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('17','查询、修改、删除开门权限','form_MG','leftMenus','tab.form_MG','fa-flag-o','null','authorityset/form_MG.html','authorityset/form_MGCtrl.js','form_MGCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('18','机构管理','form_orgMG','leftMenus','tab.form_orgMG','fa-desktop','null','form_orgMG/form_orgMG.html','form_orgMG/form_orgMGCtrl.js','form_orgMGCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('19','通信控制器管理','form_comSet','leftMenus','tab.form_comSet','fa-quote-right','null','locksysset/form_comSet.html','locksysset/form_comSetCtrl.js','form_comSetCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('20','门锁管理','form_devMG','leftMenus','tab.form_devMG','fa-thumb-tack','null','locksysset/form_devMG.html','locksysset/form_devMGCtrl.js','form_devMGCtrl','null','null','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('21','开门人登记','form_opePpRegist','leftMenus','tab.form_opePpRegist','fa-bullhorn','null','locksysset/form_opePpRegist.html','locksysset/form_opePpRegistCtrl.js','form_opePpRegistCtrl','menuPopover','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"value\":\"title\"}]','null','null','0','1');
INSERT INTO `gadfly_app_router` VALUES ('22',' 钥匙登记','form_keyRegist','leftMenus','menu.form_keyRegist','fa-sitemap','null','locksysset/form_keyRegist.html','locksysset/form_keyRegistCtrl.js','form_keyRegistCtrl','menuPopover','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"value\":\"title\"}]','null','null','0','1');

--
-- 数据库表结构: `gadfly_app_header`
--
DROP TABLE IF EXISTS `gadfly_app_header`;
CREATE TABLE `gadfly_app_header`(
  `id` int(11) not null  primary key auto_increment,
  `label` varchar(20) not null   ,
  `ckey` varchar(50) not null   ,
  `tips` text null   ,
  `params` text null   ,
  `sort` int(8) not null default 0  ,
  `status` tinyint(2) not null default 1  
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 数据表: `gadfly_app_header` 中的数据
--
INSERT INTO `gadfly_app_header` VALUES ('1','左侧菜单+搜索+Popover','menuSearchPopover','左侧菜单+搜索+右侧Popover','[{\"ckey\":\"search\",\"label\":\"\\u641c\\u7d22\\u65b9\\u6cd5\\u540d\",\"$$hashKey\":\"object:88\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('2','左侧菜单+搜索','menuSearch','左侧menu按钮+搜索框','[{\"ckey\":\"search\",\"label\":\"\\u641c\\u7d22\\u65b9\\u6cd5\",\"$$hashKey\":\"object:80\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('3','搜索+右侧Popover','searchPopover','搜索框+右侧Popover按钮','[{\"ckey\":\"search\",\"label\":\"\\u641c\\u7d22\\u65b9\\u6cd5\",\"$$hashKey\":\"object:85\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('4','左侧菜单+标题+右侧Popover','menuPopover','左侧菜单+标题+右侧Popover','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"$$hashKey\":\"object:177\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('5','头像+右侧Popover','headimgPopover','头像+右侧Popover','[{\"ckey\":\"\",\"label\":\"\",\"$$hashKey\":\"object:240\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('6','左侧菜单+标题','menu','左侧菜单+标题','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"$$hashKey\":\"object:274\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('7','标题+右侧Popover','popover','标题+右侧Popover','[{\"ckey\":\"title\",\"label\":\"\\u9875\\u5934\\u6807\\u9898\",\"$$hashKey\":\"object:310\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('8','左侧菜单+一个按钮+下拉搜索框','menuOneFilterSearch','左侧菜单+一个按钮+下拉搜索框','[{\"ckey\":\"button\",\"label\":\"\\u6309\\u94ae\\u65b9\\u6cd5\",\"$$hashKey\":\"object:348\"},{\"ckey\":\"search\",\"label\":\"\\u641c\\u7d22\\u65b9\\u6cd5\",\"$$hashKey\":\"object:353\"}]','0','1');
INSERT INTO `gadfly_app_header` VALUES ('9','左侧菜单+两个按钮+下拉搜索','menuTwoFilterSearch','左侧菜单+两个按钮+下拉搜索','[{\"ckey\":\"button1th\",\"label\":\"\\u7b2c\\u4e00\\u4e2a\\u6309\\u94ae\\u65b9\\u6cd5\",\"$$hashKey\":\"object:392\"},{\"ckey\":\"button2th\",\"label\":\"\\u7b2c\\u4e8c\\u4e2a\\u6309\\u94ae\\u65b9\\u6cd5\",\"$$hashKey\":\"object:397\"},{\"ckey\":\"search\",\"label\":\"\\u641c\\u7d22\\u65b9\\u6cd5\",\"$$hashKey\":\"object:401\"}]','0','1');

--
-- 数据库表结构: `gadfly_app_function`
--
DROP TABLE IF EXISTS `gadfly_app_function`;
CREATE TABLE `gadfly_app_function`(
  `id` int(11) not null  primary key auto_increment,
  `label` varchar(20) not null   ,
  `ckey` varchar(50) not null   ,
  `tips` text null   ,
  `params` text null   ,
  `sort` int(8) not null default 0  ,
  `status` tinyint(2) not null default 1  
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 数据表: `gadfly_app_function` 中的数据
--
INSERT INTO `gadfly_app_function` VALUES ('1','用户注册页面','registerPage','注册表单提交服务请在Method服务中修改','[{\"ckey\":\"\",\"label\":\"\",\"$$hashKey\":\"object:81\"}]','0','1');
INSERT INTO `gadfly_app_function` VALUES ('2','用户登录页面','loginPage','登录表单提交服务请在Method服务中修改','[{\"ckey\":\"\",\"label\":\"\",\"$$hashKey\":\"object:108\"}]','0','1');
INSERT INTO `gadfly_app_function` VALUES ('3','实名认证页面','realnamePage','实名认证表单提交服务请在Method服务中修改','[{\"ckey\":\"\",\"label\":\"\",\"$$hashKey\":\"object:86\"}]','0','1');
