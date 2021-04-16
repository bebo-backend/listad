
import withSession from '../../../lib/session'
import {UserData} from "../../../models/model"
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


 const {username,images_id } = req.body
 // console.log(images_id)


  try {
    // we check that the user exists and store some data in session
   
 
    

    const update =  await UserData.findOne({username:username})

if (update){
  // const prev_images = update.images ? update.images :[]

  update.image = images_id


  await update.save()

  // console.log(update)


  res.status(200).json({success:true,ok:true})

    } else {
        res.status(200).json({success:false})
    }


   


    } catch (error) {
 
    res.status(200).json({success:false,error:error.message})
  }
})
