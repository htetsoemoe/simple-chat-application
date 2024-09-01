const express = require('express')
const socket = require('socket.io')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + `/public/index.html`)
})

/** Express Server Setup */
const server = app.listen(3500, () => {
    console.log(`project is running on localhost:3500`)
})

/** Socket Setup */
const io = socket(server)
io.on('connection', (socket) => {
    // console.log(`socket connection established : socket-id => ${socket.id}`)

    /** 
     *  socket server listen 'chat' event with 'data' from client(socket) and
     *  sent that event and data to other clients(sockets)
     */
    socket.on('chat', (data) => {
        io.sockets.emit("chat", data)
    })

    /**
     *  socket server listen 'typing' event with 'name' from client(socket) and
     *  broadcast that 'name' to other clients(sockets) excluding senderClient(socket)
     */
    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name)
    })
})