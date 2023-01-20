import express from "express";
import http from "http"
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const server =http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('chat message',(msg)=>{
        io.emit('chat message', msg);
        console.log('message:'+ msg);
    });
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //   });
});

server.listen(9000,()=>{
    console.log('listning on *:9000');
});
