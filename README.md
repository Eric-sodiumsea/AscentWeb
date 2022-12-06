# AscentWeb 医药管理系统 -- 数据库

![image](https://user-images.githubusercontent.com/76035116/203456798-0ce52e87-98f7-46b9-8f3d-b16433261d03.png)

## 1. 概述

### 1.1 项目背景

目前社会上信息管理系统发展飞速，越来越多的企业事业单位引入信息管理软件来管理自己日益增长的各种信息。各种网店也采用了不同的管理系统来管理商品信息，取得了很大的成效。医药管理系统也在功能上不但完善和加强，为了使医药管理更加规范化，程序化，科学化，我们研发了医药管理系统。

### 1.2 系统说明

AscentWeb医药商务系统是基于互联网的应用软件。它包括用户登录，商品浏览，商品查询，购物管理，和后台管理等模块。其中用户登录管理负责用户注册及用户登录；登录成功的用户可以浏览商品；查询特定商品的信息；对于选中的商品进行购物，包括加入购物车和生成订单；后台管理处理从购物网站转过来的订单，发送邮件；以及商品管理和用户管理。

## 2. 需求分析

### 2.1 系统需求

医药管理系统要满足以下需求：第一，医药管理人员通过计算机管理医药商品，进行药品分类，增加药品库存，适应用户需求。第二，管理员对用户的需求情况能做好全面的掌握。第三，对医药、用户的管理。

---

# 以下未完成

---

### 2.2 数据需求

基于系统需求分析，该系统需要实现以下基本功能：

1、顾客信息的输入、查询、修改，包括注册名，真实姓名，家庭住址，联系方式，订单号。

2、书籍类别制定、信息输入、查询、修改，包括类别编号，类别名称。

3、书籍信息的输入、查询、修改，包括数据的编号、名称、类别、作者姓名、出版社名称、出版日期。

4、订单信息的查询、修改，包括订单号，订购人，订购日期，订购书籍的编号、书籍数量、发货日期。

5、库存信息的输入、查询、修改，包括书籍的编号、库存量、价格。

6、管理员信息的输入、查询、修改，包括管理员编号、具体身份。

### 2.3  数据字典

#### 2.3.1 书籍信息表

含义说明：书店关系体统的核心信息，提供了书籍的具体信息。

组成：ISBN号，书籍名称，书籍作者，书籍出版年份，书籍价格

|    数据项    |       含义说明       | 数据类型 |   数据长度   |          取值范围          |
| :----------: | :------------------: | :------: | :----------: | :------------------------: |
|    ISBN号    | 区别每本书的唯一标识 | varchar  |      80      | 任意合法字符且在长度范围内 |
|   书籍名称   |       书籍名称       | Varchar  |      80      |          合法字符          |
|   书籍作者   |       书籍作者       | varchar  |      10      |          合法字符          |
| 书籍出版年份 |     书籍出版日期     | Datetime | 日期型的长度 |       符合日期的规则       |
|    成交量    |     书籍的成交量     |  BIGINT  |    大整数    |        图书的成交量        |
|    出版社    |     书籍的出版社     |   Char   |      30      |          合法字符          |
|   图书定价   |       书籍价格       |   Int    |    长整数    |         图书的价格         |
|     折扣     |   图书售卖时的折扣   |   Int    |    长整数    |         图书的折扣         |

#### 2.3.2 库存信息表

含义说明：书店关系系统的核心信息，提供了库存的信息。

组成：ISBN号，库存量，价格，折扣，库存下限（如果低于下限则提示进货）

|  数据项  |        含义说明        | 数据类型 | 数据长度 |   取值范围   |
| :------: | :--------------------: | :------: | :------: | :----------: |
|  ISBN号  |  区别每本书的唯一标识  | varchar  |    80    |   合法字符   |
|  库存量  |      书籍的存货量      |   int    |    10    | 1-9999999999 |
| 库存下限 | 书籍在仓库中的最少数量 |   int    |    10    | 1-9999999999 |

#### 2.3.3 订单信息表

含义说明：书店关系系统的核心信息，提供了订单的具体信息。

组成：订单号，订购人，订购日期，订单书籍，书籍数量，发货日期。

|  数据项  |          含义说明          | 数据类型 |   数据长度   |      取值范围      |
| :------: | :------------------------: | :------: | :----------: | :----------------: |
|  订单号  | 区别每个不同订单的唯一标识 | Varchar  |      20      |     合法的字符     |
|  订购人  |      订购人的注册网名      | Varchar  |      10      |     合法的字符     |
| 订购日期 |     用户生成订单的时间     | Datetime | 日期型的长度 | 满足特定的日期格式 |
| 订单书籍 |      订单书籍的ISBN号      | Varchar  |      80      |     合法的字符     |
| 书籍数量 |     每份订单书籍的数量     |   Int    |      1       |    1-9999999999    |
| 发货日期 |     管理员确定发货时间     | Datetime |   日期长度   |    满足日期格式    |

#### 2.3.4 顾客信息表

含义说明：书店关系系统的核心信息，提供了顾客的具体信息。

组成：注册名，真实姓名，家庭住址，联系方式，购书卡号。

|  数据项  |      含义说明      | 数据类型 | 数据长度 |  取值范围  |
| :------: | :----------------: | :------: | :------: | :--------: |
|  注册名  | 唯一区分用户的表示 | Varchar  |    20    | 合法的字符 |
| 真实姓名 |   顾客的真实姓名   | Varchar  |    20    | 合法的字符 |
| 家庭住址 |    顾客收货地址    | Varchar  |   100    | 合法的字符 |
| 联系方式 |   顾客的电话号码   | Varchar  |    20    | 合法的字符 |
| 购书卡号 |   顾客的购书卡号   | Varchar  |    30    | 合法的字符 |

#### 2.3.5 管理员信息表

含义说明：书店关系系统的核心信息，提供了雇员的基本信息，管理权限等。

组成：管理员编号，名字，密码，具体身份（超级管理员，书籍管理员，用户管理员，订单管理员），管理员邮箱。

|   数据项   |       含义说明       | 数据类型 | 数据长度 |    取值范围    |
| :--------: | :------------------: | :------: | :------: | :------------: |
| 管理员编号 | 唯一区分管理员的表识 | varchar  |    20    |   合法的字符   |
| 管理员名字 |     管理员的姓名     | varchar  |    20    |   合法的字符   |
|    密码    | 管理员进入系统的密码 | varchar  |    10    |   合法的字符   |
|  具体身份  |    管理员管理范围    | Varchar  |    20    |                |
|    邮箱    | 管理员与用户交流方式 | Varchar  |    30    | 合法的邮箱地址 |

#### 2.3.6 图书类型信息表

含义说明:提供了书籍的类别信息。

组成：图书类型编号，类别名称。

|   数据项   |        含义说明        | 数据类型 | 数据长度 |          取值范围          |
| :--------: | :--------------------: | :------: | :------: | :------------------------: |
| 数据类型号 | 区别图书类型的唯一标识 | Varchar  |    20    | 任意合法字符且在长度范围内 |
|  类别名称  |        类别名称        | Varchar  |    80    |          合法字符          |

#### 2.3.7 订单详细信息表

含义说明：提供订单的详细信息。

组成：详细订单编号，订单号，图书编号，订购数量，发货状态，收货状态，卖出总价。

|   数据项   |          含义说明          | 数据类型 |   数据长度   |          取值范围          |
| :--------: | :------------------------: | :------: | :----------: | :------------------------: |
| 详细订单号 | 区别每个详细订单的唯一标识 | Varchar  |      80      | 任意合法字符且在长度范围内 |
|   订单号   | 区别每个不同订单的唯一标识 | Varchar  |      80      |          合法字符          |
|  订购数量  |     每份订单的图书数量     | Varchar  |      10      |          合法字符          |
|  发货状态  |     卖家的发货状态信息     | Datetime | 日期型的长度 |       符合日期的规则       |
|  收货状态  |      顾客收货状态信息      | Varchar  |      20      |          合法字符          |
|  卖出总价  |         订单的总额         | Varchar  |      20      |          合法字符          |

## 3. 数据库设计

### 3.1 概念结构设计

根据对网上书店的需求分析，画出如下E-R图。

![img](https://img-blog.csdnimg.cn/20190106094928245.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

图1.书籍信息ER图

![img](https://img-blog.csdnimg.cn/20190106095009631.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

图2.库存信息ER图

![img](https://img-blog.csdnimg.cn/20190106095030773.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

图3.订单信息ER图

![img](https://img-blog.csdnimg.cn/20190106095050364.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

图4.顾客信息ER图

![img](https://img-blog.csdnimg.cn/20190106095108245.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

图5.管理员信息

![img](https://img-blog.csdnimg.cn/20190106095122981.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

图6.图书类型信息ER图

![img](https://img-blog.csdnimg.cn/20190106095136681.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

 图7.订单详细信息ER图

![img](https://img-blog.csdnimg.cn/20190106095159613.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RfSV9BX05f,size_16,color_FFFFFF,t_70)

 图8.网上购书系统ER图

### 3.2 逻辑结构设计

#### 3.2.1 关系模型

根据E-R图转换成如下关系模型：

书籍(<u>ISBN号</u>、订单详情、书籍类型、管理员名称、书籍名称、作者、出版年份、成交量、出版社名称、折扣)。

库存(<u>ISBN号</u>、库存量、库存下限，书籍名称)。

订单(<u>订单号</u>、<u>顾客昵称</u>、订购人、订购日期、订单书籍、书籍数量、发货日期)。

顾客(<u>注册名</u>、管理员名称、真实姓名、家庭住址、联系方式、购书卡号)。

管理员(<u>管理员编号</u>、管理员名字、密码、具体身份、邮箱)。

图书类型(数据类型、类别名称)。

订单详细(<u>详细订单号</u>、订单号、订购数量、发货状态、收货状态、卖出总价)

#### 3.2.2 细化表结构

为方便，根据上述文字描述，用英文简写表和列。

书籍信息表

|    说明    |     列名      | 数据类型 |   约束   |
| :--------: | :-----------: | :------: | :------: |
|   ISBN号   |  BookISBNId   |   Char   |   主码   |
|  订单详情  |   BookOrder   |   Char   | not null |
|  书籍类型  |   BookType    |   Char   | not null |
| 管理员名称 | BookAdminName |   Char   | not null |
|  书籍名称  |   BookName    |   Char   | not null |
|    作者    |  BookWriter   |   Char   | not null |
|  出版年份  | BookPrintYear | Datetime | not null |
|   成交量   |    BookVOL    |  BIGINT  | not null |
| 出版社名称 | BookPrintName |   Char   | not null |
|    折扣    | BookDiscount  |   int    | not null |

库存表

|   说明   |     列名      | 数据类型 |   约束   |
| :------: | :-----------: | :------: | :------: |
|  ISBN号  |  BookISBNId   |   Char   |   主码   |
|  库存量  |  EntreStock   |   Int    |   主码   |
| 书籍名称 |   BookName    |   Char   | not null |
| 库存下限 | EntreFloorNum |   int    | not null |

订单表

|   说明   |       列名       | 数据类型 |   约束   |
| :------: | :--------------: | :------: | :------: |
|  订单号  |     OrderID      |   Char   |   主码   |
| 顾客昵称 | OrderCusNickname |   Char   |   主码   |
|  订购人  |   OrderCusName   |   Char   | not null |
| 订购日期 |    OrderData     | Datetime | not null |
| 订单书籍 |    OrderBook     |   Char   | not null |
| 书籍数量 |    OrderCount    |   int    | not null |
| 发货日期 |  OrderSendData   | Datetime | not null |

顾客信息表

|   说明   |      列名       | 数据类型 |   约束   |
| :------: | :-------------: | :------: | :------: |
|  注册名  | CusResNikeName  |   char   |   主码   |
| 真实姓名 |     CusName     |   char   | not null |
| 家庭住址 |   CusAddress    |   char   | not null |
| 联系方式 |    CusPhone     |   char   | not null |
| 购书卡号 | CusBoughtCardId |   char   | not null |

管理员信息表

|    说明    |    列名    | 数据类型 |   约束   |
| :--------: | :--------: | :------: | :------: |
| 管理员编号 |   ManaID   |   Char   |   主码   |
| 管理员名字 |  ManaName  |   Char   | not null |
|    密码    | ManaPasswd |   Char   | not null |
|  具体身份  |  ManaIden  |   Char   | not null |
|    邮箱    |  ManaMail  |   Char   | not null |

图书类型表

|   说明   |     列名      | 数据类型 |   约束   |
| :------: | :-----------: | :------: | :------: |
| 数据类型 |   BookClass   |   Char   |   主码   |
| 类别名称 | BookClassName |   Char   | not null |

### 3.3 **数据库实施**

#### 3.3.1 建表

书籍信息表：

```
CREATE TABLE bookinfo (
 
`BookISBNId`  char(80) NOT NULL ,
 
`BookOrder`  char(80) NOT NULL ,
 
`BookType`  char(50) NOT NULL ,
 
`BookAdminName`  char(20) NOT NULL ,
 
`BookName`  char(30) NOT NULL ,
 
`BookWriter`  char(30) NOT NULL ,
 
`BookPrintYear`  datetime NOT NULL ,
 
`BookVOL`  bigint NOT NULL ,
 
`BookPrintName`  char(30) NOT NULL ,
 
`BookDiscount`  int NOT NULL ,
 
PRIMARY KEY (`BookISBNId`)
 
)
 
;
```

库存信息表：

```
CREATE TABLE  repertoryinfo(
 
`EntreBookISBNId`  char(80) NOT NULL ,
 
`EntreStock`  int NOT NULL ,
 
`EntreBookName`  char(30) NOT NULL ,
 
`EntreFloorNum`  int NOT NULL ,
 
PRIMARY KEY (`EntreBookISBNId`, `EntreStock`)
 
)
 
;
```

订单表：

```
CREATE TABLE orderinfo (
 
`OrderID`  char(80) NOT NULL ,
 
`OrderCusNickname`  char(20) NOT NULL ,
 
`OrderCusName`  char(20) NOT NULL ,
 
`OrderData`  datetime NOT NULL ,
 
`OrderBook`  char(30) NOT NULL ,
 
`OrderCount`  int NOT NULL ,
 
`OrderSendData`  datetime NOT NULL ,
 
PRIMARY KEY (`OrderID`, `OrderCusNickname`)
 
)
 
;
```

顾客信息表：

```
CREATE TABLE cusinfo (
 
`CusResNikeName`  char(20) NOT NULL ,
 
`CusName`  char(20) NOT NULL ,
 
`CusAddress`  char(50) NOT NULL ,
 
`CusPhone`  char(15) NOT NULL ,
 
`CusBoughtCardId`  char(30) NOT NULL ,
 
PRIMARY KEY (`CusResNikeName`)
 
)
 
;
```

管理员信息表：

```
CREATE TABLE managerinfo (
 
`ManaID`  char(30) NOT NULL ,
 
`ManaName`  char(20) NOT NULL ,
 
`ManaPasswd`  char(30) NOT NULL ,
 
`ManaIden`  char(20) NOT NULL ,
 
`ManaMail`  char(20) NOT NULL ,
 
PRIMARY KEY (`ManaID`)
 
)
 
;
```

图书类型表：

```
CREATE TABLE booktypeinfo (
 
`BookClass`  char(20) NOT NULL ,
 
`BookClassName`  char(20) NOT NULL ,
 
PRIMARY KEY (`BookClass`)
 
)
 
;
```

附操作bookinfo表的代码，仅仅实现功能，没有错误检查，什么都没有。(纯属应付，和数据库交互不能拼接SQL语句，防止SQL注入。)

```
import pymysql
 
# 参数一：mysql服务所在主机的ip
# 参数二：用户名
# 三：密码
# 四：数据库名
db = pymysql.connect('127.0.0.1', "root", "tian", "managebook")
# 创建一个cursor对象
flag=True
while flag==True:
    cursor = db.cursor()
    print('1:增加')
    print('2:删除')
    print('3:修改')
    print('4:查找')
    print('5:退出')
    print('6:显示')
    work=input('请输入想要执行的功能\n')
    if work=='1':
        print("请输入书籍信息\n")
        s0=input('ISBN号:')
        s1 = input('订单详情:')
        s2 = input('书籍类型:')
        s3 = input('管理员名称:')
        s4 = input('书籍名称:')
        s5 = input('作者:')
        s6 = input('出版年份:')
        s7 = input('成交量:')
        s8 = input('出版社名称:')
        s9 = input('折扣:')
        sql="insert into bookinfo VALUES('%s','%s','%s','%s','%s','%s','%s',%d,'%s',%d );"%(s0,s1,s2,s3,s4,s5,s6,int(s7),s8,int(s9))
        try:
            # 执行sql语句
            cursor.execute(sql)
            # 提交到数据库执行
            db.commit()
            print("增加成功\n")
            # cursor.execute("select * from bookinfo;")
            # data = cursor.fetchall()
            # print(data)
        except:
            # 如果发生错误则回滚
            db.rollback()
            print('ERROR,AGAIN')
    # 执行sql语句
    elif work=='2':
        a=input('请输入要删除的书籍ISBN号\n')
        sql ="delete from bookinfo where BookISBNId='%s'"%a
        try:
            # 执行sql语句
            cursor.execute(sql)
            # 提交到数据库执行
            db.commit()
            print('删除成功\n')
            # cursor.execute("select * from bookinfo;")
            # data = cursor.fetchall()
            # print(data)
        except:
            # 如果发生错误则回滚
            db.rollback()
            print('ERROR,AGAIN')
    elif work=='3':
        cursor.execute("select BookISBNId from bookinfo;")
        data = cursor.fetchall()
        print("ISBN号如下：",data)
        a = input('请输入要修改的书籍ISBN号\n')
        b=input('请输入想要修改的属性和信息\n').split()
        print(b[0],b[1])
        sql = "update bookinfo set %s=%s where BookISBNId='%s'"%(b[0],b[1],a)
        try:
            # 执行sql语句
            cursor.execute(sql)
            # 提交到数据库执行
            db.commit()
            print('修改成功\n')
            # cursor.execute("select * from bookinfo;")
            # data = cursor.fetchall()
            # print(data)
        except:
            # 如果发生错误则回滚
            db.rollback()
            print('ERROR,AGAIN')
    # 获取返回信息
    # data = cursor.fetchall()
    # print(data)
    elif work=='4':
        print('有以下表：bookinfo、booktypeinfo、cusinfo、managerinfo、orderinfo、repertoryinfo')
        a=input('请输入想要查找的信息\n')
 
        sql="select * from %s"%a
        cursor.execute(sql)
 
        # 获取返回信息
        data = cursor.fetchall()
        print('************************结果如下\n',data)
    # 断开连接
    elif work=='5':
        flag=False
    else:
        cursor.execute("select * from bookinfo;")
        data = cursor.fetchall()
        print(data)
cursor.close()
db.close()
```

