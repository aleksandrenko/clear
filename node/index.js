const port = 3001;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const io = new Server(server, {
  cors: {
    origin: "https://localhost:3333",
    // methods: ["GET", "POST"]
  }
});

//TODO: add io middleware to work with session IDs

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(port, () => {
  console.log('Listening on http://localhost:' + port);
});

//all connections
let sockets = [];

io.on('connection', (socket) => {
  socket.broadcast.emit('user_connected', { user: socket.handshake.query.user });

  sockets.push(socket);

  socket.on("disconnect", (ms) => {
    socket.broadcast.emit('user_disconnected', { user: socket.handshake.query.user });
    sockets = sockets.filter(s => s.id !== socket.id);
  });

  socket.on('move', msg => {
    socket.broadcast.emit(
      'move_confirm',
      { data: msg }
    );
  });

  socket.on('click', msg => {
    // socket.broadcast.emit('click', msg);
    io.emit('click', msg);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});
