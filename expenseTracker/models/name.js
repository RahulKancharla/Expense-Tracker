const mongoose =require('mongoose')
const alienSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('Alien',alienSchema)
