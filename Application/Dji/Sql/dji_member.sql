/*
 Navicat Premium Data Transfer

 Source Server         : gadfly.hzxiansheng.com
 Source Server Type    : MySQL
 Source Server Version : 50630
 Source Host           : gadfly.hzxiansheng.com
 Source Database       : gadfly

 Target Server Type    : MySQL
 Target Server Version : 50630
 File Encoding         : utf-8

 Date: 02/08/2017 11:09:38 AM
*/

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `dji_member`
-- ----------------------------
DROP TABLE IF EXISTS `dji_member`;
CREATE TABLE `dji_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
