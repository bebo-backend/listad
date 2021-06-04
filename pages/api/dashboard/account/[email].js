
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





if (user.docs.length > 0){

const user_data = user.docs[0]
const   post =  await Post.find({agentuser:user_data._id}).countDocuments()

console.log('user',user_data)

let postDate = ""

if (post > 0) {

 postDate = await Post.find({agentuser:user_data._id},'date').sort('date:-1').limit(1)


console.log('post',postDate)

if (postDate){
postDate = postDate.date
} else {

postDate=""

}

}


user.docs = [{username:user_data.username,fullname:user_data.fullname,
image:user_data.image,email:user_data.email,
phone:user_data.phone,created:user_data.date,posts:post,
'last posted':postDate}]



res.status(200).json(user)


}




   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
