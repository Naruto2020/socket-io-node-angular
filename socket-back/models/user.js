const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

let UserSchema = new Schema(
    {
        nom : {
            type: String,
            required: true,
            minlength : 3,
            maxlength : 55
        },
        username : {
            type:String,
            required: true,
            minlength : 3,
            maxlength : 55,
            unique: true,
            trim : true
        },
        password : {
            type: String,
            required: true,
            minlength : 6,
            maxlength : 1024
    
        },
        email : {
            type: String,
            required: true,
            lowercase:true,
            unique:true,
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim:true
        },
    }
);

// hash password 
UserSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }else{
            throw Error("password incorrect");
        }

    }
    throw Error("email incorrect");
};

const User = mongoose.model("User", UserSchema);
module.exports = { User};