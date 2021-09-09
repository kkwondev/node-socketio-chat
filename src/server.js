const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const io = socketio.listen(server);

app.get('/', (req,res) => {
    fs.readFile('./src/chat.html', (error,data) => {
        if (error) {
            console.log(error);
            res.status(500).json({message:"fail"})
        }
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end(data);
    });
    })

// app.get('/', (req,res) => {
//     res.send('hello world');
// })

    io.sockets.on('connection', socket => {
        socket.on('message', data => {
            io.sockets.emit('message',data);
        })
    })

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})