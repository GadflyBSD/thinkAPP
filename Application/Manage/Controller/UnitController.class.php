<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/3/13
 * Time: 11:23
 */

namespace Manage\Controller;
use Think\Controller;

class UnitController extends Controller{
	public function yml2json(){
		Vendor('spyc.Spyc');
		$Data = spyc_load_file(__ROOT__.'json/icons.yml');
		foreach ($Data['icons'] AS $val){
			foreach ($val['categories'] AS $vo){
				$icons[str_replace(' ', '', $vo)]['label'] = $vo;
				$icons[str_replace(' ', '', $vo)]['icons'][] = $val['id'];
			}
		}
		$file =new \Think\Storage\Driver\File();
		echo json_encode($icons);
		echo $file->put(DOC_ROOT.'/json/icons.json', json_encode($icons));
	}
	
	public function path(){
		echo DOC_ROOT;
	}
	
	public function test(){
		dump(D('System')->generateDataStructure());
	}
}