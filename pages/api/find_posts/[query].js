
import withSession from '../../../lib/session'
import Post,{UserData,Group} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"
import {sortBy, reverse} from 'lodash'
import { enGB } from 'date-fns/locale'


export default withSession(async (req, res) => {


  dbConnect()


  try {
    // we check that the user exists and store some data in session
  let posts

    const limit = 10

  let {query,page,location,email,watchLink,sort,search} =  req.query


console.log('search_filter', req.query)

// location = "Nigeria,Lagos,Badagry West"
let city,state,country

if (location){
city = location.replace(" ","").split(",")[2].replace(" ","")
state = location.replace(" ","").split(",")[1].replace(" ","")
country = location.replace(" ","").split(",")[0]

}





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




  const allOptions = {
    page:page ? page:1,
    limit:limit,
    sort:getSort(sort),
    lean:true,
    select:"title posting_type description agentuser images category location views date",
    populate:"agentuser"
  }

  const forumOptions = {
    page:page ? page:1,
    limit:60,
    sort:getSort(sort),
    lean:true,
    populate:"creator"
  }


  const options = {
    page:page ? page:1,
    limit:limit,
    sort:getSort(sort),
    lean:true,
    search:{
      value:city.toLowerCase().indexOf("all") >= 0 ?state.toLowerCase() =="all" ? "nigeria":state.toLowerCase().replace("state","") :city.toLowerCase(),
      fields: ["location"]
    },
 select:"title posting_type description agentuser images category location views date",
    populate:"agentuser"
  } 


 const watchOptions = {
    page:page ? page:1,
    limit:12,
    sort:getSort(sort),
    lean:true,
    search:{
      value: watchLink,
      fields: ["title",'posting_type','description']
    },
 select:"title posting_type description agentuser images category location views date",
    populate:"agentuser"
  } 


const searchOptions = {
    page:page ? page:1,
    limit:10,
    sort:getSort(sort),
    lean:true,
    search:{
      value: search,
      fields: ["title",'posting_type','description','category','location']
    },
 select:"title posting_type description agentuser images category location views date",
    populate:"agentuser"
  }

  const searchForumOptions = {
    page:page ? page:1,
    limit:12,
    sort:getSort(sort),
    lean:true,
    search:{
      value: search,
      fields: ["title",'name','creator.username','creator.fullname']
    },

    populate:"creator"
  }


  function getDate(){

let c = new Date()

  return [c.getFullYear(),c.getMonth(),0]

}

if (search){


if (query.toLowerCase().split("&&")[0] == "discover"){


switch(query.toLowerCase().split("&&")[1]){

case "forum":{

posts =  await Group.paginate({}, searchForumOptions)
console.log('forum search',posts)


break;
}


case "watchlist":{


posts =  await Post.paginate({}, searchOptions)




break;
} 



default:{

console.log('Search')
break;
}

}


}  else {

posts =  await Post.paginate({}, searchOptions)

}



}

else {


if (query.toLowerCase().split("&&")[0] == "discover"){


switch(query.toLowerCase().split("&&")[1]){

case "forum":{


posts =  await Group.paginate({}, forumOptions)

// posts = await Post.aggregate([{
//   $match:
//     {"date": {$gte: new Date(getDate()[0],getDate()[1],getDate()[2]) }}
// },
// {$sort:{'views.date':-1}}]).limit(12)

break;
}


case "watchlist":{

const getUser =  await UserData.findOne({email:email},"_id")


posts =  await Post.paginate({}, watchOptions)


console.log('watchlist')


break;
} 


case "saved":{


break;
} 


default:{

console.log('Discover saved')
break;
}

}


}  else {



if (query.split("&&")[1] == "All"){

posts =  await Post.paginate({},location && state.toLowerCase != 'all'? options: allOptions)

} else {

posts =  await Post.paginate({posting_type:query.split("&&")[1]},location && state.toLowerCase != 'all' ? options: allOptions)

}

}


}





// console.log(posts)


res.status(200).json(posts)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
