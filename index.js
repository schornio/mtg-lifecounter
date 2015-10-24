'use strict';

let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.use('/static', express.static(__dirname + '/dist'));

let waitingSocket = null;

io.on('connection', function (socket) {
  socket.on('disconnect', function () {
    if(socket === waitingSocket) {
      waitingSocket = null;
    }
  });

  if(waitingSocket === null) {
    waitingSocket = socket;
  } else {
    pair(socket, waitingSocket);
    waitingSocket = null;
  }
});

function pair(socketA, socketB) {
  console.log('Paired');

  socketA.on('lifecounter', function (data) {
    data.player = revert(data.player);
    socketB.emit('lifecounter', data);
  });

  socketB.on('lifecounter', function (data) {
    data.player = revert(data.player);
    socketA.emit('lifecounter', data);
  });

  socketA.emit('player');
  socketB.emit('player');
}

function revert(player) {
  switch (player) {
    case 'you':
      return 'opponent';
    case 'opponent':
      return 'you';
  }
}
