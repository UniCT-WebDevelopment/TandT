const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max: 50,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:500
    },
    city:{
        type:String,
        max:50
    },
    nazionality:{
        type:String,
        max:50
    },
    relazioni:{
        type:Number,
        enum:[1,2,3],
    },
},
 {timestamps:true},

 {
    query:{
      byName(username){
        return this.where({ username: new RegExp(username, 'i') })
      }
    }
  } );

module.exports = mongoose.model("User",UserSchema);