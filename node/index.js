const port = 3001;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});


io.on('connection', (socket) => {
  console.log('a user connected, socket.id', socket.id);
});

io.on('click', (data) => {
  console.log('a user click', data);

  setTimeout(() => {
    io.emit('confirm', {data})
  }, 500);
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
