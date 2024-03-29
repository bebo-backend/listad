
import withSession from '../../../lib/session'
import Property,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {email,...form } = req.body


  try {
    // we check that the user exists and store some data in session
   
 
    

    const update =  await UserData.findOneAndUpdate({email:email}, form, data=>{


        
    })

 
   

    if (update){
        res.status(200).json({success:true,message:"updated"})
    } else {
        res.status(200).json({success:false})
    }




   


    } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})
