import mongoose from 'mongoose'
const mongoosePaginate = require("mongoose-pagination-wizard")



const Types = mongoose.Schema.Types






const Views = new mongoose.Schema({
    
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
      user:{type:Types.ObjectId, ref:"UserData"}
  

})

const views = mongoose.models.Views ||  mongoose.model('Views', Views);




const AboutSch = new mongoose.Schema({

    version:{type:String,default:"1.1.0"},
    description:{type:String,default:"Nigeria No. 1 Classified Advertisement App for Job Posting, Promotion, Events, Dating, Sales etc."},
developer:{type:String,default:"Gks. Inc"},
programmer:{type:String,default:"T-Shadrach, Three J.T"},
date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },


  
    })

AboutSch.plugin(mongoosePaginate)

export const About =  mongoose.models.About ||  mongoose.model('About', AboutSch);





const GroupSchem = new mongoose.Schema({

    name:{type:String,required:true},
    title:{type:String,required:true},
    creator:{type:Types.ObjectId, ref:"UserData",required:true},
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
      views:[Views],
  
    })

GroupSchem.plugin(mongoosePaginate)

export const Group =  mongoose.models.Group ||  mongoose.model('Group', GroupSchem);






const Image = new mongoose.Schema({
      image_id:String,
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
  
       })
   
export const Images = mongoose.models.Image ||  mongoose.model('Image', Image);




const UserDataSc = new mongoose.Schema({
    fullname:{type:String},
    phone:{type: String,default: '+234',required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    image:String,
    username:{
        type: String,
        default: 'check email'
      },
  
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
  
    })

UserDataSc.plugin(mongoosePaginate)

export const UserData =  mongoose.models.UserData ||  mongoose.model('UserData', UserDataSc);


const MessageSche = new mongoose.Schema({
    text:{type:String},
    type:{type:String},
    to:{type:Types.ObjectId, ref:"UserData",required:true},
    from:{type:Types.ObjectId, ref:"UserData"},
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
  
    })

MessageSche.plugin(mongoosePaginate)


export const MessageModel =  mongoose.models.MessageModel ||  mongoose.model('MessageModel', MessageSche);











const PostSch = new mongoose.Schema({
    title: {type:String,required:true},
    posting_type:{type:String,required:true},
    description:{type:String,required:true},
    location:String,
  anonymous:{type:String,default:'false'},
   agentuser:{type:Types.ObjectId, ref:"UserData"},
    images:[Image],
    extra_data:{type:String},
   category :{type:String,required:true},
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
    views:[Views],
})







PostSch.plugin(mongoosePaginate)

export default mongoose.models.Post ||  mongoose.model('Post', PostSch);
