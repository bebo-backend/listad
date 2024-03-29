
import withSession from '../../../lib/session'
import Post,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"

import { enGB } from 'date-fns/locale'


export default withSession(async (req, res) => {


  dbConnect()


  try {
    // we check that the user exists and store some data in session
  let user


  let {value} =  req.query

const email = value.split('__')[1]
const image = value.split('__')[0]



user =  await UserData.updateOne({email:email},{image:image})

//console.log('update user',user)


res.status(200).json(user)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
