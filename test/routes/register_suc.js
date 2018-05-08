'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../model/user');
/*导入node的加密库*/
var crypto = require('crypto');

/* GET home page. */
router.post('/', function(req, res) {
    var md5 = crypto.createHash('md5');
    var name = req.body.name;
    var password = req.body.password;
    if(name==='' && name.length<=0 && password==='' && password.length<=0){
        res.render('register_suc.ejs', {title: '用户名或密码不能为空', name: '', password: ''});
    }else {
        /*MD5加密密码*/
        md5.update(password + name);
        var pwd = md5.digest('base64');//将加密后的md5密码使用base64加密
        //使用findOne查询数据库中是否存在相同的用户名，如果存在则提示更换用户名，否则将内容写入数据库
        user.findOne({name: name}, function (err, doc) {
            if (err) return next(err);
            //查询数据库是否有相同的用户名，假如存在则提示注册失败
            if (doc) {
                res.render('register_suc.ejs', {title: '用户名已经存在，请更换', name: '', password: ''});
            } else {
                /*var usernow =new user({name:name,password:pwd});
                 //如果用户名不存在，则将当前用户名和密码保存到数据库
                 usernow.save();
                 res.render('register_suc.ejs', { title: '注册成功',name:name,password:pwd });*/
                user.create({ // 创建一组user对象置入model
                    name: name,
                    password: pwd
                }, function (err, doc) {
                    if (err) {
                        res.send(500);
                        console.log(err);
                    } else {
                        res.render('register_suc.ejs', {title: '注册成功', name: name, password: pwd});
                        //res.send(200);
                    }
                });
            }
        })
    }
});


module.exports = router;