import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    like:{
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    bookmarks:{
        type:Array,
        default:[]
    }
},{timestamps:true});

export const Tweet = mongoose.model("Tweet",TweetSchema);