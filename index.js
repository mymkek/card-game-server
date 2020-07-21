const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');

const users = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

io.on('connection', socket => {
    socket.emit('message', 'Welcome to card-game');

    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the game');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the game')
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    });
});

app.use(router);

server.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));