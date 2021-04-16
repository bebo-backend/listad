
import withSession from '../../../lib/session'
import Post,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {username } = req.query


console.log('usernmaedsffs')
  try {
    // we check that the user exists and store some data in session

let user

user = await UserData.findOne({username:username})


if (user){


res.status(200).json(user)


} else {


res.status(200).json({error:"User not found"})
}

      


    } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})
