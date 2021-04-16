
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


 const {username,hobbies,location,
  marriage,employments,interests,street,...form } = req.body

console.log(hobbies)
  try {
    // we check that the user exists and store some data in session
   
 
    

    const update =  await UserData.findOneAndUpdate({username:username}, form, data=>{

        
    })

 
   

    if (update){

    if (hobbies)    update.hobbies = hobbies;
    if (marriage)    update.marriage = marriage;
     if (employments)   update.employments = employments;
     if (interest)   update.interest = interests;
      

      if (location) update.location = {state:location.split(" - ")[0],city:location.split(" - ")[1]}
      if (street) update.street = street

      
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
