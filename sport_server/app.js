const express = require("express")
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const passport = require('passport')
const  user = require('./router/user')
const  chart = require('./router/chart')
const mydata = require('./router/mydata')
const sport = require('./router/sport')
const app = express();
mongoose.connect('mongodb://localhost/sport_server')
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '连接失败'))

    //bodyParser:接受post参数
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(passport.initialize())
app.use('/server/user',user)
app.use('/server/chart',chart)
app.use('/server/mydata',mydata)
app.use('/server/sport',sport)
require('./config/passportbulid')(passport)
const port = process.env.PORT || 3800;
app.listen(port, () => {
    console.log(`服务器已启动 ${port}`)
})