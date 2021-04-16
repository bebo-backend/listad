
import withSession from '../../../../lib/session'
import Post,{UserData} from "../../../../models/model"
import dbConnect from "../../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {email,page,sort,limit } = req.query



const getSort = (sort)=>{


switch(String(sort)){

 case "A - Z":{

   return {title:1,name:1}
   break;
 }

 case "Z - A":{

   return {title:-1,name:-1}

   break;
 }

 case "Latest":{

    return {date:-1}
   

   break;
 }

 case "Most Viewed":{

    return {views:-1,'views.date':-1}
      break;
 }
 case "First Modified":{

    return {date:1}
      break;
 }

 default :{

  return {date:-1}
   break;
 }
}


   

}


  try {
    // we check that the user exists and store some data in session

     const options = {

  page:page ? page:1,
    limit:limit ? limit:20,
    sort:getSort(sort),
    lean:true,
    populate:'agentuser'
  }


   
    let post
    const user =  await UserData.findOne({email:email})
//console.log('user',user)

    if (user){

        post =  await Post.paginate({agentuser:user},options)
//const allpost = await Post.find({}).populate('agentuser')

console.log('post',post)
//console.log('post',allpost)
    }
   





res.status(200).json(post)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
