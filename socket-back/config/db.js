const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://" +process.env.DB_USER_PASS + "@cluster0.grhuq.mongodb.net/chat-app";

// connexion à mongo db via mongoose 

mongoose.connect(MONGO_URI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err)=>{
        if(!err){
            console.log("connecter avec succes a mongodb!...");
        }else{
            console.log("erreur de connexion avec la bd:" + JSON.stringify(err, undefined, 2));
        }
    }
);

exports.mongoose = mongoose;