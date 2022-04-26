const port = 3001;
const COLORS = ['#FFB900', '#E74856', '#0078D7', '#FF8C00', '#8E8CD8', '#038387', '#C239B3', '#10893E'];

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

const getConnectedUser = (socket, index) => {
  return {
    username: socket.handshake.query.user,
    id: socket.id,
    color: COLORS[index]
  }
}

io.on('connection', (socket) => {
  sockets.push(socket);

  io.emit('user_connected', {
    users: sockets.map((s, i) => {
      return getConnectedUser(s, i);
    })
  });

  socket.on("disconnect", (ms) => {
    sockets = sockets.filter(s => s.id !== socket.id);

    io.emit('user_disconnected', {
      users: sockets.map((s, i) => {
        return getConnectedUser(s, i);
      })
    });
  });

  socket.on('move', msg => {
    socket.broadcast.emit(
      'move_confirm',
      {
        ...msg,
        id: socket.id
      }
    );
  });

  socket.on('click', msg => {
    socket.broadcast.emit('click', {
      ...msg,
      id: socket.id
    });
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});
