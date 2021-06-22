
/*
import withSession from '../../../lib/session'
import Post,{UserData,Group} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"
import {sortBy, reverse} from 'lodash'
import { enGB } from 'date-fns/locale'


export default withSession(async (req, res) => {


  dbConnect()


  
    // we check that the user exists and store some data in session
  let posts



  let {query,page,email,sort} =  req.query


console.log('search_filter', req.query)








const getSort = (sort)=>{


switch(String(sort)){

 case "A - Z":{

   return {title:-1,name:-1}
   break;
 }

 case "Z - A":{

   return {title:1,name:-1}

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



  const allOptions = {
    sort:getSort(sort),
    lean:true,
    limit:50,
    populate:"creator"
  }

  const trendingOptions = {
    page:page ? page:1,
    sort:{'views':-1,'views.date':-1},
    lean:true,
    select:"title posting_type description agentuser images category location views date",
    populate:"agentuser"
  }


  const options = {
    page:page ? page:1,
    sort:getSort(sort),
    lean:true,
    search:{
      value:'',
      fields: ["location"]
    },
 select:"title posting_type description agentuser images category location views date",
    populate:"agentuser"
  } 




  function getDate(){

let c = new Date()

  return [c.getFullYear(),c.getMonth(),0]

}







try{



const getUser =  await UserData.findOne({email:'Gkshj'},"_id")


posts =  await Group.paginate({creator:getUser._id},allOptions)


console.log(posts)


res.status(200).json(posts)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})

*/