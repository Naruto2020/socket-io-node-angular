// load up modules and app init 
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;


const corsOptions = {
    origins: 'http://localhost:4200',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};
app.use(cors(corsOptions));

app.get("/", (req, res)=>{
    return res.send("<h1>Hello socket ?!!!</h1>")
});

const server = app.listen(PORT, ()=>{
    console.log(`app listening on port : ${PORT}`);
});

/**
 * Partie WebSocket
 */

// initialize a new instance of socket.io
const IOServer = require("socket.io").Server;
const io = new IOServer(server, {
    cors : corsOptions,
});

//  listen on the connection and disconnection
io.on("connect", (socket)=>{
    console.log("le server a accepter la connexion en ws du client... ");
    socket.on("disconnect", ()=>{
        console.log("le server est déconnecter ")
    });
    //Let’s register an event called my message
    socket.on('my message', (msg) => {
        console.log('message du client angular: ' + msg);
    });
});

//emit a 'my broadcat' event from server 
io.on("connect", (socket)=>{
    socket.on('my message', (msg)=>{
        socket.emit('my broadcast', `server :  ${msg}`);
    });
});

//fetch query information on the Backend,
io.on('connection', (socket) => {
    let token = socket.handshake.auth.token;
    console.log("token :",token);
});
 