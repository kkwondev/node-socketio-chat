const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const PORT = 3000;
// const io = socketio.listen(server);
const authRouter = require('./routes/auth');
const {sequelize} = require('./models');

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// app.get('/', (req,res) => {
//     fs.readFile('./src/public/chat.html', (error,data) => {
//         if (error) {
//             console.log(error);
//             res.status(500).json({message:"fail"})
//         }
//         res.writeHead(200, {'Content-Type': "text/html"});
//         res.end(data);
//     });
//     })
//
//
//     io.sockets.on('connection', socket => {
//         socket.on('message', data => {
//             io.sockets.emit('message',data);
//         })
//     })

app.use('/auth',authRouter);


sequelize.sync().then(() => {
    console.log("데이터 베이스 연결 완료.")
}).catch((e) => {
    console.error(e);
})

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})