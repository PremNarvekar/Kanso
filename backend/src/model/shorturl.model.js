import mongoose from "mongoose"

const shorturlSchema = new mongoose.Schema({

    full_url:{
        type:String,
        required: true
    },
    short_url:{
        type:String,
        required: true,
        unique:true,
        index:true
    },
    clicks:{
        type:Number,
        required:true,
        default:0
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    
    }
})

const shorturl = mongoose.model("shorturl" , shorturlSchema)

export default shorturl