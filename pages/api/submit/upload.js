
import withSession from '../../../lib/session'
import Post,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"



const setImages = (images_id=[])=>{

    

      if (images_id.length >0){
          

          let image_data = []

          images_id.forEach(async image=>{

  if(image){

image_data.push({image_id:String(image)})

console.log('images data=> ', image_data)


  }
          })

          return image_data;

      }


}



export const config = {

  api:{  bodyParser:true}
}


export default withSession(async (req, res) => {


  dbConnect()
  
const {title,description,images_id,posting_type,location,
	category,email,extra_data,agent_user,anonymous

} = req.body

console.log('body',req.body);


  try {
    // we check that the user exists and store some data in session
   
    const getUser =  await UserData.findOne({email:agent_user})

    //const proper =  await Post.find({})

    console.log('user ',getUser);
    
    let createProperty

    if(getUser){



      
createProperty = await Post.create({
        title:title,
        posting_type,
        description,
        location,
        category,
anonymous,
        agentuser:getUser._id,
        images:setImages(images_id),
        extra_data
        
    }, (err,data)=>{

     

        if (err){
          console.log("error-",err);
      
        } else {
      
          console.log("saved");
        }
      
      
      
      
      }
)



res.status(200).json({success:true,message:createProperty})

   


    }

    

 
  

  } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})
