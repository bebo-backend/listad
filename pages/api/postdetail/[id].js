
import withSession from '../../../lib/session'
import Post,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 let {id,email} = req.query

email = id.split('__')[1]
id = id.split('__')[0]

  try {


    const post =  await Post.findOne({_id:id}).populate('agentuser').lean()

const   getUser = await UserData.findOne({email:email})

const   postUser = await UserData.findOne({email:post.agentuser.email})

if (getUser){



             let viewData = []

            
   if (post.views){

     viewData = [...post.views,{getUser}] 
   } else {

       viewData = [{getUser}]
  }



 await Post.findOneAndUpdate({_id:id}, {views:viewData}, (err,data)=>{
        
             })


}

    



post.agentuser = postUser


//console.log(post)


res.status(200).json(post)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
