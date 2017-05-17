<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/3/9
 * Time: 15:47
 */

namespace Manage\Model;

class AppRouterModel extends CommonModel{
	protected  $createTable = <<<EOF
CREATE TABLE `app_router` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `label` TEXT NOT NULL,
  `ckey` TEXT NOT NULL,
  `level` TEXT DEFAULT NULL,
  `views` TEXT NOT NULL,
  `icon` TEXT DEFAULT NULL,
  `params` TEXT DEFAULT NULL,
  `template` TEXT DEFAULT NULL,
  `ctrl_file` TEXT DEFAULT NULL,
  `controller` TEXT DEFAULT NULL,
  `header` TEXT DEFAULT NULL,
  `header_param` TEXT DEFAULT NULL,
  `function` TEXT DEFAULT NULL,
  `function_param` TEXT DEFAULT,
  `sort` INTEGER DEFAULT '0',
  `status` INTEGER DEFAULT '1'
);
EOF;
	
	protected $tabs_html = <<<EOF
	<ion-side-menu-content>
		<ion-tabs class="tabs-icon-top tabs-color-active-positive" ng-class="{'tabs-item-hide':hideTabs}">
		[tabs]
		</ion-tabs>
	</ion-side-menu-content>
EOF;

	protected $left_menu = <<<EOF
	<ion-side-menu side="left">
		<ion-header-bar class="bar-stable">
			<h1 class="title">Left MENU</h1>
		</ion-header-bar>
		<ion-content>
			<ion-list>
				[left]
			</ion-list>
		</ion-content>
	</ion-side-menu>
EOF;
	
	protected $right_popover = <<<EOF
	<ion-popover-view>
		<ion-header-bar class="bar-stable">
			<h1 class="title">Right MENU</h1>
		</ion-header-bar>
		<ion-content>
			<ion-list>
				[right]
			</ion-list>
		</ion-content>
	</ion-popover-view>
EOF;
	
	protected $tabs_menu = <<<EOF
<ion-side-menus enable-menu-with-back-views="true">
	[left_menu]
	[tabs_html]
</ion-side-menus>
<script id="right-popover.html" type="text/ng-template">
	[right_popover]
</script>
EOF;

	protected $template_default = <<<EOF
<ion-view view-title="{{bar_title}}" hide-nav-bar="true">
	[headerBar]
	<ion-content class="page">
		[pageDirective]
		[CONTENT]
	</ion-content>
</ion-view>
EOF;
	
	protected $template_page = <<<EOF
<ion-view view-title="{{bar_title}}">
	[headerBar]
	<ion-content class="page">
		<h2>[LABEL] 普通页面</h2>
		<hr />
        <p>This is [LABEL] Pages</p>
        [pageDirective]
		[CONTENT]
	</ion-content>
</ion-view>
EOF;
	
	protected $template_tabs_page = <<<EOF
<ion-view view-title="{{bar_title}}" hide-nav-bar="true">
	<ionic-header type="menuSearchPopover"></ionic-header>
	<ion-content class="padding has-header">
		<h2>[LABEL] TABS 页面</h2>
		<hr />
		<p>This is {{bar_title}} Pages</p>
		[CONTENT]
	</ion-content>
</ion-view>
EOF;
	
	protected $template_menu_page = <<<EOF
<ion-view view-title="{{bar_title}}" hide-nav-bar="true">
	<ion-header-bar class="bar-dark bar-positive">
		<div class="buttons buttons-left">
			<a class="button button-clear button-icon" ui-sref="tab.home">
				<i class="ion-ios-arrow-left"></i> 返回
			</a>
		</div>
		<H1 class="title">{{bar_title}}</H1>
	</ion-header-bar>
	<ion-content class="padding">
		<h2>[LABEL] MENU 页面</h2>
		<hr />
		<p>This is {{bar_title}} Left Menu Pages</p>
		[CONTENT]
	</ion-content>
</ion-view>
EOF;

	protected $controller = <<<EOF
/**
 * # AngularJS Controller [LABEL]控制器
 * @class controller.[CONTROLLER]
 * @author GadflyBSD
 */
angular.module('[APP_MODULE]').controller('[CONTROLLER]', function([scope], [state]) {
	"[LABEL]控制器";
	[scope].bar_title = [state].current.data.pageTitle;1
	[CONTENT]
});
EOF;
	
	protected $router = <<<EOF
/**
 * # AngularJS UI Router
 * @class angular.router
 * @author GadflyBSD
 */
var app = angular.module('starter.router', []);
app.config(function([stateProvider], [urlRouterProvider]) {
	[urlRouterProvider].otherwise('/app/home');
	/**
	 * # app Router
	 * @method app
	 */
	[stateProvider].state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/app.html',
		controller: function([scope], [state], [rootScope], unit){
			[scope].state = new Array();
			[rootScope].[on]('[ionicView].beforeEnter', function(){
				if(unit.in_array([state].current.name, [scope].state))
					[rootScope].hideTabs = false;
				else
					[rootScope].hideTabs = true;
			});
		}
	});
	[stateList]
});
EOF;
	
	protected $stateList = <<<EOF
	
	/**
	 * # [label] 路由配置项
	 * @method [ckey]
	 * 
	 * **配置参考**：
	 *
	 *     @example
	 *     路由State: app.[ckey];
	 *     路由Url: /[ckey];
	 *     路由数据Data: {pageTitle: '[label]'};
	 *     控制器文件路径: javascript/controller/[ctrl_file];
	 *     控制器名称: [controller];
	 *     模板文件路径: templates/[template];
	 *
	 */
	[stateProvider].state('app.[ckey]', {
		url: '/[ckey]',
		cache: false,
		data: {pageTitle: '[label]'},
		resolve: {
			des: function([ocLazyLoad]) {
				return [ocLazyLoad].load([
					'javascript/controller/[ctrl_file]'
				]);
			}
		},
		views: {
			'[views]': {
				templateUrl: function(){
					return 'templates/[template]';
				},
				controller: '[controller]'
			}
		}
	});
EOF;

	protected $ion_tab = <<<EOF

		<ion-tab title="[label]"  icon="fa [icon]" ui-sref="app.[ckey]">
			<ion-nav-view name="[views]"></ion-nav-view>
		</ion-tab>
EOF;
	
	protected $ion_left_menu = <<<EOF

			<ion-item menu-close ui-sref="app.[ckey]">
				<i class="fa [icon]"> [label]</i>
			</ion-item>
EOF;

	protected $ion_right_menu = <<<EOF

			<ion-item menu-close ui-sref="app.[ckey]">
				<i class="fa [icon]"> [label]</i>
			</ion-item>
EOF;

	
	/**
	 * App端路由列表
	 * @return mixed
	 */
	public function getLists(){
		return $this->curd(array(
			'type'  => 'select',
			'where' => 'status=1',
			'order' => 'level DESC, sort, id'
		));
	}
	/**
	 * 新增APP端路由
	 * @param $param
	 * @return array
	 */
	public function action($param){
		$validate = array(
			array('label', 'require', '路由页面标题必须填写！'),
			array('ckey', 'require', '路由标识必须填写！'),
			array('views', 'require', '视图位置必须填写！'),
		);
		if($param['data']['level'] == 'tabs'){
			if($this->_getRouterTabsNum() > 4)
				return array('type' => 'Error', 'msg' => 'App端Tabs的数量已经超过最大上限！');
			else
				$validate = array_merge($validate, array(array('icon', 'require', '作为TABS页面必须填写Icon！')));
		}
		if(is_null($param['data']['level'])) unset($param['data']['level']);
		$param['data']['header_param'] = is_null($param['data']['header_param'])?null:json_encode($param['data']['header_param']);
		switch ($param['op']){
			case 'Insert':
				$return = $this->curd(array(
					'validate'	=> array_merge($validate, array('ckey', '', '路由标识已经存在！', 0, 'unique', 1)),
					'type'		=> 'add',
					'data'		=> $param['data'],
					'msg'		=> 'APP路由数据添加成功！'
				));
				break;
			case 'Update':
				$where = array('id' => $param['pk']);
				unset($param['data']['id']);
				$return = $this->curd(array(
					'validate'	=> $validate,
					'type'		=> 'save',
					'where'     => $where,
					'data'		=> $param['data'],
					'msg'		=> 'APP路由数据编辑成功！'
				));
				break;
		}
		if($return['type'] == 'Success'){
			$build = $this->appBuild(false);
			if($build['type'] == 'Error') return $build;
			return $return;
		}else{
			return $return;
		}
	}

	/**
	 * 获取APP端路由详情数据
	 * @param $param
	 * @return array
	 */
	public function getInfo($param){
		return $this->curd(array(
			'type'		=> 'find',
			'where'     => 'id='.$param['pk'],
			'msg'		=> 'APP路由详情数据获取成功！'
		));
	}
	
	public function getRouterSelect(){
		$header = D('AppHeader')->getLists();
		$function = D('AppFunction')->getLists();
		return array(
			'type'      => 'Success',
			'header'    => $header['data'],
			'function'  => $function['data'],
		);
	}
	
	public function getRouterInfo($param){
		$return = $this->getInfo($param);
		$select = $this->getRouterSelect();
		if($return['type'] == 'Success')
			return array_merge($return, $select);
		else
			return $return;
	}

	/**
	 * 删除指定的App路由
	 * @param $param
	 * @return array
	 */
	public function del($param){
		if(isset($param['pk'])){
			return array('type' => 'Error', '没有指定需要删除的路由ID');
		}else{
			if(is_array($param['pk']))
				$where = 'id IN ('.implode(',', $param['pk']);
			elseif(is_integer($param['pk']))
				$where = 'id='.$param['pk'];
			else
				$where = 'ckey="'.$param['pk'].'"';
			$del = $this->curd(array(
				'type'		=> 'delete',
				'where'     => $where,
				'msg'		=> 'APP路由数据删除成功！'
			));
			if($del['type'] == ' Success'){
				return $this->curd(array(
					'type'  => 'select',
					'where' => 'status=1',
					'order' => 'level DESC, sort, id',
					'msg'   => 'APP路由数据删除成功！'
				));
			}else{
				return $del;
			}
		}
	}
	
	public function appBuild($param = true){
		$field = 'label, ckey, level, views, icon, params, template, ctrl_file, controller, header, header_param, function, function_param';
		$data = $this->curd(array(
			'type'  => 'select',
			'where' => 'status=1',
			'field' => $field,
		));
		//$this->createSqlite($data['data']);
		$json = $this->buildJson('app_router.json', 'app_router', $data['data'], $param);
		if($json['type'] == 'Error') return $json;
		$sql = $this->backupSql('app-'.date("Y-m-d").'.sql', array('gadfly_app_router', 'gadfly_app_header', 'gadfly_app_function'), true);
		if($sql['type'] == 'Error') return $sql;
		$tabs = $this->buildTabs($data['data'], true);
		if($tabs['type'] == 'Error') return $tabs;
		$router = $this->buildRouter($data['data'], null, true);
		if($router['type'] == 'Error') return $router;
		foreach ($data['data'] as $val) {
			$temp = $this->buildTemplate($val, true);
			if($temp['type'] == 'Error') return $temp;
			$ctrl = $this->buildController($val, true);
			if($ctrl['type'] == 'Error') return $ctrl;
		}
	}
	
	protected function createSqlite($data){
		$sqlite = $this->db(1, 'APP_SQLITE');
		$sqlite->execute('DROP TABLE IF EXISTS `app_router`;');
		$sqlite->execute($this->createTable);
		$sqlite->table('app_router')->addAll($data);
	}
	
	protected function backupSql($file, $table, $reCreate=false){
		$files = DOC_ROOT.C('APP_CONF.path').C('APP_CONF.db_path').$file;
		return $this->backupMySQL($files, $table, $reCreate);
	}

	protected function buildJson($file, $table, $data, $reCreate=false){
		$files = DOC_ROOT.C('APP_CONF.path').C('APP_CONF.json_path').$file;
		if(!fileExists($files) || $reCreate){
			$content = array(
				'table' => $table,
				'data'  => $data,
			);
			return $this->writeFile($files, json_encode($content), '配置');
		}
	}

	protected function buildTemplate($data, $reCreate=false){
		$template = ($data['level'] == 'tabs')?$data['template']:$data['views'].'/'.$data['template'];
		$files = DOC_ROOT.C('APP_CONF.path').C('APP_CONF.temp_path').$template;
		if(!fileExists($files) || $reCreate){
			if(!is_null($data['header']) || !empty($data['header'])){
				$template = $this->template_default;
				$headerBar = toUnderScore($data['header']);
				$param = array();
				foreach (json_decode($data['header_param'], true) AS $vo){
					$param[] = $vo['ckey'] .'="'.$vo['value'].'"';
				}
				$headerBar_html = '<ionic-header type="'.$headerBar.'" '.implode(' ', $param).'></ionic-header>';
			}else{
				switch ($data['level']){
					case 'tabs':
						$template = $this->template_tabs_page;
						break;
					case 'leftMenus':
					case 'rightMenus':
						$template = $this->template_menu_page;
						break;
					default:
						$template = $this->template_page;
				}
				$headerBar_html = '';
			}
			if(!is_null($data['function']) || !empty($data['function'])){
				$function = toUnderScore($data['function']);
				$param = array();
				foreach (json_decode($data['function_param']) AS $k => $vo){
					$param[] = $vo['ckey'] .'="'.$vo['value'].'"';
				}
				$function_html = '<'.$function.' '.implode(' ', $param).'"></'.$function.'>';
			}else{
				$function_html = '';
			}
			$search = array('[LABEL]', '[headerBar]', '[pageDirective]', '[CONTENT]');
			$replace = array($data['label'], $headerBar_html, $function_html, '');
			$content = str_replace($search, $replace, $template);
			return $this->writeFile($files, $content, '模板');
		}
	}
	
	protected function buildController($data, $reCreate=false){
		$ctrl_file = ($data['level'] == 'tabs')?$data['ctrl_file']:$data['views'].'/'.$data['ctrl_file'];
		$files = DOC_ROOT.C('APP_CONF.path').C('APP_CONF.js_path').'controller/'.$ctrl_file;
		if(!fileExists($files) || $reCreate){
			$search = array('[APP_MODULE]', '[CONTROLLER]', '[LABEL]', '[scope]', '[state]', '[CONTENT]');
			$replace = array(C('APP_CONF.module'), $data['controller'], $data['label'], '$scope', '$state', '');
			$content = str_replace($search, $replace, $this->controller);
			return $this->writeFile($files, $content, '控制器');
		}
	}

	protected function buildTabs($data, $reCreate=false){
		$files = DOC_ROOT.C('APP_CONF.path').C('APP_CONF.temp_path').'app.html';
		if(!fileExists($files) || $reCreate){
			$tabs = $left = $right = '';
			foreach ($data AS $val){
				if(in_array($val['level'], array('tabs', 'leftMenus', 'rightMenus'))) {
					$label = $val['label'];
					$ckey = $val['ckey'];
					$icon = $val['icon'];
					$views = $val['views'];
					switch ($val['level']) {
						case 'tabs':
							$tabs .= str_replace(array('[label]', '[icon]', '[ckey]', '[views]'), array($label, $icon, $ckey, $views), $this->ion_tab);
							break;
						case 'leftMenus':
							$left .= str_replace(array('[label]', '[icon]', '[ckey]'), array($label, $icon, $ckey), $this->ion_left_menu);
							break;
						case 'rightMenus':
							$right .= str_replace(array('[label]', '[icon]', '[ckey]'), array($label, $icon, $ckey), $this->ion_right_menu);
							break;
					}
				}
			}
			if($tabs == ''){
				$tabs_html = '<ion-side-menu-content><ion-nav-view name="menuContent" class="bg-stable"></ion-nav-view></ion-side-menu-content>';
				
			}else{
				$tabs_html = str_replace(array('[tabs]'), array($tabs), $this->tabs_html);
			}
			if($left != ''){
				$left_html = str_replace(array('[left]'), array($left), $this->left_menu);
			}else{
				$left_html = '';
			}
			if($right !=''){
				$right_popover = str_replace(array('[right]'), array($right), $this->right_popover);
			}else{
				$right_popover = '';
			}
			$content = str_replace(array('[tabs_html]', '[left_menu]', '[right_popover]'), array($tabs_html, $left_html, $right_popover), $this->tabs_menu);
			return $this->writeFile($files, $content, 'Tabs');
		}
	}

	protected function buildRouter($data, $file=null, $reCreate=false){
		if(is_null($file))
			$files = DOC_ROOT.C('APP_CONF.path').C('APP_CONF.js_path').'router.js';
		else
			$files = DOC_ROOT.C('APP_CONF.path').C('APP_CONF.js_path').$file;
		if(!fileExists($files) || $reCreate){
			$stateList = '';
			foreach($data AS $vo){
				$search = array('[stateProvider]', '[ocLazyLoad]', '[label]', '[ckey]', '[ctrl_file]', '[views]', '[template]', '[controller]');
				$replace = array(
					'$stateProvider',
					'$ocLazyLoad',
					$vo['label'],
					$vo['ckey'],
					($vo['level'] == 'tabs')?$vo['ctrl_file']:$vo['views'].'/'.$vo['ctrl_file'],
					$vo['views'],
					($vo['level'] == 'tabs')?$vo['template']:$vo['views'].'/'.$vo['template'],
					$vo['controller']
				);
				$stateList .= str_replace($search, $replace, $this->stateList);
			}
			$search = array(
				'[stateProvider]',
				'[urlRouterProvider]',
				'[scope]',
				'[state]',
				'[rootScope]',
				'[ionicSideMenuDelegate]',
				'[on]',
				'[ionicView]',
				'[stateList]',
			);
			$replace = array(
				'$stateProvider',
				'$urlRouterProvider',
				'$scope',
				'$state',
				'$rootScope',
				'$ionicSideMenuDelegate',
				'$on',
				'$ionicView',
				$stateList
			);
			$content = str_replace($search, $replace, $this->router);
			return $this->writeFile($files, $content, '路由配置');
		}
	}

	/**
	 * 获得数据库中Tabs层级的路由数量
	 * @param int $id
	 * @return int
	 */
	private function _getRouterTabsNum($id=0){
		$where = 'level="tabs" AND id <> '.$id;
		return $this->where($where)->count();
	}

}