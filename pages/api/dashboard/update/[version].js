
import withSession from '../../../../lib/session'
import {About} from "../../../../models/model"
import dbConnect from "../../../../utils/connectDb"


export default withSession(async (req, res) => {


  dbConnect()


 const {version} = req.query

let about

  try {
    // we check that the user exists and store some data in session
   

     about =  await About.find({}).sort('date:-1').limit(1)

if (about.length <= 0){

about = await About.create({})
about = [about]

}

//console.log(about)
res.status(200).json(about)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
