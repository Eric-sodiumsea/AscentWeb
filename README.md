# AscentWeb 医药管理系统 -- 数据库

![image](https://user-images.githubusercontent.com/76035116/203456798-0ce52e87-98f7-46b9-8f3d-b16433261d03.png)

## 1. 概述

### 1.1 项目背景

目前社会上信息管理系统发展飞速，越来越多的企业事业单位引入信息管理软件来管理自己日益增长的各种信息。各种网店也采用了不同的管理系统来管理商品信息，取得了很大的成效。医药管理系统也在功能上不但完善和加强，为了使医药管理更加规范化，程序化，科学化，我们研发了医药管理系统。

### 1.2 系统说明

AscentWeb医药商务系统是基于互联网的应用软件。它包括用户登录，商品浏览，商品查询，购物管理，和后台管理等模块。其中用户登录管理负责用户注册及用户登录；登录成功的用户可以浏览商品；查询特定商品的信息；对于选中的商品进行购物，包括加入购物车和生成订单；后台管理处理从购物网站转过来的订单，发送邮件；以及商品管理和用户管理。

## 2. 需求分析

### 2.1 系统需求

医药管理系统要满足以下需求：第一，医药管理人员通过计算机管理医药商品，进行药品分类，增加药品库存，适应用户需求。第二，管理员对用户的需求情况能做好全面的掌握。第三，管理员能够对医药、用户进行管理。

### 2.2 数据需求

基于系统需求分析，该系统需要实现以下基本功能：

1、用户信息的输入、查询、修改，包括注册用户名，用户昵称，电子邮件，联系电话，收货地址，用户权限。

2、商品浏览和商品查询，包括查询所有商品、按商品名进行模糊查询、按商品标签进行查询。

3、用户管理，包括管理员在后台对用户进行增加、删除、修改、查询。

4、邮件信息的输入、查询、修改，包括发送者邮件地址、接收者邮件地址。

### 2.3  数据字典

#### 2.3.1 用户信息表

含义说明：医药管理系统的核心信息，提供了用户的具体信息。

组成：用户ID，用户名，密码，用户昵称，联系电话，电子邮件，收获地址，用户角色权限，软删除标志

|    数据项    |                含义说明                 | 数据类型 |   数据长度   |          取值范围          |
| :----------: | :-------------------------------------: | :------: | :----------: | :------------------------: |
|      id      |                 用户ID                  |   int    |      11      |           正整数           |
|   username   |                 用户名                  | varchar  |      32      |          合法字符          |
|   password   |                  密码                   | varchar  |      32      |          合法字符          |
|   nickname   |                用户昵称                 | varchar  |      64      |          合法字符          |
|     tel      |                联系电话                 | varchar  |      32      |          合法字符          |
|    email     |                电子邮件                 | varchar  |      64      |          合法字符          |
|   address    |                收获地址                 | varchar  |     100      |          合法字符          |
|  superuser   | 用户角色权限3超级用户,2管理员,1普通用户 | varchar  |      2       |    1, 2, 3其中一个字符     |
|   delsoft    |         软删除标志1软删除,0正常         | varchar  |      2       |            0或1            |

#### 2.3.2 商品信息表

含义说明：医药管理系统的核心信息，提供了商品的信息。

组成：id，image，productname，price，stock，description，delsoft

|   数据项    |        含义说明         | 数据类型 | 数据长度 |   取值范围    |
| :---------: | :---------------------: | :------: | :------: | :-----------: |
|     id      |         商品ID          |   int    |    11    |    正整数     |
|    image    |        商品图片         | varchar  |   100    |   合法地址    |
| productname |        商品名称         | varchar  |    32    |   合法字符    |
|    price    |          价格           |  float   |    32    | 大于0的浮点数 |
|    stock    |       商品库存量        | varchar  |    50    |   0或正整数   |
| description |        商品描述         | varchar  |   255    |   合法字符    |
|   delsoft   | 软删除标志1软删除,0正常 | varchar  |    2     |     0或1      |

#### 2.3.3 邮件信息表

含义说明：医药管理系统的核心信息，提供了邮件的具体信息。

组成：id，fromaddress，frompassword，toaddress

|    数据项    |    含义说明    | 数据类型 | 数据长度 |   取值范围   |
| :----------: | :------------: | :------: | :------: | :----------: |
|      id      |     邮件ID     |   int    |    11    |    正整数    |
| fromaddress  | 发送者邮件地址 | varchar  |    50    | 合法邮箱地址 |
| frompassword | 发送者邮件密码 | varchar  |    30    |   合法字符   |
|  toaddress   | 接收者邮件地址 | varchar  |    50    | 合法邮箱地址 |

#### 2.3.4 商品类型信息表

含义说明:提供了商品的类别信息。

组成：id，productid，categoryname

|    数据项    |  含义说明  | 数据类型 | 数据长度 | 取值范围 |
| :----------: | :--------: | :------: | :------: | :------: |
|      id      |   主键ID   |   int    |    11    |  正整数  |
|  productid   | 引用商品ID |   int    |    11    |  正整数  |
| categoryname |  商品类别  | varchar  |   255    | 合法字符 |

#### 2.3.5 用户商品信息表

含义说明：提供用户商品的详细信息。

组成：user_product，userid，productid

|    数据项    |    含义说明     | 数据类型 | 数据长度 | 取值范围 |
| :----------: | :-------------: | :------: | :------: | :------: |
| user_product |     主键ID      |   int    |    11    |  正整数  |
|    userid    | 外键,引用用户id |   int    |    11    |  正整数  |
|  productid   | 外键,引用商品id |   int    |    11    |  正整数  |


## 3. 数据库设计

### 3.1 概念结构设计

根据对 AscentWeb 医药系统的需求分析，画出如下E-R图。
![image](https://user-images.githubusercontent.com/101373342/205913588-cd9df756-624f-4880-8341-0f20971cc956.png)



### 3.2 逻辑结构设计

#### 3.2.1 关系模型

根据E-R图转换成如下关系模型：

邮件（<u>邮件ID</u>，发送邮箱的地址，发送邮箱的密码，收件邮箱的地址）
用户（<u>用户ID</u>，<u>用户名</u>，密码，昵称，手机号，邮箱地址，收获地址，用户权限，软删除标志）
商品（<u>商品ID</u>，<u>商品名</u>，图片，价格，库存量，描述，软删除标志）
用户管理商品（<u>管理ID</u>，用户ID，商品ID）
商品分类（<u>分类ID</u>，商品ID，分类名）

#### 3.2.2 细化表结构

为方便，根据上述文字描述，用英文简写表和列。

mailtb表

|      说明      |      列名        |   数据类型  |   约束   |
|   :--------:   | :-----------:    |  :------:  | :------: |
|     邮件ID      |        id       |     int     |   主码   |
|  发送邮箱的地址  |   fromaddress   |   varchar   | not null |
|  发送邮箱的密码  |   frompassword  |   varchar   | not null |
|  收件邮箱的地址  |    toaddress    |   varchar   | not null |

user表

|    说明    |     列名    |  数据类型  |   约束   |
|  :------:  | :--------: |  :------:  | :------: |
|   用户ID   |     id      |     int    |   主码   |
|   用户名   |  username   |   varchar  | not null |
|    密码    |   password  |   varchar  | not null |
|    昵称    |   nickname  |   varchar  | not null |
|   手机号   |    tel      |   varchar  | not null |
|   邮箱地址 |    email    |   varchar  | not null |
|  收货地址  |   address   |   varchar  | not null |
|  用户权限  |  superuser  |   varchar  | not null |
| 软删除标志 |   delsoft   |   varchar  | not null |

product表

|   说明   |       列名       | 数据类型 |   约束   |
| :------: | :--------------: | :------: | :------: |
|  商品ID  |        id        |    int   |   主码   |
|   图片   |       image      | varchar  | not null |
|  商品名  |    productname   | varchar  | not null |
|   价格   |      price       |   float  | not null |
|  库存量  |      stock       | varchar  | not null |
|   描述   |    description   | varchar  | not null |
| 软删除标志 |    delsoft     |  varchar  | not null |

user_product表

|   说明   |      列名       | 数据类型 |   约束   |
| :------: | :-------------: | :------: | :------: |
|  管理ID  |       id        |   int    |   主码    |
|  用户ID  |     userid      |   int    | not null  |
|  商品ID  |   productid     |   int    | not null  |

category表

|    说明    |    列名    | 数据类型 |   约束   |
| :--------: | :--------: | :------: | :------: |
|   分类ID   |     id      |    int   |   主码   |
|   商品ID   |  productid  |    int   | not null |
|   分类名   | categoryname | varchar | not null |

### 3.3 **数据库实施**

#### 3.3.1 建表

mailtb表：

```
CREATE TABLE mailtb (

  `id` int NOT NULL AUTO_INCREMENT COMMENT '电子邮件表ID',
  
  `fromaddress` varchar(50) DEFAULT NULL COMMENT '发送者邮件地址',
  
  `frompassword` varchar(30) DEFAULT NULL COMMENT '发送者邮件密码',
  
  `toaddress` varchar(50) DEFAULT NULL COMMENT '接收者邮件地址',
  
  PRIMARY KEY (`id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk COMMENT='电子邮件表'

;
```

user表：

```
CREATE TABLE user (

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
  
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3 COMMENT='用户表'
 
;
```

product表：

```
CREATE TABLE product (

  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  
  `image` varchar(100) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '商品图片',
  
  `productname` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '商品名称',
  
  `price` float DEFAULT NULL COMMENT '价格',
  
  `stock` varchar(50) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '商品库存量',
  
  `description` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '商品描述',
  
  `delsoft` varchar(2) CHARACTER SET gbk COLLATE gbk_chinese_ci DEFAULT NULL COMMENT '软删除标志',
  
  PRIMARY KEY (`id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COMMENT='商品表'
 
;
```

user_product表：

```
CREATE TABLE user_product (

  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键编号',
  
  `userid` int DEFAULT NULL COMMENT '外键,引用用户id',
  
  `productid` int DEFAULT NULL COMMENT '外键,引用商品id',
  
  PRIMARY KEY (`id`),
  
  KEY `user_product__usrid_fk` (`userid`),
  
  KEY `user_product__productid_fk` (`productid`),
  
  CONSTRAINT `user_product__productid_fk` FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
  
  CONSTRAINT `user_product__usrid_fk` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb3 COMMENT='用户与商品中间表'
 
;
```

category表：

```
CREATE TABLE category (

  `id` int NOT NULL AUTO_INCREMENT,
  
  `productid` int DEFAULT NULL,
  
  `categoryname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  
  PRIMARY KEY (`id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
 
;
```
