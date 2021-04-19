
import withSession from '../../../lib/session'
import {UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"

import { enGB } from 'date-fns/locale'


export default withSession(async (req, res) => {


  dbConnect()


  try {
    // we check that the user exists and store some data in session
  let user


  let {value} =  req.query

const name = value.split('__')[0]
const val = value.split('__')[1]
const email = value.split('__')[2]

console.log('id',value)

user =  await UserData.updateOne({email:email},{[name]:val})



//console.log('posts',user)


res.status(200).json({success:true})

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
