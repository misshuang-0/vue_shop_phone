#创建用户表 xz_login
CREATE TABLE xz_login(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(25),
    upwd VARCHAR(32)
);

/* INSERT INTO xz_login VALUES(null,'tom',md5('123'));

UPDATE xz_login SET uname = 'aa' WHERE id = 1;

DELETE FROM xz_login WHERE id = 2;

SELECT uname FROM xz_login; */

CREATE TABLE xz_news (
    nid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    imgUrl VARCHAR(255),
    ctime DATETIME,
    points INT,
    content VARCHAR(5000)
);
INSERT INTO xz_news VALUES
(null,'1XX旗舰店大促销！','http://127.0.0.1:3000/img/news/1.png',now(),0,'促销活动：每满100减20！'),
(null,'2XX买一送一！','http://127.0.0.1:3000/img/news/2.png',now(),0,'促销活动：每满100减20！'),
(null,'3XX出血大甩卖！','http://127.0.0.1:3000/img/news/3.png',now(),0,'促销活动：每满100减20！'),
(null,'4XX啊啊啊！','http://127.0.0.1:3000/img/news/4.png',now(),0,'促销活动：每满100减20！'),
(null,'5冬天马上就过了，买它！','http://127.0.0.1:3000/img/news/5.png',now(),0,'促销活动：每满100减20！'),
(null,'6你好，再见','http://127.0.0.1:3000/img/news/6.png',now(),0,'促销活动：每满100减20！'),
(null,'7大促销！','http://127.0.0.1:3000/img/news/7.png',now(),0,'促销活动：每满100减20！'),
(null,'8出血大甩卖！','http://127.0.0.1:3000/img/news/1.png',now(),0,'促销活动：每满100减20！'),
(null,'9XX旗舰店大促销！','http://127.0.0.1:3000/img/news/3.png',now(),0,'促销活动：每满100减20！'),
(null,'10XX啊啊啊旗舰店大促销！','http://127.0.0.1:3000/img/news/5.png',now(),0,'促销活动：每满100减20！'),
(null,'11买不够！','http://127.0.0.1:3000/img/news/7.png',now(),0,'促销活动：每满100减20！'),
(null,'12与你同在！','http://127.0.0.1:3000/img/news/2.png',now(),0,'促销活动：每满100减20！'),
(null,'13旗舰店大促销！','http://127.0.0.1:3000/img/news/4.png',now(),0,'促销活动：每满100减20！'),
(null,'14旗舰店大促销！','http://127.0.0.1:3000/img/news/3.png',now(),0,'促销活动：每满100减20！'),
(null,'15旗舰店大促销！','http://127.0.0.1:3000/img/news/5.png',now(),0,'促销活动：每满100减20！'),
(null,'16旗舰店大促销！','http://127.0.0.1:3000/img/news/1.png',now(),0,'促销活动：每满100减20！');

#创建新闻评论表
CREATE TABLE xz_comment(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nid INT,
    content VARCHAR(120),
    ctime DATETIME
);

#购物车表
CREATE TABLE xz_cart(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    pid INT,
    price DECIMAL(10,2),
    pname VARCHAR(255),
    count INT
);
INSERT INTO xz_cart VALUES
(null,1,1,100,'茶花',1),
(null,2,2,130,'花',1),
(null,3,3,201,'苹果',1),
(null,1,1,100,'茶花',1),
(null,1,1,357,'牛奶',1),
(null,1,3,950,'草莓',1),
(null,3,3,201,'苹果',1),
(null,1,1,100,'茶花',1),
(null,1,1,357,'牛奶',1),
(null,1,3,950,'草莓',1),
(null,3,3,201,'苹果',1),
(null,1,1,100,'茶花',1),
(null,1,1,357,'牛奶',1),
(null,1,3,950,'草莓',1),
(null,1,1,201,'香蕉',1);

#个人项目购物车表
CREATE TABLE my_cart(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    pid INT,
    price DECIMAL(10,2),
    title VARCHAR(255),
    count INT,
    imgUrl VARCHAR(255)
);
INSERT INTO my_cart VALUES
(null,1,1,'802.00','LOUIS QUATORZE瑞克朵丝LQ 女士单肩带手提包LLHL1TL05FA0',1,'img/myproject/md/product1_md1.jpg');

#个人项目商品表
CREATE TABLE xz_product(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    pname VARCHAR(32),
    title VARCHAR(255),
    subtitle VARCHAR(255),
    price DECIMAL(10,2),
    detail VARCHAR(255),
    self_tiem DATETIME,     #上架时间
    sold_count INT      #已售出的数量
);

INSERT INTO xz_product VALUES
(null,'LOUIS QUATORZE','LOUIS QUATORZE瑞克朵丝LQ 女士单肩带手提包LLHL1TL05FA0','2020春新品CK2-50270420粗链条饰翻盖手提单肩包女。','802.00','img/myproject/details/detail1.jpg',1568971268442,5986),
(null,'妖精的口袋 花样年华','妖精的口袋 花样年华 夏季复古国潮重工刺绣短袖衬衫','海量新品 潮流穿搭 玩趣互动','199.80','img/myproject/details/detail2.jpg',1578971268442,43386),
(null,'【毒家自制】毒嫂推荐','部分现货【毒家自制】毒嫂推荐款 秋款圆头套脚金属扣平底单鞋子','2019秋新款邋哥韩国女鞋圆头套脚金属扣流苏平底休闲乐福鞋单鞋潮','268.00','img/myproject/details/detail3.jpg',1548971268442,564),
(null,'LOUIS QUATORZE','LOUIS QUATORZE瑞克朵丝LQ 女士单肩带手提包LLHL1TL05FA0','2020春新品CK2-50270420粗链条饰翻盖手提单肩包女。','802.00','img/myproject/details/detail1.jpg',1568971268442,5986),
(null,'妖精的口袋 花样年华','妖精的口袋 花样年华 夏季复古国潮重工刺绣短袖衬衫','海量新品 潮流穿搭 玩趣互动','199.80','img/myproject/details/detail2.jpg',1578971268442,43386),
(null,'【毒家自制】毒嫂推荐','部分现货【毒家自制】毒嫂推荐款 秋款圆头套脚金属扣平底单鞋子','2019秋新款邋哥韩国女鞋圆头套脚金属扣流苏平底休闲乐福鞋单鞋潮','268.00','img/myproject/details/detail3.jpg',1548971268442,564),

(null,'LOUIS QUATORZE','LOUIS QUATORZE瑞克朵丝LQ 女士单肩带手提包LLHL1TL05FA0','2020春新品CK2-50270420粗链条饰翻盖手提单肩包女。','802.00','img/myproject/details/detail1.jpg',1568971268442,5986),

(null,'妖精的口袋 花样年华','妖精的口袋 花样年华 夏季复古国潮重工刺绣短袖衬衫','海量新品 潮流穿搭 玩趣互动','199.80','img/myproject/details/detail2.jpg',1578971268442,43386),

(null,'LOUIS QUATORZE','LOUIS QUATORZE瑞克朵丝LQ 女士单肩带手提包LLHL1TL05FA0','2020春新品CK2-50270420粗链条饰翻盖手提单肩包女。','802.00','img/myproject/details/detail1.jpg',1568971268442,5986),
(null,'妖精的口袋 花样年华','妖精的口袋 花样年华 夏季复古国潮重工刺绣短袖衬衫','海量新品 潮流穿搭 玩趣互动','199.80','img/myproject/details/detail2.jpg',1578971268442,43386),

(null,'【毒家自制】毒嫂推荐','部分现货【毒家自制】毒嫂推荐款 秋款圆头套脚金属扣平底单鞋子','2019秋新款邋哥韩国女鞋圆头套脚金属扣流苏平底休闲乐福鞋单鞋潮','268.00','img/myproject/details/detail3.jpg',1548971268442,564),
(null,'LOUIS QUATORZE','LOUIS QUATORZE瑞克朵丝LQ 女士单肩带手提包LLHL1TL05FA0','2020春新品CK2-50270420粗链条饰翻盖手提单肩包女。','802.00','img/myproject/details/detail1.jpg',1568971268442,5986);

#个人项目商品图片
CREATE TABLE xz_product_img(
    iid INT PRIMARY KEY AUTO_INCREMENT,
    product_id  INT,        #商品id
    sm VARCHAR(128),        #小图片路径
    md VARCHAR(128)         #中图片路径
);
INSERT INTO xz_product_img VALUES
(null,1,'img/myproject/sm/product1_sm1.jpg','img/myproject/md/product1_md1.jpg'),
(null,1,'img/myproject/sm/product1_sm2.jpg','img/myproject/md/product1_md2.jpg'),
(null,1,'img/myproject/sm/product1_sm3.jpg','img/myproject/md/product1_md3.jpg'),
(null,1,'img/myproject/sm/product1_sm4.jpg','img/myproject/md/product1_md4.jpg'),
(null,1,'img/myproject/sm/product1_sm5.jpg','img/myproject/md/product1_md5.jpg'),
(null,2,'img/myproject/sm/product2_sm1.jpg','img/myproject/md/product2_md1.jpg'),
(null,2,'img/myproject/sm/product2_sm2.jpg','img/myproject/md/product2_md2.jpg'),
(null,2,'img/myproject/sm/product2_sm3.jpg','img/myproject/md/product2_md3.jpg'),
(null,2,'img/myproject/sm/product2_sm4.jpg','img/myproject/md/product2_md4.jpg'),
(null,2,'img/myproject/sm/product2_sm5.jpg','img/myproject/md/product2_md5.jpg'),
(null,3,'img/myproject/sm/product3_sm1.jpg','img/myproject/md/product3_md1.jpg'),
(null,3,'img/myproject/sm/product3_sm2.jpg','img/myproject/md/product3_md2.jpg'),
(null,3,'img/myproject/sm/product3_sm3.jpg','img/myproject/md/product3_md3.jpg'),
(null,3,'img/myproject/sm/product3_sm4.jpg','img/myproject/md/product3_md4.jpg'),
(null,3,'img/myproject/sm/product3_sm5.jpg','img/myproject/md/product3_md5.jpg'),
(null,4,'img/myproject/sm/product1_sm1.jpg','img/myproject/md/product1_md1.jpg'),
(null,4,'img/myproject/sm/product1_sm2.jpg','img/myproject/md/product1_md2.jpg'),
(null,4,'img/myproject/sm/product1_sm3.jpg','img/myproject/md/product1_md3.jpg'),
(null,4,'img/myproject/sm/product1_sm4.jpg','img/myproject/md/product1_md4.jpg'),
(null,4,'img/myproject/sm/product1_sm5.jpg','img/myproject/md/product1_md5.jpg'),
(null,5,'img/myproject/sm/product2_sm1.jpg','img/myproject/md/product2_md1.jpg'),
(null,5,'img/myproject/sm/product2_sm2.jpg','img/myproject/md/product2_md2.jpg'),
(null,5,'img/myproject/sm/product2_sm3.jpg','img/myproject/md/product2_md3.jpg'),
(null,5,'img/myproject/sm/product2_sm4.jpg','img/myproject/md/product2_md4.jpg'),
(null,5,'img/myproject/sm/product2_sm5.jpg','img/myproject/md/product2_md5.jpg'),
(null,6,'img/myproject/sm/product3_sm1.jpg','img/myproject/md/product3_md1.jpg'),
(null,6,'img/myproject/sm/product3_sm2.jpg','img/myproject/md/product3_md2.jpg'),
(null,6,'img/myproject/sm/product3_sm3.jpg','img/myproject/md/product3_md3.jpg'),
(null,6,'img/myproject/sm/product3_sm4.jpg','img/myproject/md/product3_md4.jpg'),
(null,6,'img/myproject/sm/product3_sm5.jpg','img/myproject/md/product3_md5.jpg'),
(null,7,'img/myproject/sm/product1_sm1.jpg','img/myproject/md/product1_md1.jpg'),
(null,7,'img/myproject/sm/product1_sm2.jpg','img/myproject/md/product1_md2.jpg'),
(null,7,'img/myproject/sm/product1_sm3.jpg','img/myproject/md/product1_md3.jpg'),
(null,7,'img/myproject/sm/product1_sm4.jpg','img/myproject/md/product1_md4.jpg'),
(null,7,'img/myproject/sm/product1_sm5.jpg','img/myproject/md/product1_md5.jpg'),
(null,8,'img/myproject/sm/product2_sm1.jpg','img/myproject/md/product2_md1.jpg'),
(null,8,'img/myproject/sm/product2_sm2.jpg','img/myproject/md/product2_md2.jpg'),
(null,8,'img/myproject/sm/product2_sm3.jpg','img/myproject/md/product2_md3.jpg'),
(null,8,'img/myproject/sm/product2_sm4.jpg','img/myproject/md/product2_md4.jpg'),
(null,8,'img/myproject/sm/product2_sm5.jpg','img/myproject/md/product2_md5.jpg'),
(null,9,'img/myproject/sm/product1_sm1.jpg','img/myproject/md/product1_md1.jpg'),
(null,9,'img/myproject/sm/product1_sm2.jpg','img/myproject/md/product1_md2.jpg'),
(null,9,'img/myproject/sm/product1_sm3.jpg','img/myproject/md/product1_md3.jpg'),
(null,9,'img/myproject/sm/product1_sm4.jpg','img/myproject/md/product1_md4.jpg'),
(null,9,'img/myproject/sm/product1_sm5.jpg','img/myproject/md/product1_md5.jpg'),
(null,10,'img/myproject/sm/product2_sm1.jpg','img/myproject/md/product2_md1.jpg'),
(null,10,'img/myproject/sm/product2_sm2.jpg','img/myproject/md/product2_md2.jpg'),
(null,10,'img/myproject/sm/product2_sm3.jpg','img/myproject/md/product2_md3.jpg'),
(null,10,'img/myproject/sm/product2_sm4.jpg','img/myproject/md/product2_md4.jpg'),
(null,10,'img/myproject/sm/product2_sm5.jpg','img/myproject/md/product2_md5.jpg'),
(null,11,'img/myproject/sm/product3_sm1.jpg','img/myproject/md/product3_md1.jpg'),
(null,11,'img/myproject/sm/product3_sm2.jpg','img/myproject/md/product3_md2.jpg'),
(null,11,'img/myproject/sm/product3_sm3.jpg','img/myproject/md/product3_md3.jpg'),
(null,11,'img/myproject/sm/product3_sm4.jpg','img/myproject/md/product3_md4.jpg'),
(null,11,'img/myproject/sm/product3_sm5.jpg','img/myproject/md/product3_md5.jpg'),
(null,12,'img/myproject/sm/product1_sm1.jpg','img/myproject/md/product1_md1.jpg'),
(null,12,'img/myproject/sm/product1_sm2.jpg','img/myproject/md/product1_md2.jpg'),
(null,12,'img/myproject/sm/product1_sm3.jpg','img/myproject/md/product1_md3.jpg'),
(null,12,'img/myproject/sm/product1_sm4.jpg','img/myproject/md/product1_md4.jpg'),
(null,12,'img/myproject/sm/product1_sm5.jpg','img/myproject/md/product1_md5.jpg');