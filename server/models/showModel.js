const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,//movies are already present in movies collection, map it to here with object id
        ref:"movies"
    },
    ticketPrice:{
        type:Number,
        required:true,
    },
    totalSeats:{
        type:Number,
        required:true,
    },
    bookedSeats:{
        type:Array,
        default:[],
    },
    theatre:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"theatres",
        required:true,
    }
}, {timestamps:true});

module.exports = mongoose.model("shows", showSchema);