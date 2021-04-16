/* This is a database connection function*/
import mongoose from 'mongoose'



const connection = {} /* creating connection object*/


async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return 
  }

  /* connecting to our database */

  
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(()=> {
    

    connection.isConnected = true


   },err=>console.log('error connecting'))

  

 return connection
}

export default dbConnect
