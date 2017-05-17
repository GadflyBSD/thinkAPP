DROP TABLE IF EXISTS `dji_member`;
CREATE TABLE `dji_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `dji_details`;
CREATE TABLE `dji_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(6) NOT NULL,
  `label` varchar(250) NOT NULL,
  `description` text,
  `type` tinyint(1) NOT NULL,
  `minutes` int(11) NOT NULL,
  `displayorder` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;