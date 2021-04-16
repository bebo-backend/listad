
import withSession from '../../../lib/session'
import Post,{UserData,Group,ForumMessage} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"
import {sortBy, reverse} from 'lodash'
import { enGB } from 'date-fns/locale'


export default withSession(async (req, res) => {


  dbConnect()


  
    // we check that the user exists and store some data in session
  let posts



  let {query,page,email,sort} =  req.query


console.log('search_filter', req.query)












  const allOptions = {
    sort:{date:-1},
    lean:true,
    limit:1,
  }





  function getDate(){

let c = new Date()

  return [c.getFullYear(),c.getMonth(),0]

}







try{



const getGroup =  await Group.findOne({name:query},"_id")


posts =  await ForumMessage.paginate({forum:getGroup._id},allOptions)


console.log(posts)


res.status(200).json({message:posts.docs.messages})

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
