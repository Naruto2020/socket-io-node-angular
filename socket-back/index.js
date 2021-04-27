const server = require("./app"); // .server autre cas 

const corsOptions = {
    origins: 'http://localhost:4200',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};

server.listen(process.env.PORT, ()=>{
    console.log(`app listening on port : ${process.env.PORT}`);
});


/**
 *  WebSocket
 */

// initialize a new instance of socket.io
const IOServer = require("socket.io").Server;
const io = new IOServer(server, {
    cors : corsOptions,
});

const {User} = require("./models/user");
const {Msgs} = require("./models/message");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require("jsonwebtoken");
require("dotenv").config();

// initialisation de la durée du token 
const maxlife = 3 * 24 * 60 * 60 * 1000; // en milisecondeequivaut à 03 jours 
const createToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn : maxlife,

    });
}


//fetch query information on the Backend,
/*io.on('connect', (socket) => {
    let token = socket.handshake.auth.token;
    console.log("token :",token);
});*/

// chat 

// creation des variables qui vont stocker toutes les connexions et les joueurs
let allConnexions = [];
let allUsers = [];

io.on("connect", (socket)=>{
    Msgs.find().then(res =>{
        socket.emit("display-mesg", res)
    });

    // on récupère les informations du formulaire en cas de  connexion
    socket.on("connexion", async(data) => {
        
        const user = await User.login(data.email, data.password);
        console.log("testt",user)

        if(user){
            //console.log(data);
            allUsers.push(socket.id);
            console.log(allUsers);
            // on repond au client
            socket.broadcast.emit("connexionRep", { success: true });
        }else{
            socket.broadcast.emit("connexionRep", { success: false });
        }
    });

    socket.on('message', (msg)=>{

        const message = new Msgs({mess : msg});
        message.save().then(()=>{
            console.log('message du client : ' + msg.data);
            socket.broadcast.emit('new message', msg);

        });
    });

});

// nb to emit message you can use also io.emit instead of socket.broadcast.emit
 