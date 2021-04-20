
import withSession from '../../../lib/session'
import {UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"

export default withSession(async (req, res) => {
  dbConnect()
  


const {username,email,image,password} = req.body



  try {


   const getUser =  await UserData.findOne({email:email})

 if (getUser){

   res.status(200).json({success:false,error:"Account already exists, change email."})

   } else {

 
const createUser = await UserData.create(req.body)

const user = { isLoggedIn: true, username,email,image:image ? image :null}

res.status(200).json({success:true})

}



    

  } catch (error) {
 
console.log(error)
    res.status(200).json({success:false,error:error.message})
  }


	



})
