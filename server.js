const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const port = process.env.PORT || 8088

const app = express();
const server = require('http').createServer(app);

// Сокеты
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('CHAT_MESSAGE', ({ message, username }) => {
    io.emit('CHAT_UPDATE', { message, username })
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
});

// Логер + статика
app.use(morgan('tiny'))
app.use(express.static("public"))

// Тестовый маршрут для http сервера
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Слушаем порт
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})