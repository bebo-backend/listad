
import withSession from '../../../lib/session'
import {UserData,About} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"


// const logUser = async (err,user)=>{

//   if (user){

//     const {fullname, image,username} = user_data

//     const user = { isLoggedIn: true, fullname,username,image:image ? image :null}
  
//     req.session.set('user', user)

//     await req.session.save()




//     res.status(200).json({message:"user logged in"})
//   } else {

//     res.status(200).json({error:"You have no account"})
//   }

// }


export default withSession(async (req, res) => {
  dbConnect()


  const { email,password } = req.body




  try {
    // we check that the user exists on GitHub and store some data in session

  // const Users =  await UserData.find({})
  //console.log('there is user: '+Users)


   const getUser =  await UserData.findOne({email:email,password:password})
const about =  await About.find({}).sort('date:-1').limit(1)


   if (getUser){
  //console.log('there is user: '+getUser)

const version =  about ? about[0].version:'1.0.0'


    const {fullname, image,email} = getUser
    
        const user = { isLoggedIn: true, fullname,email,image:image ? image :null,version}

       // console.log(user)
      
        req.session.set('user', user)
    
      await req.session.save()
     
    
    
        res.status(200).json({success:true,message:"user logged in",version})
        

   }   else {
    
    res.status(200).json({error:"Your username or password do not match "})
  }



 

  } catch (error) {
    const { response: fetchResponse } = error
    console.log(error)
    res.status(fetchResponse?.status || 500).json(error)
  }
})
