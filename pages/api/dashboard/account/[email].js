
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
select:'username phone email date image'
  }



  try {
    // we check that the user exists and store some data in session
   

    const user =  await UserData.paginate({email:email},options)



console.log('user',user)

const   post =  await Post.find({agentuser:user.docs}).countDocuments()
let postDate
if (post >0) {

 postDate = await Post.find({agentuser:user.docs},'date').sort('date:-1').limit(1)

}

user.docs = user.docs.map(e=>({username:e.username,image:e.image,email:e.email,phone:e.phone,created:e.date,posts:post,'last posted':postDate[0].date}))

res.status(200).json(user)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
