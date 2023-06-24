const express = require('express')
const { createServer } = require('http');
const { Server } = require('socket.io');
const port = 3000

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:8081",
      }
 });


// маршруты для HTTP
app.get('/', async (req, res) => {
  return res.send(123)
})

app.listen(port, async () => {
  console.log(`Server started`)
})


// запуск сокет сервера
io.on('connection', (socket) => {
  socket.on('message', (data) => {
    socket.join('room:' + data.room_id)
    io.to('room:' + data.room_id).emit('message', data.message)
  })
});

/* setInterval( () => {
    io.emit('ping', {
    ts: (new Date)
  })
}, 10000) */


httpServer.listen(3001);


/* socket.emit('connected', {
  message: 'You`re connected succesfully'
})

socket.on('message', (arg) => {
  console.log(arg);
})

socket.on('disconnect', (reason) => {
  console.log('Client has been disabled');
  console.log(reason);
}) */
