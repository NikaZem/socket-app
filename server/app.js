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

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (token === 'secret') {
    next()
  } else {
    const err = new Error('Not authorized')
    err.data = { content: 'Please retry later'}
    next(err)
    }
})

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    socket.emit('message', data)
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
