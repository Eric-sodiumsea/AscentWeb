/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.31 : Database - ascentweb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ascentweb` /*!40100 DEFAULT CHARACTER SET gbk */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ascentweb`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productid` int DEFAULT NULL,
  `categoryname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `category` */

insert  into `category`(`id`,`productid`,`categoryname`) values (1,1,'中药'),(2,1,'口服'),(3,2,'西药'),(4,2,'注射'),(5,3,'西药'),(6,4,'中药'),(7,5,'外用药'),(8,5,'创可贴'),(9,6,'跌打酒'),(10,7,'注射'),(11,8,'中药'),(12,8,'熬制'),(13,9,'西药'),(14,9,'口服');

/*Table structure for table `mailtb` */

DROP TABLE IF EXISTS `mailtb`;

CREATE TABLE `mailtb` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '电子邮件表ID',
  `fromaddress` varchar(50) DEFAULT NULL COMMENT '发送者邮件地址',
  `frompassword` varchar(30) DEFAULT NULL COMMENT '发送者邮件密码',
  `toaddress` varchar(50) DEFAULT NULL COMMENT '接收者邮件地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk COMMENT='电子邮件表';

/*Data for the table `mailtb` */

insert  into `mailtb`(`id`,`fromaddress`,`frompassword`,`toaddress`) values (1,'admin123@163.com','123456789','user@qq.com');

/*Table structure for table `orderitem` */

DROP TABLE IF EXISTS `orderitem`;

CREATE TABLE `orderitem` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键编号',
  `ordersid` int DEFAULT NULL COMMENT '外键引用订单ID',
  `productid` int DEFAULT NULL COMMENT '外键引用商品ID',
  `quantity` varchar(50) DEFAULT NULL COMMENT '每个商品所购买数量',
  PRIMARY KEY (`id`),
  KEY `orderitem_orders__ordersid_fk` (`ordersid`),
  KEY `orderitem_product_productid_fk` (`productid`),
  CONSTRAINT `orderitem_orders__ordersid_fk` FOREIGN KEY (`ordersid`) REFERENCES `orders` (`id`),
  CONSTRAINT `orderitem_product_productid_fk` FOREIGN KEY (`productid`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='订单与商品中间表';

/*Data for the table `orderitem` */

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `ordernumber` varchar(50) DEFAULT NULL COMMENT '订单编号',
  `usrid` int DEFAULT NULL COMMENT '用户ID',
  `createtime` datetime DEFAULT NULL COMMENT '订单创建时间',
  `delsoft` varchar(2) DEFAULT NULL COMMENT '软删除标志',
  PRIMARY KEY (`id`),
  KEY `orders_usr_id_fk` (`usrid`),
  CONSTRAINT `orders_usr_id_fk` FOREIGN KEY (`usrid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='订单表';

/*Data for the table `orders` */

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `image` varchar(100) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '商品图片',
  `productname` varchar(32) CHARACTER SET gbk DEFAULT NULL COMMENT '商品名称',
  `price` float DEFAULT NULL COMMENT '价格',
  `stock` varchar(50) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '商品库存量',
  `description` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '商品描述',
  `delsoft` varchar(2) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '软删除标志',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COMMENT='商品表';

/*Data for the table `product` */

insert  into `product`(`id`,`image`,`productname`,`price`,`stock`,`description`,`delsoft`) values (1,'ss.jpg','白加黑',12.5,'100','黑白配','0'),(2,'ss.jpg','速效感冒胶囊',12.5,'100','感冒胶囊','0'),(3,'ss.jpg','二甲双胍片',12.5,'100','二两双','0'),(4,'ss.jpg','达美康',12.5,'100','达人健康','0'),(5,'ss.jpg','迪沙片',12.5,'40','迪迦','0'),(6,'ss.jpg','美吡哒',12.5,'300','美滋滋','0'),(7,'ss.jpg','白芍',12.5,'100','白花花','0'),(8,'ss.jpg','何首乌',12.5,'100','乌乌乌','0'),(9,'ss.jpg','枸杞',12.5,'100','棒！','0');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL COMMENT '密码',
  `nickname` varchar(64) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '用户全称',
  `tel` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '联系电话',
  `email` varchar(64) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '电子邮件',
  `address` varchar(100) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '收获地址',
  `superuser` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户角色权限3超级用户,2管理员,1普通用户',
  `delsoft` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '软删除标志1软删除,0正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3 COMMENT='用户表';

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`nickname`,`tel`,`email`,`address`,`superuser`,`delsoft`) values (1,'admin','123456','administrator','13315266854','admin@163.com','501B','2','0'),(2,'lixin','lixin','lianglixin','13315266853','lixin@163.com','501B','2','0'),(3,'ascent','ascent','test','13315266852','ascent@163.com','501B','1','0'),(4,'shang','shang','shangshang','13315266851','test@163.com','501B','1','0'),(5,'xnh','123','xnhxnh','123456','456@qq.com','abcdefg','1','0'),(6,'dzh','123','dzhdzh','123456','123@qq.com','abcdefg','1','0'),(7,'whh','456','jay','135123456','789@qq.com','sztu','3','0'),(20,'psy','123','fatman','136123456','123@qq.com','sztu','2','0'),(35,'lzm','123','leo','135123456','123@qq.com','sztu','1','0'),(48,'wyj','123','wyjwyj','123456','456@qq.com','abcdefg','1','0'),(49,'lxw','123','fatwoman','136123456','123@qq.com','sztu','2','0'),(50,'adminadmin','123456','adminadmin','123456','12@qq.com','abcd','1','1'),(51,'xnhxnh','123456','xnhxnh','123456','22@qq.com','5678','2','0');

/*Table structure for table `user_product` */

DROP TABLE IF EXISTS `user_product`;

CREATE TABLE `user_product` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键编号',
  `userid` int DEFAULT NULL COMMENT '外键,引用用户id',
  `productid` int DEFAULT NULL COMMENT '外键,引用商品id',
  PRIMARY KEY (`id`),
  KEY `user_product__usrid_fk` (`userid`),
  KEY `user_product__productid_fk` (`productid`),
  CONSTRAINT `user_product__productid_fk` FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
  CONSTRAINT `user_product__usrid_fk` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3 COMMENT='用户与商品中间表';

/*Data for the table `user_product` */

insert  into `user_product`(`id`,`userid`,`productid`) values (3,2,5),(4,2,6),(36,49,5),(37,49,9),(40,51,1),(41,1,1),(42,1,2),(43,1,3),(44,1,4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
