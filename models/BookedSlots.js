const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bookedslotSchema = new Schema({
    location:{
        type:Schema.Types.ObjectId,
        ref:'location'
    },
    slotnumber:{
        type: Number,
        required: true
    },
    starttime:{
        type:Date, 
        required: true
    },
    endtime:{
        type:Date,
        required: true
    },
    vehiclenumber:{
        type:String,
        required: true
    },
    vehicletype: {
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})
const BookedSlot = mongoose.model("bookedslot",bookedslotSchema);

module.exports = BookedSlot;