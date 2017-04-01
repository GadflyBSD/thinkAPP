DROP TABLE IF EXISTS `gadfly_log`;
CREATE TABLE `gadfly_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0' COMMENT '用户uid',
  `related` varchar(15) DEFAULT 'user' COMMENT '关联表:wexin/user/order/withdraw等,如果没有则为NULL',
  `related_pk` int(11) NOT NULL COMMENT '关联表id或主键',
  `changes` varchar(20) DEFAULT NULL COMMENT '影响资金类型',
  `affect` decimal(11,2) DEFAULT '0.00' COMMENT '影响资金金额',
  `amount` decimal(11,2) DEFAULT '0.00' COMMENT '可用额度',
  `credits` int(11) DEFAULT '0' COMMENT '可用会员积分',
  `info` text NOT NULL COMMENT '日志说明',
  `recip` varchar(15) NOT NULL COMMENT '操作者ip',
  `remark` text COMMENT '其他备注, 用于审核说明/充值体现说明等',
  `checkuid` int(11) DEFAULT '0' COMMENT '处理人uid',
  `checkip` varchar(15) DEFAULT '0.0.0.0' COMMENT '处理人ip',
  `dateline` int(11) NOT NULL COMMENT '数据变动时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户系统日志记录表';

DROP TABLE IF EXISTS `gadfly_sms_log`;
CREATE TABLE `gadfly_sms_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0' COMMENT '用户uid',
  `uuid` varchar(32) DEFAULT NULL COMMENT 'APP端用户UUID',
  `mobile` varchar(11) NOT NULL COMMENT '接收手机号码',
  `sms_type` varchar(20) DEFAULT 'Code' COMMENT '短信类型：（Code）验证码或（Temp）模板短信',
  `actions` varchar(20) DEFAULT 'register' COMMENT '用户操作类型',
  `code` varchar(20) DEFAULT NULL COMMENT '短信验证码或者模板短信ID',
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建的日期时间',
  `dateline` int(11) NOT NULL COMMENT '记录创建的时间截',
  `res_code` int(11) NOT NULL COMMENT '发送返回代码',
  `res_message` varchar(200) DEFAULT NULL COMMENT '响应信息',
  `identifier` text COMMENT '随机短信标识',
  `create_at` int(11) DEFAULT NULL COMMENT '短信下发的Unix时间戳',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='短信发送日志';

DROP TABLE IF EXISTS `gadfly_jpush`;
CREATE TABLE `gadfly_jpush` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registration_id` varchar(64) NOT NULL COMMENT '极光推送用户RegistrationID',
  `openid` varchar(100) DEFAULT NULL COMMENT '用户微信OpenID',
  `mobile` varchar(11) DEFAULT NULL COMMENT '接收手机号码',
  `platform` varchar(20) NOT NULL COMMENT '客户手机操作系统',
  `model` varchar(20) NOT NULL COMMENT '用户手机型号',
  `version` varchar(20) NOT NULL COMMENT '手机操作系统版本',
  `app_version` varchar(20) NOT NULL COMMENT '手机APP版本',
  `uid` int(11) DEFAULT NULL COMMENT '用户UID',
  `last_login` int(11) DEFAULT NULL COMMENT '用户最后登录时间',
  `dateline` int(11) NOT NULL COMMENT '用户第一次加载时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='极光推送用户表';

DROP TABLE IF EXISTS `gadfly_app_router`;
CREATE TABLE `gadfly_app_router` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(20) NOT NULL COMMENT '路由页面标题',
  `ckey` VARCHAR(50) NOT NULL COMMENT '路由标识',
  `level` VARCHAR(10) DEFAULT NULL COMMENT '页面层级，tabs、leftMenus、 rightMenus',
  `views` VARCHAR(50) NOT NULL COMMENT '视图位置',
  `icon` VARCHAR(50) DEFAULT NULL COMMENT '当为tabs时指定图标',
  `params` VARCHAR(250) DEFAULT NULL COMMENT '路由参数',
  `template` VARCHAR(150) DEFAULT NULL COMMENT '模板地址',
  `ctrl_file` VARCHAR(50) DEFAULT NULL COMMENT '控制器名称',
  `controller` VARCHAR(150) NOT NULL COMMENT '控制器地址',
  `header` VARCHAR(150) DEFAULT NULL COMMENT '头部样式',
  `header_param` VARCHAR(250) DEFAULT NULL COMMENT '头部样式参数',
  `function` VARCHAR(150) DEFAULT NULL COMMENT '页面功能',
  `function_param` VARCHAR(150) DEFAULT NULL COMMENT '页面功能参数',
  `sort` int(8) DEFAULT 0 COMMENT '排序',
  `status` tinyint(2) DEFAULT 1 COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='APP路由信息表';
CREATE UNIQUE INDEX gadfly_app_router_ckey_uindex ON `gadfly_app_router` (`ckey`);
CREATE UNIQUE INDEX gadfly_app_router_controller_uindex ON `gadfly_app_router` (`controller`);

DROP TABLE IF EXISTS `gadfly_app_header`;
CREATE TABLE `gadfly_app_header` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(20) NOT NULL COMMENT '头部样式名称',
  `ckey` VARCHAR(50) NOT NULL COMMENT '头部样式标识',
  `tips` TEXT DEFAULT NULL COMMENT '头部样式说明',
  `params` VARCHAR(250) DEFAULT NULL COMMENT '头部样式参数',
  `sort` int(8) NOT NULL DEFAULT '0' COMMENT '头部样式排序',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='APP头部样式表';
CREATE UNIQUE INDEX gadfly_app_header_ckey_uindex ON `gadfly_app_header` (`ckey`);

DROP TABLE IF EXISTS `gadfly_app_function`;
CREATE TABLE `gadfly_app_function` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(20) NOT NULL COMMENT '功能页面名称',
  `ckey` VARCHAR(50) NOT NULL COMMENT '功能页面标识',
  `tips` TEXT DEFAULT NULL COMMENT '功能页面说明',
  `params` VARCHAR(250) DEFAULT NULL COMMENT '功能页面参数',
  `sort` int(8) NOT NULL DEFAULT '0' COMMENT '功能页面排序',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='APP功能页面';
CREATE UNIQUE INDEX gadfly_app_header_ckey_uindex ON `gadfly_app_function` (`ckey`);


DROP TABLE IF EXISTS `gadfly_member`;
CREATE TABLE `gadfly_member` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `nickname` char(16) NOT NULL DEFAULT '' COMMENT '昵称',
  `sex` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '性别',
  `qq` char(10) NOT NULL DEFAULT '' COMMENT 'qq号',
  `login` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '登录次数',
  `reg_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '注册IP',
  `reg_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  `last_login_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '最后登录IP',
  `last_login_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '会员状态',
  PRIMARY KEY (`uid`),
  KEY `status` (`status`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='后台管理员表';

DROP TABLE IF EXISTS `gadfly_auth_group`;
CREATE TABLE `gadfly_auth_group` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户组id,自增主键',
  `module` varchar(20) NOT NULL DEFAULT '' COMMENT '用户组所属模块',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '组类型',
  `title` char(20) NOT NULL DEFAULT '' COMMENT '用户组中文名称',
  `description` varchar(80) NOT NULL DEFAULT '' COMMENT '描述信息',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '用户组状态：为1正常，为0禁用,-1为删除',
  `rules` varchar(500) NOT NULL DEFAULT '' COMMENT '用户组拥有的规则id，多个规则 , 隔开',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `gadfly_group_access`;
CREATE TABLE `gadfly_group_access` (
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `group_id` mediumint(8) unsigned NOT NULL COMMENT '用户组id',
  UNIQUE KEY `uid_group_id` (`uid`,`group_id`),
  KEY `uid` (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `gadfly_auth_rule`;
CREATE TABLE `gadfly_auth_rule` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '规则id,自增主键',
  `module` varchar(20) NOT NULL COMMENT '规则所属module',
  `type` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1-url;2-主菜单',
  `name` char(80) NOT NULL DEFAULT '' COMMENT '规则唯一英文标识',
  `title` char(20) NOT NULL DEFAULT '' COMMENT '规则中文描述',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否有效(0:无效,1:有效)',
  `condition` varchar(300) NOT NULL DEFAULT '' COMMENT '规则附加条件',
  PRIMARY KEY (`id`),
  KEY `module` (`module`,`status`,`type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `gadfly_manage_router`;
CREATE TABLE `gadfly_manage_router` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned DEFAULT '0' COMMENT '上级分类ID',
  `category` VARCHAR(50) NOT NULL COMMENT '上级分类ckey',
  `label` VARCHAR(50) NOT NULL COMMENT '菜单标题',
  `tips` VARCHAR(200) NOT NULL COMMENT '菜单说明',
  `ckey` VARCHAR(50) NOT NULL COMMENT '路由标识',
  `router` VARCHAR(20) DEFAULT NULL COMMENT '路由名称',
  `views` VARCHAR(50) NOT NULL COMMENT '视图位置',
  `icon` VARCHAR(50) NOT NULL COMMENT '当为tabs时指定图标',
  `params` VARCHAR(250) DEFAULT NULL COMMENT '路由参数',
  `template` VARCHAR(150) DEFAULT NULL COMMENT '模板地址',
  `controller` VARCHAR(150) NOT NULL COMMENT '控制器名称',
  `controller_url` VARCHAR(50) DEFAULT NULL COMMENT '控制器地址',
  `sort` int(8) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='APP路由信息表';
CREATE UNIQUE INDEX gadfly_manage_router_ckey_uindex ON `gadfly_manage_router` (`ckey`);
CREATE UNIQUE INDEX gadfly_manage_router_controller_uindex ON `gadfly_manage_router` (`controller`);

DROP TABLE IF EXISTS `gadfly_picture`;
CREATE TABLE `gadfly_picture` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键id自增',
  `path` varchar(255) NOT NULL DEFAULT '' COMMENT '路径',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '图片链接',
  `md5` char(32) NOT NULL DEFAULT '' COMMENT '文件md5',
  `sha1` char(40) NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `gadfly_model`;
CREATE TABLE `gadfly_model` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '模型ID',
  `name` char(30) NOT NULL DEFAULT '' COMMENT '模型标识',
  `title` char(30) NOT NULL DEFAULT '' COMMENT '模型名称',
  `extend` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '继承的模型',
  `relation` varchar(30) NOT NULL DEFAULT '' COMMENT '继承与被继承模型的关联字段',
  `need_pk` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '新建表时是否需要主键字段',
  `field_sort` text NULL  COMMENT '表单字段排序',
  `field_group` varchar(255) NOT NULL DEFAULT '1:基础' COMMENT '字段分组',
  `attribute_list` text NULL  COMMENT '属性列表（表的字段）',
  `attribute_alias` varchar(255) NOT NULL DEFAULT '' COMMENT '属性别名定义',
  `template_list` varchar(100) NOT NULL DEFAULT '' COMMENT '列表模板',
  `template_add` varchar(100) NOT NULL DEFAULT '' COMMENT '新增模板',
  `template_edit` varchar(100) NOT NULL DEFAULT '' COMMENT '编辑模板',
  `action_tables` varchar(255) DEFAULT NULL COMMENT '新增编辑对应的数据表',
  `list_view` varchar(255) DEFAULT NULL COMMENT '列表视图',
  `list_grid` text NULL COMMENT '列表定义',
  `list_row` smallint(2) unsigned NOT NULL DEFAULT '25' COMMENT '列表数据长度',
  `search_key` varchar(50) NOT NULL DEFAULT '' COMMENT '默认搜索字段',
  `search_list` varchar(255) NOT NULL DEFAULT '' COMMENT '高级搜索的字段',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `engine_type` varchar(25) NOT NULL DEFAULT 'MyISAM' COMMENT '数据库引擎',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='文档模型表';

DROP TABLE IF EXISTS `gadfly_table`;
CREATE TABLE `gadfly_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '数据表名',
  `type` varchar(10) NOT NULL DEFAULT 'tabel' COMMENT '数据表类型: table:表,view:视图',
  `engine` varchar(15) NOT NULL DEFAULT 'tabel' COMMENT '数据表引擎',
  `charset` VARCHAR(20) NOT NULL DEFAULT 'utf8_general_ci' COMMENT '表编码字符集',
  `comment` varchar(100) NOT NULL DEFAULT 'MyISAM' COMMENT '数据表注释',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='数据库表结构表';

DROP TABLE IF EXISTS `gadfly_attribute`;
CREATE TABLE `gadfly_attribute` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tid` INT(10) NOT NULL COMMENT '表数据ID',
  `table_name` VARCHAR(100) NOT NULL COMMENT '表名',
  `label` varchar(200) NOT NULL COMMENT '字段名',
  `comment` varchar(200) NOT NULL DEFAULT '' COMMENT '字段注释',
  `field` varchar(100) NOT NULL COMMENT '字段定义',
  `type` varchar(20) NOT NULL COMMENT '数据类型',
  `value` varchar(100) DEFAULT NULL DEFAULT '' COMMENT '字段默认值',
  `bound` VARCHAR(3) DEFAULT NULL DEFAULT '' COMMENT '约束规则: PRI:主键约束, UNI唯一约束, MUL可以重复',
  `remark` varchar(100) DEFAULT NULL DEFAULT '' COMMENT '备注',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示',
  `extra` varchar(255) DEFAULT NULL DEFAULT '' COMMENT '额外信息',
  `params` VARCHAR(250) DEFAULT NULL COMMENT '参数',
  `is_must` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否必填',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态',
  `validate_rule` varchar(255) NOT NULL DEFAULT '',
  `validate_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `error_info` varchar(100) NOT NULL DEFAULT '',
  `validate_type` varchar(25) NOT NULL DEFAULT '',
  `auto_rule` varchar(100) NOT NULL DEFAULT '',
  `auto_time` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `auto_type` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='数据库字段结构表';