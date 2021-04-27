const {User} = require("../models/user");

const jwt = require("jsonwebtoken");
require("dotenv").config();

// initialisation de la durée du token 
const maxlife = 3 * 24 * 60 * 60 * 1000; // en milisecondeequivaut à 03 jours 
const createToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn : maxlife,

    });
}

module.exports.singUp =  (req, res)=>{
    const {nom, username, email, password} = req.body;
    try{
        const newUser =  new User({nom, username, email, password});
        newUser.save((err) =>{
            if(!err){
                return res.status(200).json({newUser:newUser._id});
            }else{
                return res.status(500).send(`erreur lors de la création de l'utilisateur ${JSON.stringify(err, undefined, 2)}`);
            }
        });
    }catch(err){
        return res.status(400).send(err);
    }
};

module.exports.singIn = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly:true, sameSite:true, maxlife});
        res.status(200).json({userId: user._id, email : user.email});
      
    }catch(err){
        res.status(400).send(err);
    }
};