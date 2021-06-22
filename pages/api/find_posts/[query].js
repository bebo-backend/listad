
import withSession from '../../../lib/session'
import Post,{UserData} from "../../../models/model"
import dbConnect from "../../../utils/connectDb"
import {sortBy, reverse} from 'lodash'
import { enGB } from 'date-fns/locale'


export default withSession(async (req, res) => {


  dbConnect()


  try {
    // we check that the user exists and store some data in session
  let posts

    const limit = 10

  let {query,page,email,watchLink,sort,search,searchfilter} =  req.query


console.log('searchquery', req.query)

// location = "Nigeria,Lagos,Badagry West"
let city,state,country





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

 case "Most viewed":{

    return {views:-1,'views.date':-1}
      break;
 }
 case "First modified":{

    return {date:1}
      break;
 }

 default :{

  return {date:-1}
   break;
 }
}


   

}

const getField = (field="All Categories")=>{

  switch (String(field).toLowerCase()){

case "description":{

  return ['description']
  break;
}

case "price":{

  return ['price']
  break;
}

case "City or Street":{

  return ['location']
  break;
}


case "posting_type":{

  return ['posting_type']
  break;
}

case "category":{

  return ['category']
  break;
}



case "title":{

 return ['title','extra_data']
  break;
}





case "All Categories":{

  return ['title','extra_data',]
  break;
}

default :{

return ['title','extra_data','category']

break;

}



  }
}





const setFilterToArray = (searchfilter,searchvalue)=>{

const splitFilter = searchfilter.split("..")

let returnData = []

splitFilter.filter(e=>e).forEach(myfilter=>{


let filKey = myfilter.split("__")[0],filData = myfilter.split("__")[1]

filData = filData



if (filKey === "price" ){

const splitData = [filData],filDataJoin = []


console.log('fildata',splitData)
splitData.forEach(e=> {

  switch(String(filData)){

 case "Any price":{
  filDataJoin.push({[filKey]:{$gt:0}})
   break;
 }

 case "Under ₦30,000":{
    filDataJoin.push({[filKey]:{$lt:30000}})
   break;
 }

 case "₦30,000 to ₦100,000":{  
    filDataJoin.push({[filKey]:{$lt:100000,$gt:30000}})
   break;
 }

 case "Over ₦100,000":{
    filDataJoin.push({[filKey]:{$gt:100000}})
      break;
 }

 default :{
  filDataJoin.push({[filKey]:{$gt:0}})
   break;
 }
}

})

console.log("splitData -- ",filDataJoin)
returnData.push({$or:filDataJoin})




} else if(filKey === "category"||filKey === "posting_type" ){

const splitData = [filData.replace("@","/")],filDataJoin = []

splitData.forEach(e=> filDataJoin.push({[filKey]:{$in:e}}))
console.log("splitData -- ",filDataJoin)
returnData.push({$or:filDataJoin})

} else if (filKey === "City or Street" ){


city = filData.replace(" ","").split(",")[2].replace(" ","")
state = filData.replace(" ","").split(",")[1].replace(" ","")
country = filData.replace(" ","").split(",")[0]




const splitData = [filData],filDataJoin = []

splitData.forEach(e=> filDataJoin.push({['location']:{$in:e}}))
console.log("splitData -- ",filDataJoin)
returnData.push({$or:filDataJoin})



} else {


const splitData = [filData],filDataJoin = []

splitData.forEach(e=> filDataJoin.push({[filKey]:{$in:e}}))
console.log("splitData -- ",filDataJoin)
returnData.push({$or:filDataJoin})

}


})

console.log("returnFilter -- ",returnData)

return returnData.length >0 ? returnData:null


}








  const allOptions = {
    page:page ? page:1,
    limit:limit,
    sort:getSort(sort),
    lean:true,
    select:"title posting_type description agentuser images category location views date anonymous replies",
    populate:"agentuser"
  }



  const options = {
    page:page ? page:1,
    limit:limit,
    sort:getSort(sort),
    lean:true,
    search:{
      value:search,
      fields: getField(searchfilter)
    },
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
 select:"title posting_type description agentuser images category location views date anonymous replies",
    populate:"agentuser"
  }




  function getDate(){

let c = new Date()

  return [c.getFullYear(),c.getMonth(),0]

}




    if (!searchfilter && search) {

const typeValue = query.split("&&")[1]
if (typeValue != "All"){
posts =  await Post.paginate({posting_type:typeValue},searchOptions)
} else {
    posts =  await Post.paginate({},searchOptions)
}


    } else     if (!searchfilter && !search) {

const typeValue = query.split("&&")[1]
if (typeValue != "All"){
posts =  await Post.paginate({posting_type:typeValue},allOptions)
} else {
    posts =  await Post.paginate({},allOptions)
}




}  else {

const transformData = setFilterToArray(searchfilter,search)

if (transformData){
  posts =  await Post.paginate({$and:transformData},search ? options:allOptions)
} else {

  posts =  await Post.paginate({},options)
}



    }




// console.log(posts)


res.status(200).json(posts)

   


    } catch (error) {
 console.log(error)
    res.status(200).json({success:false,error:error.message})
  }
})
