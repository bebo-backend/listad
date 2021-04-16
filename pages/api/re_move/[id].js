
import withSession from '../../../lib/session'
import Post from "../../../models/model"
import dbConnect from "../../../utils/connectDb"

import { enGB } from 'date-fns/locale'


export default withSession(async (req, res) => {


  dbConnect()


  try {
    // we check that the user exists and store some data in session
  let post


  let {id} =  req.query



//console.log('id',id)

post = await Post.deleteOne({_id:id})



//console.log('posts',post)


res.status(200).json(post)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
