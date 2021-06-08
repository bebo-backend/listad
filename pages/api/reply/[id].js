
import withSession from '../../../lib/session'
import Post,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 let {id,email} = req.query
 let {text} = req.body



email = id.split('__')[1]
id = id.split('__')[0]

console.log(email,id)

  try {


    const post =  await Post.findOne({_id:id}).populate('agentuser').lean()

const   getUser = await UserData.findOne({email:email})
             let viewData = []


if (getUser){





            
   if (post.replies){

     viewData = [{user:getUser,text},...post.replies] 
   } else {

       viewData = [{user:getUser,text}]
  }



 await Post.findOneAndUpdate({_id:id}, {replies:viewData}, (err,data)=>{
        
             })


}

    



res.status(200).json({done:true})

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
