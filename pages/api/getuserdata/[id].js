
import withSession from '../../../lib/session'
import Property,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {id,page,username } = req.query



  try {
    // we check that the user exists and store some data in session

     const allOptions = {
    page:page ? page:1,
    limit:25,
    lean:true,
    select:" friends ",
  
    
  }


   
    
    const user =  await UserData.findOne({_id:id})
    // const owner =  await UserData.findOne({username:username})


    // const userIsFriend = 


// console.log(user)

res.status(200).json(user)

   


    } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})
