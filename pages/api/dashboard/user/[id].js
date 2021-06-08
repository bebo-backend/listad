
import withSession from '../../../../lib/session'
import Post,{UserData} from "../../../../models/model"
import dbConnect from "../../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {page,id } = req.query




  try {
    // we check that the user exists and store some data in session
   

    const user =  await UserData.findOne({_id:id}).select('username fullname date image phone')


//console.log(user)

res.status(200).json({success:true,user})


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
