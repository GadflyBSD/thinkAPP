<?php
/**
 * Created by PhpStorm.
 * User: gadfly
 * Date: 2016/11/15
 * Time: 上午11:11
 */

namespace Dji\Model;
use Think\Model;

class CommonModel extends Model{
	protected function validators($array=array()){
		foreach($array AS $val){
			if(!$this->validator($val['type'], $val['value'], $val['rule']))
				return array('type' => 'Error', 'msg' => $val['msg']);
		}
		return array('type' => 'Success');
	}

	/**
	 * 数据验证方法
	 * @param       $type
	 * @param       $value
	 * @param array $rule
	 *
	 * @return bool
	 */
	protected function validator($type, $value, $rule=array()){
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
				return preg_match('/^1[3|4|5|7|8][0-9]\d{4,8}$/', $value);
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
					$count = M($rule['table'])->where($rule['field'].'="'.$value.'"')->count();
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
				if(M($rule['table'])->where($rule['field'].'="'.$value.'"')->count() == 0)
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
			M('WebappSmsLog')->where($where)->delete();
			return true;
		}else{
			if($rule == 'refresh') M('SmsLog')->where($where)->delete();
			return false;
		}
	}

	private function _validatorPassword($password, $mobile){
		$where = array(
			'mobile'	=> $mobile,
			'password'	=> array('exp', 'password("'.$password.'")'),
		);
		return (M('Member')->where($where)->count() > 0)?true:false;
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
					if($model->add($param['data']))
						$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Insert');
					else
						$return = array('type' => 'Error', 'msg' => '向数据库新增数据记录时发生错误：'.$model->getError());
				}
				$debug = array(
					'data'      => $param['data'],
					'insID'     => $model->getLastInsID(),
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
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
				$debug = array(
					'data'      => $param['data'],
					'where'     => $curd['where'],
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
				break;
			case 'delete':
				$recid = $model->delete();
				$debug = array(
					'where'     => $curd['where'],
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
				if($recid)
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Delete');
				else
					$return = array('type' => 'Error', 'msg' => '对数据库指定记录进行删除操作时发生错误：'.$model->getError());
				break;
			case 'select':
				if(is_null($curd['page'])){
					$page = null;
					$data = $model->select();
				}else{
					import('ORG.Util.Page');     // 导入分页类
					$count = $model->count();
					$Pages = new Page($count, $num);// 实例化分页类 传入总记录数和每页显示的记录数
					$page = array(
						'totalRows'     => array('value' => $Pages->totalRows, 'lable' => '总记录数'),
						'totalPages'    => array('value' => $Pages->totalPages, 'lable' => '总页数'),
						'nowPage'       => array('value' => $Pages->nowPage, 'lable' => '当前页数'),
						'listRows'      => array('value' => $Pages->listRows, 'lable' => '每页显示记录数'),
						'rollPage'      => array('value' => $Pages->rollPage, 'lable' => '每页显示的页数'),
						'parameter'     => array('value' => $Pages->parameter, 'lable' => '页数跳转时要带的参数'),
						'coolPages'     => array('value' => $Pages->coolPages, 'lable' => '分页的栏的总页数'),
					);
					$data = $model->select();
				}
				$debug = array(
					'where'     => $curd['where'],
					'page'      => $page,
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
				if($data)
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Select', 'data' => $data);
				else
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				break;
			case 'find':
				$data = $model->find();
				$debug = array(
					'where'     => $curd['where'],
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
				if(!$data || is_null($data))
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				else
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'Find', 'data' => array_change_key_case($data, CASE_UPPER));
				break;
			case 'getField':
				$data = $model->getField($param['field']);
				$debug = array(
					'where'     => $curd['where'],
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
				if(!$data || is_null($data))
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				else
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'getField', 'field' => $param['field'], 'value' => $data);
				break;
			case 'setField':
				$data = $model->setField($param['field'], $param['data']);
				$debug = array(
					'where'     => $curd['where'],
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
				if(!$data || is_null($data))
					$return = array('type' => 'Error', 'msg' => '对数据库的查询发生错误：'.$model->getError());
				else
					$return = array('type' => 'Success', 'msg' => $curd['msg'], 'ac' => 'setField', 'field' => $param['field'], 'value' => $param['data']);
				break;
			default:
				$return = array('type' => 'Error', 'msg' => '没有指定数据库操作类型：'.$model->getError());
				$debug = array(
					'where'     => $curd['where'],
					'sqlError'  => $model->getError(),
					'execute'   => $model->getLastSql(),
				);
		}
		return array_merge($return, $debug);
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
	
	private function _arrayKeyUpper($param){
		foreach ($param AS $key => $val){
			$return[$key] = array_change_key_case($val, CASE_UPPER);
		}
		return $return;
	}
}