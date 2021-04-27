// load up modules and app init 
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
require("dotenv").config({path:"./config/.env"});
const {mongoose} = require("./config/db").mongoose;
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const corsOptions = {
    origins: 'http://localhost:4200',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};
app.use(cors(corsOptions));

// routes 
app.get("/", (req, res)=>{
    return res.send("<h1>Hello socket ?!!!</h1>")
});
app.use("/api/users", userRoute);
const server = require("http").createServer(app);
module.exports = server;
//exports.server = server; //ici il faut ajoute on call le server dans les autres fichiers comme suit e.g dans le fichier index.js par exemple const server = require("./app").server;