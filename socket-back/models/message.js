const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MsgSchema = new Schema(
    {
        userMsgId : {
            type: String,
            //require: true
        },
        usernameMsg:{
            type: String,
            //require: true
        },
        mess : {
            type: Object,
            require: true
        }
    }
);

const Msgs = mongoose.model("Msgs", MsgSchema);
module.exports = { Msgs};