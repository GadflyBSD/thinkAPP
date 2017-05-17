<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/2/8
 * Time: 16:53
 */

namespace Dji\Model;


class DetailsModel extends CommonModel{
	public function add($param){
		$validate = array(
			array('label', 'require', '奖惩内容说明必须填写！'),
			array('cid', 'require', '奖惩内容分类必须选择！'),
			array('minutes', 'require', '奖惩具体时间必须填写！'),
			array('displayorder', 'require', '奖惩分类显示顺序必须填写！'),
		);
		//$add = $this->validate($validate)-add(array_merge($param['data'], array('type' => ($param['data']['minutes']>0)?1:0)));
		return $this->curd(array(
			'type'		=> 'select',
			'msg'		=> '奖惩分类数据添加成功！',
		));
		/*return $this->curd(array(
			'validate'	=> $validate,
			'type'		=> 'add',
			'data'		=> array_merge($param['data'], array('type' => ($param['data']['minutes']>0)?1:0)),
			'msg'		=> '奖惩分类数据添加成功！'
		));*/
	}
	
}