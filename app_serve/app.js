const multer = require('multer');
const fs = require('fs');
var upload = multer({dest:'upload/'});
const session = require('express-session');
// 1.引入express 模块
const express = require('express');
// 创建 express 对象
var server = express();
// 为 express 对象绑定监听端口
// 监听端口
server.listen(3000);
// 配置session
server.use(session({
    secret: '128位随机字符串',       //转为128位随机字符串
    resave: false,      //每次请求是否更新session
    saveUninitialized: true,    //初始化保存数据
    cookie:{
        maxAge: 1000*60*30      //session对象存活时间,不影响session生命周期
    }
}))

// 引入post传输数据模块
const bodyParser = require('body-parser');
// 配置json是否自动转换
server.use(bodyParser.urlencoded({
    extended:false
}))
// 1.引入mysql 模块
const mysql = require('mysql');
// 创建连接池
var pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'xz',
    connectionLimit: 20
});
// 引入cors跨域模块
const cors = require('cors');

// 在服务器端配置允许来自8080端口的所有请求
server.use(cors({
    origin:[
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://localhost:8081',
        'http://127.0.0.1:8081',
    ],
    credentials: true,
}))

// 静态资源
server.use(express.static('public'));

// 登录
server.post('/login',(req,res)=>{
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    // console.log('用户名：'+uname);
    // console.log('密码：'+upwd);
    if(!uname){
        res.send({
            code: -1,
            msg:'用户名不能为空！'
        });
        return;
    }
    if(!upwd){
        res.send({
            code: -1,
            msg:'密码不能为空！'
        });
        return;
    }
    
    pool.query('SELECT uid,avatar FROM xz_user WHERE uname=? AND upwd=?',[uname,upwd],(err,result)=>{
        if(err) throw err;
        // console.log(result)
        if(result.length > 0){
            req.session.uid = result[0].uid;
            res.send({
                code: 1,
                data:result,
                msg: '登录成功！'
            });
        }else{
            res.send({
                code: -1,
                msg: '用户名或密码错误！'
            })
        }
    })
})

// 个人项目(myproject)：注册--添加新用户
server.post('/register',(req,res)=>{
    uname = req.body.uname;
    upwd = req.body.upwd;
    email = req.body.email;
    phone = req.body.phone;
    if(!uname){
        res.send({
            code:-1,
            msg:'用户名不能为空'
        });
        return;
    }
    if(!upwd){
        res.send({
            code:-1,
            msg:'密码不能为空'
        });
        return;
    }
    if(!email){
        res.send({
            code:-1,
            msg:'邮箱不能为空'
        });
        return;
    }
    if(!phone){
        res.send({
            code:-1,
            msg:'联系方式不能为空'
        });
        return;
    }
    var sql = 'INSERT INTO xz_user(uid,uname,upwd,email,phone,avatar) VALUES(null,?,?,?,?,"img/avatar/default.png")';
    pool.query(sql,[uname,upwd,email,phone],(err,result)=>{
        if(err) throw err;
        res.send({
            code:1,
            msg:'注册成功'
        })
    })
})

// // 个人项目(myproject)：是否登录
server.get('/isLogin',(req,res)=>{
    var uid = req.session.uid;
    pool.query('SELECT uname FROM xz_user WHERE uid=?',[uid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({
                code : 1,
                msg : '已登录'
            })
        }else{
            res.send({
                code: -1,
                msg: '请登录'
            })
        }
    })
})

// 个人项目(myproject)：个人中心
server.get('/personal',(req,res)=>{
    var uid = req.session.uid;
    var sql = 'SELECT uid,uname,avatar FROM xz_user WHERE uid=?';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({
                code:1,
                data: result
            })
        }else{
            res.send({
                code:-1,
                msg:'请登录后再来'
            })
        }
    })
})

// 商品列表
server.get('/list',(req,res)=>{
    var pno = req.query.pno;
    var pageCount = req.query.pageCount;
    if(!pno){
        pno = 1;
    }
    if(!pageCount){
        pageCount = 6;
    };
    var sql = 'SELECT l.lid,l.lname,l.price,p.md FROM xz_laptop l,xz_laptop_pic p WHERE l.lid=p.laptop_id group by lid limit ?,?';
    pageCount = parseInt(pageCount);
    var offset = (pno - 1) * pageCount;
    pool.query(sql,[offset,pageCount],(err,result)=>{
        if(err) throw err;
        res.send({
            code: 1,
            data: result
        })
    })
});

// 个人项目(myproject)：商品列表
server.get('/mylist',(req,res)=>{
    var pno = req.query.pno;
    var pageCount = parseInt(req.query.pageCount);
    var data = [];
    if(!pno){
        pno = 1;
    }
    if(!pageCount){
        pageCount = 4;
    }
    pno = (pno-1) * pageCount;
    var sql = 'SELECT pid,pname,subtitle,price,listPic FROM xz_product LIMIT ?,?';
    pool.query(sql,[pno,pageCount],(err,result)=>{
        if(err) throw err;
        data.push(result);
        var sql = 'SELECT count(pid) FROM xz_product';
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            data.push(result[0]);
            res.send({
                code:1,
                data:data
            })
        })
    })
})

//轮播图片
server.get('/swipeImg',(req,res)=>{
    var imgs = [
        {id:1,imgUrl:"http://127.0.0.1:3000/img/index/banner2.jpg"},
        {id:2,imgUrl:"http://127.0.0.1:3000/img/index/banner1.jpg"},
        {id:3,imgUrl:"http://127.0.0.1:3000/img/index/banner3.jpg"},
    ];
    res.send(imgs);
}) 

// 九宫格图片
server.get('/grid',(req,res)=>{
    var gridImg = [
        {id:1,title:'新闻资讯',url:'http://127.0.0.1:3000/img/grid/menu1.png'},
        {id:2,title:'商品',url:'http://127.0.0.1:3000/img/grid/menu2.png'},
        {id:3,title:'点餐',url:'http://127.0.0.1:3000/img/grid/menu3.png'},
        {id:4,title:'位置',url:'http://127.0.0.1:3000/img/grid/menu4.png'},
        {id:5,title:'搜索',url:'http://127.0.0.1:3000/img/grid/menu5.png'},
        {id:6,title:'电话',url:'http://127.0.0.1:3000/img/grid/menu6.png'},
    ];
    res.send(gridImg);
})

// 新闻列表
server.get('/news',(req,res)=>{
    var pno = req.query.pno;
    var pageCount = parseFloat(req.query.pageCount);
    if(!pno){
        pno = 1;
    }
    if(!pageCount){
        pageCount = 7;
    }
    pno = (pno - 1)* pageCount;
    pool.query('SELECT nid,title,imgUrl,ctime,points FROM xz_news LIMIT ?,?',[pno,pageCount],(err,result)=>{
        if(err) throw err;
        res.send({
            code:1,
            data:result
        });
    });
})

// 查询新闻内容
server.get('/newsInfo',(req,res)=>{
    var nid = parseInt(req.query.nid);
    var reg = /^[0-9]{1,}$/
    if(!reg.test(nid)){
        res.send({
            code:-1,
            msg: '参数格式不正确'
        })
    }
    pool.query('SELECT imgUrl,title,ctime,content FROM xz_news WHERE nid=?',[nid],(err,result)=>{
        if(err) throw err;
        res.send({
            code:1,
            data: result
        })
    })
})

// 发表评论
server.post('/addComment',(req,res)=>{
    var content = req.body.content;
    var nid = req.body.nid;
    // console.log(content,nid)
    var sql = 'INSERT INTO xz_comment(id,nid,content,ctime) VALUES(null,?,?,now())';
    // var ctime = new Date();
    pool.query(sql,[nid,content],(err,result)=>{
        if(err) throw err;
        res.send({
            code:1,
            msg: '评论成功！'
        });
    })
})

//评论列表
server.get('/commentList',(req,res)=>{
    var nid = req.query.nid;
    var pno = req.query.pno;
    var pageCount = parseInt(req.query.pageCount);
    if(!pno){
        pno = 1;
    }
    if(!pageCount){
        pageCount = 5;
    }
    pno = (pno - 1)* pageCount;
    pool.query('SELECT id,content,ctime FROM xz_comment WHERE nid = ? LIMIT ?,?',[nid,pno,pageCount],(err,result)=>{
        if(err) throw err;
        res.send({
            code:1,
            data: result
        });
    });
})

// 查询购物车列表
server.get('/shopCart',(req,res)=>{
    // uid,用户登录后保存到服务器的
    var uid = req.session.uid;    //获取session的id值
    pool.query('SELECT id,pid,price,pname,count FROM xz_cart WHERE uid = ?',[uid],(err,result)=>{
        if(err) throw err;
        res.send(result);
        // console.log(result[0].count);
    })
})

// 个人项目(myproject)：查看购物车列表
server.get('/myShopCart',(req,res)=>{
    var uid = req.session.uid;  //获取session的id值
    pool.query('SELECT cid,pid,price,title,count,imgUrl FROM my_cart WHERE uid=?',[uid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// 删除购物车商品
server.post('/delCart',(req,res)=>{
    var id = parseInt(req.body.id);
    pool.query('DELETE FROM xz_cart WHERE id=?',[id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                code:1,
                msg: '删除成功！'
            });
        }else{
            res.send({
                code:-1,
                msg: '删除失败'
            });
        }
    })
});

// 删除购物车多个商品
server.get('/del',(req,res)=>{
    var checkId = req.query.checkId;
    // console.log(checkId);
    pool.query('DELETE FROM my_cart WHERE cid IN('+checkId+')',(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({
                code: 1,
                msg : '删除成功'
            });
        }else{
            res.send({
                code: -1,
                msg: '删除失败'
            })
        }
    })
})

// 获得商品详情页信息
server.get('/details',(req,res)=>{
    var uid = req.session.uid;
    var lid = req.query.lid;
    var data = [];
    console.log(uid);
    data.push(uid);
    var sql = 'SELECT lname,price,title,os,memory,resolution FROM xz_laptop WHERE lid=?';
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        data.push(result);
        var sql2 = 'SELECT md FROM xz_laptop_pic WHERE laptop_id=?';
        pool.query(sql2,[lid],(err,result)=>{
            if(err) throw err;
            data.push(result);
            res.send({
                code:1,
                data
            });
        })
    })
})

// 个人项目(myproject): 商品详情页信息
server.get('/detail',(req,res)=>{
    var pid = req.query.pid;
    var data = [];
    var sql = 'SELECT pid,title,subtitle,price,sold_count,detail From xz_product WHERE pid=?';
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        data.push(result[0]);
        var sql = 'SELECT md FROM xz_product_img WHERE product_id=?';
        pool.query(sql,[pid],(err,result)=>{
            if(err) throw err;
            data.push(result);
            res.send({
                code: 1,
                data: data
            })
        })
    })
})

// 给购物车表添加数据
server.post('/addCart',(req,res)=>{
    var uid = req.session.uid;
    var pid = req.body.lid;
    var price = req.body.price;
    var pname = req.body.lname;
    var sql = 'SELECT id FROM xz_cart WHERE pid = ? AND uid=?';
    pool.query(sql,[pid,uid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            var sql = `UPDATE xz_cart SET count=count+1 WHERE pid=${pid} AND uid=${uid}`;
        }else{
            var sql = `INSERT INTO xz_cart(id,uid,pid,price,pname,count) VALUES(null,${uid},${pid},${price},'${pname}',1)`;
        }
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows > 0){
                res.send({
                    code: 1,
                    msg: '添加成功'
                })
            }
        })
    })
})

// 个人项目(myproject): 给购物车表添加数据
server.post('/myAddCart',(req,res)=>{
    var uid = req.session.uid;
    var pid = req.body.pid;
    var price = req.body.price;
    var title = req.body.title;
    var imgUrl = req.body.imgUrl;
    var count = req.body.count;
    // console.log(uid);
    if(!uid){
        res.send({
            code:-1,
            msg:'请登录'
        });
        return;
    }
    // 如果没有穿过来数据，默认为1
    if(!count){
        count = 1;
    }
    var sql = 'SELECT cid FROM my_cart WHERE pid=? AND uid=?';
    pool.query(sql,[pid,uid],(err,result)=>{
        if(err) throw err;
        // console.log(result);
        if(result.length > 0){
            var sql = `UPDATE my_cart SET count=count+${count} WHERE pid=${pid} AND uid=${uid}`;
        }else{
            var sql = `INSERT INTO my_cart(cid,uid,pid,price,title,count,imgUrl) VALUES(null,${uid},${pid},'${price}','${title}',${count},'${imgUrl}')`;
        }
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows > 0){
                res.send({
                    code:1,
                    msg:'添加成功'
                })
            }
        })
    })
})

// 个人项目(myproject): 改变购物车商品数量
server.get('/changeNum',(req,res)=>{
    var cid = req.query.cid;
    var count = req.query.count;
    pool.query('UPDATE my_cart SET count=? WHERE cid=?',[count,cid],(err,result)=>{
        if(err) throw err;
        res.send({
            code: 1,
            msg:'修改成功'
        })
    })
})

// 小程序：完成上传图片
server.post('/uploadFile',upload.single('mypic'),(req,res)=>{
    var src = req.file.originalname;
    var i = src.lastIndexOf('.');
    var suff = src.substring(i);
    var time = new Date().getTime();
    var dest = time + Math.floor(Math.random() * 10000) + suff;
    var newFile = __dirname + '/public/upload/' + dest;
    // 移动文件到临时文件夹
    fs.renameSync(req.file.path,newFile);
    res.send({
        code:1,
        msg:'上传成功！'
    })
})

// 个人项目(myproject): 商品搜索
server.get('/mysearch',(req,res)=>{
    var pno = req.query.pno;
    var pageCount = parseInt(req.query.pageCount);
    var key = req.query.key;
    if(!pno){
        pno = 1;
    }
    if(!pageCount){
        pageCount = 4;
    }
    var pno = (pno-1) * pageCount;
    var sql = "SELECT pid,title,subtitle,price,listPic FROM xz_product WHERE title LIKE concat('%',?,'%') LIMIT ?,?";
    pool.query(sql,[key,pno,pageCount],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            var data = result;
            var sql = `SELECT count(pid) FROM xz_product WHERE title LIKE concat('%','${key}','%')`;
            pool.query(sql,(err,result)=>{
                if(err) throw err;
                var myCount = {};
                myCount = result[0];
                res.send({
                    code:1,
                    data:data,
                    count: myCount
                })
            })
        }else{
            res.send({
                code: -1,
                msg:'您搜索的商品暂时没有哦，请试试其它的关键词'
            })
        }
    })
})

// 小程序：商品搜索
server.get('/search',(req,res)=>{
    var pno = req.query.pno;
    var pageCount = parseInt(req.query.pageCount);
    var key = req.query.key;
    if(!pno){
        pno = 1;
    }
    if(!pageCount){
        pageCount = 4;
    }
    var pno = (pno-1) * pageCount;
    var sql = "SELECT lid,title,price FROM xz_laptop WHERE title LIKE concat('%',?,'%') LIMIT ?,?";
    pool.query(sql,[key,pno,pageCount],(err,result)=>{
        if(err) throw err;
        res.send({
            code:1,
            data:result
        })
    })
})