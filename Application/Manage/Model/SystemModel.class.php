<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/3/15
 * Time: 16:31
 */

namespace Manage\Model;


class SystemModel extends CommonModel{
	protected $tableName = 'manage_router';

	/**
	 * 路由列表
	 * @return array
	 */
	public function getRouterList(){
		$this->tableName = 'manage_router';
		$columns = array(
			array('index' => 'label', 'title' => '菜单名称', 'type' => 'string'),
			array('index' => 'icon', 'title' => 'ICON', 'type' => 'string', 'width' => 48),
			array('index' => 'tips', 'title' => '菜单说明(Tips)', 'type' => 'string'),
			array('index' => 'ckey', 'title' => '菜单标识', 'type' => 'string'),
			array('index' => 'router', 'title' => '路由名称', 'type' => 'string'),
			array('index' => 'views', 'title' => '视图位置', 'type' => 'string'),
			array('index' => 'controller', 'title' => '控制器名称', 'type' => 'string'),
			array('index' => 'template', 'title' => '模板文件地址', 'type' => 'string'),
			array('index' => 'controller_url', 'title' => '控制器文件地址', 'type' => 'string'),
		);
		$list = $this->curd(array(
			'type' => 'select',
			'where' => 'status=1'
		));
		return array_merge($list, array('columns' => $columns));
	}

	/**
	 * 对路由的写操作
	 * @param $param
	 * @return array
	 */
	public function actionRouter($param){
		$this->tableName = 'manage_router';
		$validate = array(
			array('cid', 'require', '路由上级菜单必须选择！'),
			array('label', 'require', '路由页面标题必须填写！'),
			array('ckey', 'require', '路由标识必须填写！'),
			array('views', 'require', '视图位置必须填写！'),
		);
		switch ($param['op']){
			case 'Insert':
				$return = $this->curd(array(
					'validate'	=> array_merge($validate, array('ckey', '', '路由标识已经存在！', 0, 'unique', 1)),
					'type'		=> 'add',
					'data'		=> $param['data'],
					'msg'		=> '路由数据添加成功！'
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
					'msg'		=> '路由数据编辑成功！'
				));
				break;
			case 'Delete':
				echo 'sdgsdgsdg';
				$where = array('id' => $param['pk']);
				$return = $this->curd(array(
					'type'		=> 'delete',
					'where'     => $where,
					'msg'		=> '路由数据删除成功！'
				));
		}
		if($return['type'] == 'Success'){
			$file =new \Think\Storage\Driver\File();
			$router= $this->getRouterList();
			if($file->put(DOC_ROOT.'/json/router.json', json_encode($router['data'])))
				return $return;
			else return array('type' => 'Error', '生成配置文件出错!');
		}else{
			return $return;
		}
	}

	public function getDataStructureList(){
		$table = M('table')->select();
		foreach ($table AS $key => $val){
			$list[$key] = $val;
			foreach (M('Attribute')->where('tid='.$val['id'])->select() AS $vo){
				$list[$key]['sold'][] = $vo;
			}
		}
		$table_columns = array(
			array('type' => 'expand', 'locked' => true),
			array('index' => 'comment', 'title' => '数据表注释', 'type' => 'string', 'width' => 120),
			array('index' => 'name', 'title' => '数据表名', 'type' => 'string', 'width' => 200),
			array('index' => 'type', 'title' => '数据表类型', 'type' => 'string', 'width' => 200),
			array('index' => 'engine', 'title' => '数据表引擎', 'type' => 'string', 'width' => 120),
			array('index' => 'charset', 'title' => '表编码字符集', 'type' => 'string', 'width' => 120),
		);
		$field_columns = array(
			array('index' => 'label', 'title' => '字段名', 'type' => 'string'),
			array('index' => 'field', 'title' => '字段定义', 'type' => 'string'),
			array('index' => 'type', 'title' => '数据类型', 'type' => 'string'),
			array('index' => 'value', 'title' => '字段默认值', 'type' => 'string'),
			array('index' => 'bound', 'title' => '约束规则', 'type' => 'string'),
			array('index' => 'extra', 'title' => '额外信息', 'type' => 'string'),
			array('index' => 'params', 'title' => '参数', 'type' => 'string'),
			array('index' => 'comment', 'title' => '字段注释', 'type' => 'string'),
		);
		return array(
			'type'  => 'Success',
			'data'  => array(
				'list'          => $list,
				'columns'       => $table_columns,
				'sub_columns'   => $field_columns
			)
		);
	}
	
	/**
	 * 创建数据库结构数据
	 * @return mixed
	 */
	public function generateDataStructure(){
		$this->tablePrefix = '';
		$db = array(
			'type'  => C('DB_TYPE'),
			'host'  => C('DB_HOST'),
			'name'  => C('DB_NAME'),
			'user'  => C('DB_USER'),
			'pswd'  => C('DB_PWD'),
			'port'  => C('DB_PORT'),
		);
		$dsn = $db['type'].'://'.$db['user'].':'.$db['pswd'].'@'.$db['host'].':'.$db['port'].'/INFORMATION_SCHEMA';
		$db_where = ' table_schema = "'.$db['name'].'"';
		$db_field = 'table_name AS name, table_type AS type, engine, table_collation AS charset, table_comment AS comment';
		$table = M('ables', 't', $dsn)->where($db_where)->field($db_field)->select();
		foreach ($table AS $key => $val){
			$tid = M('Table')->add($val);
			$table_field = array(
				'column_name'       => 'field',
				'column_comment'    => 'comment',
				'column_type'       => 'type',
				'column_default'    => 'value',
				'column_key'        => 'bound',
				'extra',
				'character_set_name'=> 'character'
			);
			$table_where = 'table_name = "'.$val['name'].'" AND table_schema = "'.$db['name'].'"';
			$return[$key] = $val;
			foreach (M('olumns', 'c', $dsn)->where($table_where)->field($table_field)->select() AS $vo){
				$vo['tid'] = $tid;
				$vo['table_name'] = $val['name'];
				$vo['label'] = empty($vo['comment'])?$vo['field']:$vo['comment'];
				M('Attribute')->add($vo);
				$return[$key]['columns'][] = $vo;
			}
		}
		return $return;
	}
}