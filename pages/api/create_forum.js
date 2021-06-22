/*
import withSession from '../../lib/session'
import {UserData,Group} from "../../models/model"
import dbConnect from "../../utils/connectDb"





export const config = {

  api:{  bodyParser:true}
}


export default withSession(async (req, res) => {


  dbConnect()
  
const {forum,email} = req.body

console.log('body',req.body);


  try {
    // we check that the user exists and store some data in session
   
    const getUser =  await UserData.findOne({email:email})

    const getAllUser =  await UserData.find({})
    const getGroup =  await Group.findOne({title:forum,creator:getUser},"title")

console.log("forums",getAllUser,getGroup,getUser);
    
    let createForum

    if(getUser && !getGroup){

console.log("creating watchword");

      
createForum = await Group.create({
        title:forum,
        name:forum,
        creator:getUser._id,
        
    }, (err,data)=>{

     

        if (err){
          console.log("error-",err);
      
        } else {
      
          console.log("saved forum");
        }
           
      
      
      }
).populate('creator')



res.status(200).json({success:true,forum:createForum})

   


    } else {
      console.log("error creating forum");

res.status(200).json({success:false})

    }

    


 
  

  } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})


*/