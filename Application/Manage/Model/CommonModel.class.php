<?php
/**
 * Created by PhpStorm.
 * User: gadfly
 * Date: 2016/12/5
 * Time: 下午5:45
 */

namespace Manage\Model;
use think\Log;
use Think\Model;

class CommonModel extends Model{
	/**
	 * 发送短信验证码
	 * @param $uid
	 * @param $mobile
	 */
	public function sendSmsCode($param){
		switch($param['data']['type']){
			case 'ctc':
				Vendor('CtcSms');
				$sms = new CtcSms();
				$action = ($param['data']['action'])?$param['data']['action']:'register';
				if($action != 'register')
					$uid = 0;
				else
					$uid = is_null($param['data']['uuid'])?0:$this->uuid2uid($param['data']['uuid']);
				return $sms->send($param['data']['mobile'], $uid, $param['data']['uuid'], $action);
		}
	}

	/**
	 * 验证短信验证码
	 * @param $uid
	 * @param $mobile
	 * @param $sode
	 */
	public function checkSmsCode($mobile, $code){
		$param = array(
			'mobile'	=> $mobile,
			'code'		=> $code,
		);
		if($this->_validatorSmsCode($param, 'refresh'))
			return array('type' => 'Success', 'msg' => '短信验证码验证成功！');
		else
			return array('type' => 'Error', 'msg' => '短信验证码验证失败！');
	}

	/**
	 * 通过用户所提供的uuid获得用户uid
	 * @param $uuid
	 *
	 * @return mixed
	 */
	protected function uuid2uid($uuid){
		return M('MustachUser')->where('uuid="'.$uuid.'"')->getField('id');
	}
	
	protected function uuid2mobile($uuid){
		return M('MustachUser')->where('uuid="'.$uuid.'"')->getField('mobile');
	}

	/**
	 * 通过用户所提供的mobile获得用户uid
	 * @param $mobile
	 *
	 * @return mixed
	 */
	protected function mobile2uid($mobile){
		return M('MustachUser')->where('mobile="'.$mobile.'"')->getField('uid');
	}

	protected function renewPush($param){
		if(!is_null($param['jpush'])){
			$data = array(
				'registration_id'	=> $param['jpush'],
				'platform'			=> $param['platform'],
				'model'				=> $param['model'],
				'version'			=> $param['version'],
				'app_version'		=> $param['app_version'],
				'uid'				=> $param['uid'],
				'mobile'			=> $param['mobile'],
				'is_bindweixin'		=> $param['is_bindweixin'],
				'is_bindweibo'		=> $param['is_bindweibo'],
				'is_bindqq'			=> $param['is_bindqq'],
				'is_realname'		=> $param['is_realname'],
				'is_engineer'		=> $param['is_engineer'],
				'dateline'			=> time(),
			);
			$where = 'registration_id="'.$param['jpush'].'"';
			if(M('MustachJpush')->where($where)->count()==0){
				$curd = $this->curd(array(
					'type'  => 'add',
					'model' => 'MustachJpush',
					'data'  => $data,
					'msg'	=> '成功新建推送用户！',
				));
			}else{
				$curd = $this->curd(array(
					'type'	=> 'save',
					'model'	=> 'MustachJpush',
					'where'	=> $where,
					'data'	=> $data,
					'msg'	=> '成功更新已有推送有用！'
				));
			}
			return $curd;
		}
	}

	protected function validators($array=array()){
		foreach($array AS $val){
			$debug = $val;
			if(!$this->validator($val['type'], $val['value'], $val['rule'])){
				$debug['sql'] = M()->getLastSql();
				$return =  array('type' => 'Error', 'msg' => $val['msg']);
				return (APP_DEBUG)?array_merge($return, array('debug' => $debug)):$return;
			}
		}
		$return = array('type' => 'Success', 'param' => $array);
		return (APP_DEBUG)?array_merge($return, array('debug' => $debug)):$return;
	}

	/**
	 * 数据验证方法
	 * @param       $type
	 * @param       $value
	 * @param array $rule
	 *
	 * @return bool
	 */
	public function validator($type, $value, $rule=array()){
		switch($type){
			case 'require':
				return preg_match('/.+/', $value);
			case 'email':
				$preg = "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";
				return preg_match($preg, $value);
			case 'url':
				$preg = "/^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/";
				return preg_match($preg, $value);
			case 'realname':
				if(utf8_strlen($value) > 5)
					return false;
				else
					return preg_match("/^([\x81-\xfe][\x40-\xfe]){4,10}/", $value);
			case 'mobile':
				return preg_match('/^1[1|3|4|5|7|8][0-9]\d{8}$/', $value)?true:false;
			case 'password':
				$pattern = '/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/';
				return (preg_match($pattern, $value))?true:false;
			case 'idcard':
				return validateIdcard($value);
			case 'zip':
				return preg_match('/^\d{6}$/', $value);
			case 'chinese':
				return preg_match('/[\x7f-\xff]/', $value);
			case 'english':
				return preg_match('/^[A-Za-z]+$/', $value);
			case 'is_uuid':
				return preg_match('/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/', $value);
			case 'isBankSN':
				return preg_match('/^(\d{16}|\d{19})$/', $value);
			case 'number':
				return preg_match('/^\d+$/', $value);
			case 'integer':
				return preg_match("/^[0-9]*[1-9][0-9]*$/", $value);
			case 'double':
				return ($value>0 && preg_match("/^\\d+(\\.\\d+)?$/", $value));
			case 'in': // 验证是否在某个指定范围之内 逗号分隔字符串或者数组
			case 'notin':
				$range   = is_array($rule)? $rule : explode(',',$rule);
				return ($type == 'in')?(in_array($value ,$range)):(!in_array($value ,$range));
			case 'between':
			case 'notbetween': // 验证是否不在某个范围
				if (is_array($rule)){
					$min    =    $rule[0];
					$max    =    $rule[1];
				}else{
					list($min,$max)   =  explode(',',$rule);
				}
				return ($type == 'between')?($value>=$min && $value<=$max):($value<$min || $value>$max);
			case 'equal': // 验证是否等于某个值
			case 'notequal': // 验证是否不等于某个值
				if(is_array($rule)){
					$model = isset($rule['type'])?M($rule['table']):$this;
					$count = $model->where($rule['field'].'="'.$value.'"')->count();
					return ($type == 'equal')?($count > 0):($count == 0);
				}else{
					return ($type == 'equal')?($value != $rule):($value == $rule);
				}
			case 'length': // 验证长度
				$length  =  mb_strlen($value,'utf-8'); // 当前数据长度
				if(strpos($rule,',')) { // 长度区间
					list($min,$max)   =  explode(',',$rule);
					return $length >= $min && $length <= $max;
				}else{// 指定长度
					return $length == $rule;
				}
			case 'min':
				if($rule != 0)
					if($rule > $value) return false;
					else
						return true;
			case 'max':
				if($rule != 0)
					if($rule < $value) return false;
					else
						return true;
			case 'reward':      //验证当前用户可用积分大于或等于 $value
				$money = $this->getSessionMoney();
				return ($money['reward'] < $value)?false:true;
			case 'account':     //验证当前用户可用余额大于或等于 $value
				$money = $this->getSessionMoney();
				return ($money['account'] < $value)?false:true;
			case 'experience':  //验证当前用户可用体验金大于或等于 $value
				$money = $this->getSessionMoney();
				return ($money['experience'] < $value)?false:true;
			case 'payPassword': //验证当前用户的支付密码
				$salt = M('UcenterMembers')->where('uid='.$this->getUid())->getField('salt');
				$count = M('ThinkMoney')->where('uid='.$this->getUid().' AND password = "'.md5(md5($value).$salt).'"')->count();
				return ($count == 1)?true:false;
			case 'unique':
				/**
				 * 验证数据唯一性
				 * @param   $rule['table']      所需验证的数据表名
				 * @param   $rule['filed']      所需验证的字段名
				 * @param   $value              所需验证的值
				 */
				$model = isset($rule['table'])?M($rule['table']):$this;
				if($model->where($rule['field'].'="'.$value.'"')->count() == 0)
					return true;
				else
					return false;
			case 'isPassword':
				return $this->_validatorPassword($value, $rule);
			case 'smsCode':
				return $this->_validatorSmsCode($value, $rule);
			case 'verifyImg':
				return (session('verify') == md5($value))?true:false;
			case 'is_login':        //指定用户的uuid查询是否登录
				$sess = $this->getUserData($value);
				return ($sess['errcode'] == 0)?true:false;
			case 'is_realname':     //指定用户的uuid查询是否经过实名认证
				$sess = $this->getUserData($value);
				return ($sess['data']['is_realname'] == 3)?true:false;
			case 'is_weixin':       //指定用户的uuid查询是否绑定微信
				$sess = $this->getUserData($value);
				return ($sess['data']['is_weixin'] == 1)?true:false;
		}
	}
	
	public function backupMySQL($files, $table, $reCreate=false){
		if(!fileExists($files) || $reCreate){
			if(is_array($table)){
				$content = '';
				foreach ($table AS $val){
					$content .= $this->backupTableStruct($val);
					$content .= $this->backupTableRecord($val);
				}
			}else{
				$content = $this->backupTableStruct($table);
				$content .= $this->backupTableRecord($table);
			}
			return $this->writeFile($files, $content, '数据库备份');
		}
	}

	/**
	 * 备份MySQL数据库指定数据表的表结构为Sqlite格式的json数据
	 * @param $file
	 * @param $table
	 * @return array
	 */
	public function backupMySqlToSqliteForJson($file, $table){
		if(is_array($table)){
			foreach ($table AS $val){
				$content[$val] = array(
					'struct'    => $this->getMysqlStructToSqlite($val),
					'data'      => $this->getTableDataToSqlite($val)
				);
			}
		}else{
			$content[$table] = array(
				'struct'    => $this->getMysqlStructToSqlite($table),
				'data'      => $this->getTableDataToSqlite($table)
			);
		}
		return $this->writeFile($file, json_encode($content), '数据库结构备份');
	}
	
	public function backupMySqlToSqliteForJson2($file, $table){
		if(is_array($table)){
			foreach ($table AS $key => $val){
				$content[$key] = array(
					'struct'    => $this->getMysqlStructToSqlite($key),
					'data'      => ($val)?$this->getTableDataToSqlite($key):null,
				);
			}
		}else{
			$content[$table] = array(
				'struct'    => $this->getMysqlStructToSqlite($table),
				'data'      => $this->getTableDataToSqlite($table)
			);
		}
		return $this->writeFile($file, json_encode($content), '数据库结构备份');
	}


	/**
	 * 获取指定表的数据
	 * @param $file
	 * @param $table
	 * @return array
	 */
	public function getTableDataToSqlite($table, $file=null){
		if(is_array($table)){
			foreach ($table AS $val){
				$content[] = M()->table($val)->where('id<>0')->select();
			}
		}else{
			$content = M()->table($table)->select();
		}
		if(is_null($file))
			return $content;
		else
			return $this->writeFile($file, json_encode($content), '数据库数据备份');
	}

	/**
	 * 获取指定表的数据结构并转换为sqlite数据格式
	 * @param $table
	 * @return array
	 */
	protected function getMysqlStructToSqlite($table){
		$db = array(
			'type'  => C('DB_TYPE'),
			'host'  => C('DB_HOST'),
			'name'  => C('DB_NAME'),
			'user'  => C('DB_USER'),
			'pswd'  => C('DB_PWD'),
			'port'  => C('DB_PORT'),
		);
		$table_field = array(
			'column_name'       => 'field',
			'data_type'       => 'type',
			'is_nullable'       => 'null',
			'column_default'    => 'value',
			'column_key'        => 'bound',
			'extra',
		);
		$dsn = $db['type'].'://'.$db['user'].':'.$db['pswd'].'@'.$db['host'].':'.$db['port'].'/INFORMATION_SCHEMA';
		$table_where = 'table_name = "'.$table.'" AND table_schema = "'.$db['name'].'"';
		$result = array();
		foreach (M('olumns', 'c', $dsn)->where($table_where)->field($table_field)->select() AS $vo){
			if($vo['bound'] == 'PRI'){
				$type = 'key';
				$null = '';
				$default = '';
			}else{
				switch (strtoupper($vo['type'])){
					case 'INT':
					case 'TINYINT':
					case 'SMALLINT':
					case 'MEDIUMINT':
					case 'BIGINT':
					case 'UNSIGNED BIG INT':
					case 'INT2':
					case 'INT8':
					case 'INTEGER':
						$type = 'INTEGER';
						break;
					case 'CHAR':
					case 'CHARACTER':
					case 'VARCHAR':
					case 'VARYING CHARACTER':
					case 'NCHAR':
					case 'NATIVE CHARACTER':
					case 'NVARCHAR':
					case 'TEXT':
					case 'CLOB':
						$type = 'TEXT';
						break;
					case 'BLOB':
					case 'no datatype specified':
						$type = 'NONE';
						break;
					case 'REAL':
					case 'DOUBLE':
					case 'DOUBLE PRECISION':
					case 'FLOAT':
						$type = 'REAL';
						break;
					case 'NUMERIC':
					case 'DECIMAL':
					case 'BOOLEAN':
					case 'DATE':
					case 'DATETIME':
						$type = 'NUMERIC';
						break;
				}
				$null = ($vo['null'] == 'NO')?' NOT NULL':'';
				if($null != ' NOT NULL'){
					if(is_null($vo['default'])) {
						$default = '';
					}elseif(empty($vo['default'])){
						$default = ' DEFAULT ""';
					}else{
						$default = is_numeric($vo['default'])?' DEFAULT '.$vo['default']:' DEFAULT "'.$vo['default'].'"';
					}
				}
			}
			$result[$vo['field']] = $type.$null.$default;
		}
		return $result;
	}

	/**
	 * 验证能力平台短信验证码是否正确
	 * @param $param  array   所需验证的手机号码和短信验证码数组形如: array('mobile' => 13355556666, 'code' => 123456, 'action' => 'register')
	 * @param $rule   string  默认验证后不正确的情况下注销该验证码的有效性,只有在验证通过的情况下才注销验证码有效性; 当为"refresh"的时候,无论成功与否都注销该验证码的有效性
	 * @return bool
	 */
	private function _validatorSmsCode($param, $rule=null){
		$param['action'] = $param['action']?$param['action']:'register';
		$where = 'mobile="'.$param['mobile'].'" AND actions="'.$param['action'].'" AND dateline > '.(time() - 60*5);
		$code = M('SmsLog')->where($where)->order('dateline DESC')->limit(1)->getField('code');
		if($param['code'] == $code){
			M('MustachSmsLog')->where($where)->delete();
			return true;
		}else{
			if($rule == 'refresh') M('SmsLog')->where($where)->delete();
			return false;
		}
	}
	
	private function _validatorPassword($password, $mobile){
		$sql = "SELECT COUNT(*) AS tp FROM `onethink_mustach_user` WHERE `mobile` = '".$mobile."' AND `password` = password('".$password."') LIMIT 1";
		$count = M()->query($sql);
		Log::write(json_encode($count), 'COUNT');
		Log::write($count[0]['tp'], 'COUNT');
		return ($count[0]['tp'] > 0)?true:false;
	}

	/**
	 * 标准化对数据库的增删改查操作, 对指定数据表的写操作后返回此笔记录
	 * @param array $param  数据库操作数据
	 * @param array $pre    数据口表前缀
	 *
	 * @return array
	 */
	protected function curd($param=array()){
		$num = ($param['num'])?$param['num']:25;
		$curd = array(
			'model'     => ($param['model'])?M($param['model']):$this,
			'page'      => ($param['page'])?$param['page'].', '.$num:null,
			'msg'		=> ($param['msg'])?$param['msg']:'数据操作成功！',
		);
		$type = ($param['type'] && in_array($param['type'], array('addAll', 'add', 'save', 'delete', 'select', 'find')))?$param['type']:'select';
		$model = $curd['model'];
		if($param['where']) $model = $model->where($param['where']);
		if($param['field']) $model = $model->field($param['field']);
		if($param['order']) $model = $model->order($param['order']);
		if($param['group']) $model = $model->group($param['group']);
		switch($type){
			case 'addAll':
				$debug = array('data' => $curd['data'], 'insID' => array());
				$curd['model']->startTrans();
				foreach($curd['data'] AS $val){
					$add = $this->curd(array(
						'type'  => 'add',
						'model' => $model,
						'data'  => $val,
					));
					if($add['type'] == 'Success'){
						$errType = 'Success';
						array_push($debug['insID'], $add['pk']);
					}else{
						$errType = 'Error';
						break;
					}
				}
				if($errType != 'Error'){
					$curd['model']->commit();
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'pk' => $debug['insID'], 'ac' => 'InsertAll');
				}else{
					$curd['model']->rollback();
					$return = array('type' => 'Error', 'msg' => '向数据库批量新增数据记录时发生错误');
				}
				break;
			case 'add':
				if($param['validate'] || $param['auto']){
					if($param['validate']) $model = $model->validate($param['validate']);
					if($param['auto']) $model = $model->auto($param['auto']);
					if($model->create($param['data']) && $model->add())
						$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Insert');
					else
						$return = array('type' => 'Error', 'msg' => '向数据库新增数据记录时发生错误：'.$model->getError());
				}else{
					if($model->add($param['data'])){
                        $return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Insert');
                    }else{
                        $return = array('type' => 'Error', 'msg' => '向数据库新增数据记录时发生错误：'.$model->getError());
                    }
				}
				break;
			case 'save':
				if($param['validate'] || $param['auto']){
					if($param['validate']) $model = $model->validate($param['validate']);
					if($param['auto']) $model = $model->auto($param['auto']);
					if($model->create($param['data']) && $model->save())
						$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'save');
					else
						$return = array('type' => 'Error', 'msg' => '向数据库指定记录进行变更操作时发生错误：'.$model->getError());
				}else{
					if ($model->save($param['data'])){
						$pk = $model->getField($model->getPk());
						$return = array('type' => 'Success', 'msg' => $curd['msg'], 'pk' => $pk, 'ac' => 'Update');
					}else{
						$return = array('type' => 'Error', 'msg' => '向数据库指定记录进行变更操作时发生错误：'.$model->getError());
					}
				}
				break;
			case 'delete':
				$recid = $model->delete();
				if($recid)
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Delete');
				else
					$return = array('type' => 'Error', 'msg' => '对数据库指定记录进行删除操作时发生错误：'.$model->getError());
				break;
			case 'select':
				$field = ($param['field'])?$param['field']:true;
				$where = ($param['where'])?$param['where']:'id!=0';
				if(is_null($curd['page'])){
					$page = null;
					$data = $model->where($where)->field($field)->select();
				}else{
					$count = $model->count();
					$Pages = new \Think\Page($count, $num);// 实例化分页类 传入总记录数和每页显示的记录数
					$page = array(
						'totalRows'     => array('value' => $Pages->totalRows, 'lable' => '总记录数'),
						'totalPages'    => array('value' => ceil($Pages->totalRows / $Pages->listRows), 'lable' => '总页数'),
						'nowPage'       => array('value' => $curd['page'], 'lable' => '当前页数'),
						'listRows'      => array('value' => $Pages->listRows, 'lable' => '每页显示记录数'),
						'rollPage'      => array('value' => $Pages->rollPage, 'lable' => '每页显示的页数'),
						'parameter'     => array('value' => $Pages->parameter, 'lable' => '页数跳转时要带的参数'),
					);
					$data = $model->where($where)->field($field)->limit($Pages->firstRow.', '.$Pages->listRows)->select();
				}
				if($data || is_array($data))
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Select', 'data' => $data, 'page' => $page);
				else
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				break;
			case 'find':
				$data = $model->find();
				if(!$data || is_null($data))
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				else
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Find', 'data' => $data);
				break;
			case 'getField':
				$data = $model->getField($param['field']);
				if(!$data || is_null($data))
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				else
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'getField', 'field' => $param['field'], 'value' => $data);
				break;
			case 'setField':
				$data = $model->setField($param['field'], $param['data']);
				if(!$data || is_null($data))
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				else
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'setField', 'field' => $param['field'], 'value' => $param['data']);
				break;
			default:
				$return = array('type' => 'Error', 'msg' => '没有指定数据库操作类型：'.$model->getError());
		}
		$debug = array(
			'data_r'    => $param['data'],
			'where'     => $curd['where'],
			'sqlError'  => $model->getError(),
			'execute'   => $model->getLastSql(),
		);
		return (APP_DEBUG)?array_merge($return, $debug):$return;
	}

	/**
	 * 通过CURL或者封装过的Snoopy方式像微信服务器发送指令,GET或者POST方法提交数据返回结果
	 * @param        $url       提交数据的接收地址,如果是GET方法,该地址不包含?后的数据
	 * @param        $data      提交的数据GET方式为?后的部分,POST为一个表单的JSON数据
	 * @param string $method    数据提交的方法,GET(默认)或者POST
	 * @param bool   $ssl       是否SSL加密,默认为True
	 *
	 * @return string   返回服务器返回的结果
	 */
	protected function curlData($url, $data, $method='GET', $ssl=true){
		switch($method){
			case 'GET':
				$getUrl = $url.'?'.$data;
				$ch = curl_init($getUrl);
				curl_setopt($ch, CURLOPT_URL,$getUrl);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				break;
			case 'POST':
				$ch = curl_init($url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
				break;
		}
		curl_setopt($ch, CURLOPT_TIMEOUT, 500);
		if($ssl){
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		}
		$results= curl_exec($ch);
		curl_close($ch);
		return $results;
	}
	
	protected $tableSql = <<<EOF

--
-- 数据库表结构: `[table]`
--
DROP TABLE IF EXISTS `[table]`;
CREATE TABLE `[table]`(
[fields]
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

EOF;
	
	protected function backupTableStruct($table){
		$result=M()->query('show columns from '.$table);
		$rsCount=count($result);
		$fields = '';
		foreach ($result as $k=>$v){
			$field  =       $v['field'];
			$type   =       $v['type'];
			$default=       $v['default'];
			$extra  =       $v['extra'];
			$null   =       $v['null'];
			if(!($default==''))
				$default='default '.$default;
			if($null=='NO')
				$null='not null';
			else
				$null="null";
			if($v['key']=='PRI')
				$key    =       'primary key';
			else
				$key    =       '';
			if($k<($rsCount-1))
				$fields .= "  `$field` $type $null $default $key $extra,\r\n";
			else
				$fields .= "  `$field` $type $null $default $key $extra";
		}
		return str_replace(array('[table]', '[fields]'), array($table, $fields), $this->tableSql);
	}
	
	protected function backupTableRecord($table){
		$rs=M()->query('select * from '.$table);
		if(count($rs)<=0){
			return;
		}else{
			$sql="\r\n--\r\n";
			$sql.="-- 数据表: `$table` 中的数据\r\n";
			$sql.="--\r\n";
			foreach ($rs as $k=>$v){
				$sql.="INSERT INTO `$table` VALUES (";
				foreach ($v as $key=>$value){
					if($value=='') $value='null';
					$type=gettype($value);
					if($type=='string') $value="'".addslashes($value)."'";
					$sql.="$value," ;
				}
				$sql.=");\r\n";
			}
			return str_replace(',)',')',$sql);
		}
	}

	protected function writeFile($files, $content, $msg){
		$dir = dirname($files);
		if(!file_exists($dir)) mkdirs($dir, 0777, true);
		if(file_put_contents($files, $content))
			return array('type' => 'Success', 'msg' => '成功生成'.$msg.'文件!', 'files' => $files);
		else
			return array('type' => 'Error', 'msg' => '生成'.$msg.'文件出错!', 'files' => $files);
	}
}