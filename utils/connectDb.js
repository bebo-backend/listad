/* This is a database connection function*/
import mongoose from 'mongoose'



const connection = {} /* creating connection object*/


async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return 
  }

  /* connecting to our database */


//mongodb+srv://shadrach:<password>@cluster0.s0lbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


  
//  const db = await mongoose.connect("mongodb://127.0.0.1:27017/", {
 const db = await mongoose.connect("mongodb+srv://shadrach:Shadrach16.com@cluster0.cofkx.mongodb.net/listad_db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(()=> {
    

    connection.isConnected = true


   },err=>console.log('error connecting'))

  

 return connection
}

export default dbConnect
