'use strict';
var express=require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../model/user');
/*导入node的加密库*/
var crypto = require('crypto');
/* 创建路由，并使用post接受index传递过来的name和password*/
router.post('/',function(req,res,next){
    var md5=crypto.createHash('md5');
    var password=req.body.password;//获得传递过来的password
    var name=req.body.name;//获得传递过来的name
    md5.update(password+name);//MD5混淆加密内容为password+name
    var pwd=md5.digest('base64');//将加密好的MD5以base64的形式展现出来
    if(pwd===''&&name===''){//假如传递过来的name和password为空
        res.render('home',{title:'发生错误',name:'请输入用户名和密码'});//路由则传递相关错误信息
    }
    //conole.log(pwd+' '+name);
    /* 查询数据库中的name与password是否与用户输入的一致，使用findOne({},callback)方法 */
    user.findOne({name:name,password:pwd},function(err,doc){
        if(err) return next(err);
        if(doc){
            res.render('home',{title:'登陆成功',name:name});
        }else{
            res.render('home',{title:'发生错误',name:'请检查你的用户名与密码'});
        }
    });
});

module.exports=router;