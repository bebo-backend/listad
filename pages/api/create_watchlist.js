
import withSession from '../../lib/session'
import {UserData,WatchList} from "../../models/model"
import dbConnect from "../../utils/connectDb"





export const config = {

  api:{  bodyParser:true}
}


export default withSession(async (req, res) => {


  dbConnect()
  
const {watchword,email} = req.body

console.log('body',req.body);


  try {
    // we check that the user exists and store some data in session
   
    const getUser =  await UserData.findOne({email:email},"_id")
    const getWatchWord =  await WatchList.findOne({word:watchword},"word")

console.log("watchword",getWatchWord,getUser);
    
    let createWatchList

    if(getUser && !getWatchWord){

console.log("creating watchword");

      
createWatchList = await WatchList.create({
        word:watchword,
        agentuser:getUser._id,
        
    }, (err,data)=>{

     

        if (err){
          console.log("error-",err);
      
        } else {
      
          console.log("saved watchword");
        }
           
      
      
      }
)



res.status(200).json({success:true})

   


    } else {
      console.log("already added watchword");

res.status(200).json({success:false})

    }

    


 
  

  } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})
