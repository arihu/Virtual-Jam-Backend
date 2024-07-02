const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('notePress', (data) => {
        console.log("Received Note from + " + socket.handshake.address + ": {" + data.note + ", " + data.instrument + "}")
        io.emit('notePress', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});