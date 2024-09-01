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
    console.log(`socket connection established : socket-id => ${socket.id}`)
})