<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/5/5
 * Time: 16:15
 */

/**
 * @package App/Controller/RestfulController
 */
$param = array(
	'action'    => '发送短信验证码的动作标识, 默认为: register',
	'uuid'      => '用户设备UUID',
	'mobile'    => '待接收短信验证码的手机号码',
);

$return = array(
	'statuas'   => 'success',      // 发送状态
	'mobile'    => '手机号码',      // 发送手机号码
	'res_code'  => 0,
	'identifier'=> 'mg9966',
	'create_at' => 1425526157,
);

//JS to PHP 测试
$txt_en = $_POST['password'];
$txt_en = base64_encode(pack("H*", $txt_en));
$file = 'ssl/server.pem';
$txt_de = $this->privateKeyDecode($txt_en, $file, TRUE);
var_dump($txt_de);

//PHP to PHP 测试
$encrypt = $this->_publicKeyEncode('{"name":"公钥加密私钥解密测试","password":"dg123456"}');
$decrypt = $this->_privateKeyDecode($encrypt);
echo '<h2>公钥加密, 私钥解密</h2>';
echo 'encode: <p>'.$encrypt.'</p><br>';
echo 'dncode: '.$decrypt.'<br>';
echo '<br><hr>';
$encrypt = $this->_privateKeyEncode('{"name":"私钥加密公钥解密测试","password":"pw123456"}');
$decrypt = $this->_publicKeyDecode($encrypt);
echo '<h2>私钥加密, 公钥解密</h2>';
echo 'encode: <p>'.$encrypt.'</p><br>';
echo 'dncode: '.$decrypt.'<br>';
echo '<br><hr>';