const express = require("express")
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const passport = require('passport')
const user = require('./router/user')
const chart = require('./router/chart')
const mydata = require('./router/mydata')
const sport = require('./router/sport')
const more = require('./router/more')

// const cors =require("cors")
const app = express();

//定义socket.io服务器
const server = app.listen(8082);
const io = require('socket.io')(server);


io.on("connection", function(socket)  {
    // send a message to the client
    console.log('socket链接成功');

    //  接收信息
   socket.on('message',data =>{
        console.log(data)

       //广播消息
       socket.broadcast.emit('broadcastmessage',data);
    })
    socket.on("disconnect", function() {
        console.log("a user go out");
    });

})


// mongoose.connect('mongodb://chenhang:zxcvbnm777@cluster0-shard-00-00.nb3yl.mongodb.net:27017,cluster0-shard-00-01.nb3yl.mongodb.net:27017,cluster0-shard-00-02.nb3yl.mongodb.net:27017/sport?ssl=true&replicaSet=atlas-e0belj-shard-0&authSource=admin&retryWrites=true&w=majority')
mongoose.connect('mongodb://127.0.0.1:27017')
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '连接失败'))

//bodyParser:接受post参数
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(cors)

app.use(passport.initialize())
app.use('/server/user', user)
app.use('/server/chart', chart)
app.use('/server/mydata', mydata)
app.use('/server/sport', sport)
app.use('/server/more', more)

require('./config/passportbulid')(passport)
const port = process.env.PORT || 3800;
app.listen(port, () => {
    console.log(`服务器已启动 ${port}`)
})
