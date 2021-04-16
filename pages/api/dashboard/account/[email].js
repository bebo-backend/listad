
import withSession from '../../../../lib/session'
import Post,{UserData} from "../../../../models/model"
import dbConnect from "../../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {page,email } = req.query


//console.log(email)
     const options = {

  page:page ? page:1,
    lean:true,
select:'username phone email date'
  }



  try {
    // we check that the user exists and store some data in session
   

    const user =  await UserData.paginate({email:email},options)



//console.log('user',user)

const   post =  await Post.find({agentuser:user.docs}).countDocuments()

user.docs = user.docs.map(e=>({phone:e.phone,username:e.username,email:e.email,created:e.date,posts:post}))

res.status(200).json(user)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
