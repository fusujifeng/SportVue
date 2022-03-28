const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
    username: username,
  })
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
                          path: "/editmymsg",
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
                          path: "/userLidt",
                        },
                      ],
                    },
                    {
                      id: "3",
                      name: "用户数据管理",
                      children: [
                        {
                          id: "3-1",
                          name: "用户数据列表",
                          path: "/infoList",
                        },
                      ],
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
        bcrypt.compare(password, user.password).then((isMath) => {
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
                          path: "/editmymsg",
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
                          path: "/messagegocharts",
                        },
                        {
                          id: "2-2",
                          name: "整体数据查询",
                          path: "/searchmyinfo",
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
                          path: "/tempture",
                        },
                        {
                          id: "3-2",
                          name: "体温数据查询",
                          path: "/Stempture",
                        },
                        {
                          id: "3-3",
                          name: "血糖数据分析",
                          path: "/suger",
                        },
                        {
                          id: "3-4",
                          name: "血糖数据查询",
                          path: "/Ssuger",
                        },
                        {
                          id: "3-5",
                          name: "血压数据分析",
                          path: "/pressure",
                        },
                        {
                          id: "3-6",
                          name: "血压数据查询",
                          path: "/Spressure",
                        },
                        {
                          id: "3-7",
                          name: "饮水数据分析",
                          path: "/water",
                        },
                        {
                          id: "3-8",
                          name: "饮水数据查询",
                          path: "/Swater",
                        },
                        {
                          id: "3-9",
                          name: "运动数据分析",
                          path: "/sport",
                        },
                        {
                          id: "3-10",
                          name: "运动数据查询",
                          path: "/Ssport",
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
  User.findOne({
    username: req.body.username,
  }).then((user) => {
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
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) =>
            res.json({
              user: user,
              status: 200,
            })
          )
          .catch((err) => console.log(err));
        // Store hash in your password DB.
      });
    });
  });
});
router.get("/mymsg/:id", (req, res) => {
  User.findOne({
    _id: req.params.id,
  })
    .then((info) => {
      return res.json({
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
// router.post(
//   "/edit/:id",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   (req, res) => {
//     if (req.body.nickname == "" && req.body.avator == "") {
//       return res.json({
//         status: 500,
//         msg: "error",
//       });
//     }
//     const newInfo = {};
//     newInfo.nickname = req.body.nickname;
//     newInfo.avator = req.body.avator;
//     if (newInfo.nickname !== "" && newInfo.avator !== "") {
//       User.findOneAndUpdate(
//         {
//           _id: req.params.id,
//         },
//         {
//           $set: {
//             nickname: newInfo.nickname,
//             avator: newInfo.avator,
//           },
//         },
//         {
//           new: true,
//         }
//       ).then(() =>
//         res.json({
//           status: 200,
//           msg: "success",
//         })
//       );
//     }
//     if (newInfo.avator !== "" && newInfo.nickname == "") {
//       User.findOneAndUpdate(
//         {
//           _id: req.params.id,
//         },
//         {
//           $set: {
//             avator: newInfo.avator,
//           },
//         },
//         {
//           new: true,
//         }
//       ).then(() =>
//         res.json({
//           status: 200,
//           msg: "success",
//         })
//       );
//     }
//     if (newInfo.nickname !== "" && newInfo.avator == "") {
//       User.findOneAndUpdate(
//         {
//           _id: req.params.id,
//         },
//         {
//           $set: {
//             nickname: newInfo.nickname,
//           },
//         },
//         {
//           new: true,
//         }
//       ).then(() =>
//         res.json({
//           status: 200,
//           msg: "success",
//         })
//       );
//     }
//   }
// );
router.get(
  "/allUser/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    User.findOne({
      _id: req.params.id,
    })
      .then((user) => {
        console.log(user);
        if (user.type !== "管理员")
          return res.json({
            status: 400,
            msg: "么有权限",
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
router.post('/edit/',(req,res) => {
  User.findOneAndUpdate({_id:req.body._id},{$set:req.body},{new:true}).then(()=>{
    return res.json({status:200})
  })
})
module.exports = router;
