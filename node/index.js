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

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(port, () => {
  console.log('Listening on http://localhost:' + port);
});

io.on('connection', (socket) => {
  console.log('a user connected, socket.id', socket.id);

  socket.on('click', msg => {
    io.emit('confirm', {});
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});
