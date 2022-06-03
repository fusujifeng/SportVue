const express = require("express");
const router = express.Router();
const User = require("../models/User");
//bcrypt加密

const bcrypt = require("bcrypt");
//jwt和passport：验证token的中间件

const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");
const mongoose = require('mongoose')
//
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username})
        .then((user) => {
            if (!user) {
                return res.json({
                    msg: "未查到此人或非管理员",
                    status: 404,
                });

            }
            if (user.type === req.body.type && user.type === "管理员") {
                return bcrypt.compare(password, user.password).then((isMath) => {
                    if (isMath) {
                        const rule = {
                            id: user.id,
                            name: user.username,
                            type: user.type,
                        };
                        jwt.sign(
                            rule,
                            keys.secretOrKey,
                            {
                                expiresIn: 360000,
                            },
                            (err, token) => {
                                if (err) return err;
                                res.json({
                                    status: 200,
                                    success: true,
                                    token: "Bearer " + token,
                                    user: user,
                                    menu: [
                                        {
                                            id: "1",
                                            name: "个人信息管理",
                                            children: [
                                                {
                                                    id: "1-1",
                                                    name: "个人信息查询",
                                                    path: "/mymessage",
                                                },
                                                {
                                                    id: "1-2",
                                                    name: "个人信息修改",
                                                    path: "/mymessagedit",
                                                }
                                            ],
                                        },
                                        {
                                            id: "2",
                                            name: "用户管理",
                                            children: [
                                                {
                                                    id: "2-1",
                                                    name: "用户信息查询",
                                                    path: "/usercontrol",
                                                },
                                                {
                                                    id: "2-2",
                                                    name: "用户数据列表",
                                                    path: "/adminuserlist",
                                                },
                                            ],
                                        },

                                        {
                                            id: "3",
                                            name: "系统日志",
                                            children: [
                                                {
                                                    id: "3-1",
                                                    name: "修改记录",
                                                    path: "/journal",
                                                },
                                                {
                                                    id: "3-2",
                                                    name: "地图",
                                                    path: "/map",
                                                },
                                            ],
                                        },
                                        {
                                            id: "4",
                                            name: "excel表单",
                                            children: [
                                                {
                                                    id: "4-1",
                                                    name: "导出excel",
                                                    path: "/tablepage",
                                                },
                                                {
                                                    id: "4-2",
                                                    name: "导入excel",
                                                    path: "/importexcel",
                                                },
                                                {
                                                    id: "4-3",
                                                    name: "导出诊断图片",
                                                    path: "/upimage",
                                                },

                                            ],
                                        },
                                        {
                                            id: "5",
                                            name: "聊天室",
                                            children: [
                                                {
                                                    id: "5-1",
                                                    name: "在线聊天",
                                                    path: "/wechat",
                                                }
                                                ]
                                        },
                                    ],
                                });
                            }
                        );
                    } else {
                        return res.json({
                            status: 202,
                            msg: "密码错误",
                        });
                    }
                });
            }
            if (user.type === req.body.type && user.type === "用户") {
                // isMath：返回的是一个布尔值
                bcrypt.compare(password, user.password).then((isMath) => {
                    if (isMath) {
                        // 配置token的加密方式，通过user.id加密
                        const rule = {
                            id: user.id,
                            name: user.username,
                            type: user.type,
                        };
                        //通过rule制定的规则加密
                        jwt.sign(
                            rule,
                            keys.secretOrKey,
                            {
                                expiresIn: 360000,
                            },
                            (err, token) => {
                                if (err) return err;
                                res.json({
                                    status: 200,
                                    success: true,
                                    token: "Bearer " + token,
                                    user: user,
                                    menu: [
                                        {
                                            id: "1",
                                            name: "个人信息管理",
                                            children: [
                                                {
                                                    id: "1-1",
                                                    name: "个人信息查询",
                                                    path: "/mymessage",
                                                },
                                                {
                                                    id: "1-2",
                                                    name: "个人信息修改",
                                                    path: "/mymessagedit",
                                                }
                                            ],
                                        },
                                        {
                                            id: "2",
                                            name: "整体数据测绘(粗略)",
                                            children: [
                                                {
                                                    id: "2-1",
                                                    name: "整体数据分析",
                                                    path: "/alldatainput",
                                                },
                                                {
                                                    id: "2-2",
                                                    name: "整体数据查询",
                                                    path: "/alldatasearch",
                                                },
                                            ],
                                        },
                                        {
                                            id: "3",
                                            name: "部分数据测绘(详细)",
                                            children: [
                                                {
                                                    id: "3-1",
                                                    name: "体温数据分析",
                                                    path: "/temperatureinput",
                                                },
                                                {
                                                    id: "3-2",
                                                    name: "体温数据查询",
                                                    path: "/temperaturesearch",
                                                },
                                                {
                                                    id: "3-3",
                                                    name: "血糖数据分析",
                                                    path: "/sugarinput",
                                                },
                                                {
                                                    id: "3-4",
                                                    name: "血糖数据查询",
                                                    path: "/sugarsearch",
                                                },
                                                {
                                                    id: "3-5",
                                                    name: "血压数据分析",
                                                    path: "/pressureinput",
                                                },
                                                {
                                                    id: "3-6",
                                                    name: "血压数据查询",
                                                    path: "/pressureSearch",
                                                },
                                                {
                                                    id: "3-7",
                                                    name: "饮水数据分析",
                                                    path: "/waterinput",
                                                },
                                                {
                                                    id: "3-8",
                                                    name: "饮水数据查询",
                                                    path: "/watersearch",
                                                },
                                            ]
                                        },
                                        {
                                            id: "4",
                                            name: "运动数据",
                                            children: [
                                                {
                                                    id: "4-1",
                                                    name: "运动数据分析",
                                                    path: "/sportinput",
                                                },
                                                {
                                                    id: "4-2",
                                                    name: "运动数据查询",
                                                    path: "/sportsearch",
                                                },
                                            ]
                                        },


                                        {
                                            id: "5",
                                            name: "更多信息",
                                            children: [
                                                {
                                                    id: "5-1",
                                                    name: "地图",
                                                    path: "/map",
                                                },

                                            ]
                                        }
                                    ],
                                });
                            }
                        );
                    } else {
                        return res.json({
                            status: 202,
                            msg: "用户密码错误",
                        });
                    }
                });
            } else {
                return res.json({
                    status: 400,
                    msg: "非用户账号",
                });
            }
        })
        .catch((err) => {
            return res.json({
                err: err,
                status: 500,
            });
        });
});

router.post("/register", (req, res) => {
    User.findOne({username: req.body.username}).then((user) => {
        if (user) {
            return res.json({
                msg: "此用户名已被注册",
                status: 201,
            });
        }
        const newUser = new User({
            password: req.body.password,
            username: req.body.username,
            name: req.body.name,
            age: parseInt(req.body.age),
            sex: req.body.sex,
            type: req.body.type,
            phone: parseInt(req.body.phone),
        });

        //调用genSalt方法加密
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;


                //存储注册用户进数据库
                newUser.save().then((user) =>
                    res.json({
                        user: user,
                        status: 200,
                    })
                )
                    .catch((err) => console.log(err));

            });
        });
    });
});

//通用--个人信息查询：
//根据id查找返回自己的信息
router.get("/mymessagesearch/:id", (req, res) => {
    User.findOne({
        _id: req.params.id,
    })
        .then((info) => {
        return res.json({
            //返回自己的info
            status: 200,
            myinfo: info,

        });
    })
        .catch((err) => {
            return res.json({
                err: err,
                status: 500,
            });
        });
});

//通用--个人信息修改
//$Set是mongodb中替换内容的方法。new：true 是否返回一个新的信息
router.post('/mymessage-edit/', (req, res) => {
    User.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, {new: true}).then(() => {
        return res.json({status: 200})
    })
})

//管理员--用户管理
//authenticate验证token，有token才能访问
router.get(
    "/allUser/:id", passport.authenticate("jwt", {session: false,}),
    (req, res) => {
        User.findOne({
            _id: req.params.id,
        })
            .then((user) => {
                if (user.type !== "管理员")
                    return res.json({
                        status: 400,
                        msg: "没有权限",
                    });
                User.find()
                    .then((all) => {
                        return res.json({
                            status: 200,
                            allUser: all,
                        });
                    })
                    .catch((err) => {
                        return res.json({
                            status: 404,
                        });
                    });
            })
            .catch((err) => {
                return res.json({
                    status: 500,
                });
            });
    }
);
router.delete("/delete/:id", (req, res) => {
    User.deleteOne({
        _id: req.params.id,
    }).then(() => {
        return res.json({
            status: 200,
            msg: "success",
        });
    });
});

//随机生成数据
router.post('/create', (req, res) => {
    const user = {}
    user.username = 'simulation' + parseInt(Math.random() * (100 - 1))
    user.password = '123456'
    user.type = '用户'
    user.name = '模拟生成数据'
    user.age = 12
    user.sex = '男'
    user.phone = 12345678

    function randomArrayCreate(length, min, max) {
        const arr = []
        for (let i = 0; i < length; i++) {
            let data = parseInt(Math.random() * (max - min + 1) + min)
            arr.push(data)
        }
        return arr
    }

    User.findOne({username: user.username}).then(us => {
        const newUser = new User(user)
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then((users) => {
                    id = mongoose.Types.ObjectId(users._id).toString()
                    const newdata = {}
                    newdata.temperature = randomArrayCreate(5, 36, 38)
                    newdata.bloodSuger = randomArrayCreate(6, 3, 10)
                    newdata.bloodPressure = randomArrayCreate(3, 80, 140)
                    newdata.water = randomArrayCreate(5, 200, 600)
                    newdata.id = id
                    new Chart(newdata).save().then((success) => {
                        return res.json({status: 200, data: success, user: users})
                    })
                })
                    .catch((err) => console.log(err));
            })
        })
    })
})

module.exports = router;
