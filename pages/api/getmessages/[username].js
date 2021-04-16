
import withSession from '../../../lib/session'
import {UserData,MessageModel} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {username,page } = req.query



  try {
    // we check that the user exists and store some data in session

     const allOptions = {
    page:page ? page:1,
    limit:12,
    lean:true,
    sort:{date:-1},




    
    
  }

   if (username != "undefined"){
     // to:user._id
    const user =  await UserData.findOne({username:username})

    const messages =  await MessageModel.paginate({to:user._id,status:'unread'},allOptions)

const doc = messages.docs

res.status(200).json(doc)


} else {


res.status(200).json([])

}
   
   
   


    } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})
