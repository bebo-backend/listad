// import dbConnect from '../../utils/connectDb'
// import Car from "../../models/car"
/*
const Server = require("socket.io")
const fs = require('fs')
const path = require('path')

import {UserData,MessageModel} from "../../models/model"
import dbConnect from "../../utils/connectDb"




const sockets = {}
let userdata=""
  
dbConnect()


var count = 0

const ioHandler = async (req,res)=>{



if(!res.socket.server.io){

    console.log("first time socket used, starting socket.io")

    const io = Server(res.socket.server)

    var group = io.of('/group-home') 


    group.on("connection", socket=>{



 
socket.join("cite.notification")


        Object.values(sockets).map(user=>{

           socket.broadcast.emit("user.add",{username:user.username,id:user.id})

        })


socket.on("connect",()=>{

sockets[String(userdata.username)] = socket

console.log('connected socketid ',socket.id)


})

       socket.on("user.create",async username=>{


socket.username =username

sockets[String(username)] = socket

const toUser = await UserData.findOne({username:username})



const getHoldMessage = await MessageModel.find({to:toUser}).populate('to','from')

socket.emit("message.hold",getHoldMessage)

console.log('getholdmessage',getHoldMessage)

if (getHoldMessage){

Object.values(getHoldMessage).forEach( async e=>{

const deleteMessage = await MessageModel.deleteOne({_id:e._id})

})


}


console.log('create socketid ',socket.id, username)


             })





socket.on("user.delete",async username=>{


delete sockets[String(username)] 

// socket.broadcast.emit("user.offline",{username})


})

     

socket.on("disconnect", async ()=>{

            const sock = Object.values(sockets).filter(data=>data.id == socket.id)
           const username = sock[0].username

 delete sockets[String(username)] 

        })




socket.on("message.send",async data=>{
        console.log('receive text message',data)

if (sockets[String(data.to)]){

console.log("user is online")

sockets[String(data.to)].emit("message.receive",{type:'receive',text:data.text,from:data.from})


} else {


const toUser = await UserData.findOne({username:data.to})
const fromUser = await UserData.findOne({username:data.from})


const createHoldMessage = await MessageModel.create({to:toUser,type:'receive',text:data.text,from:fromUser})
console.log("user is offline",'createHoldMessage')


}

  

})
























 



socket.on("message.typing.start", async data=>{

    const {from,to,text} = data


    // console.log('message socket id ',socket.id,from)
    // console.log('user-msg socket id ',sockets[String(to)].id, to)

sockets[String(to)].emit("message.receive.typing",from)

      

})








socket.on("message.typing.stop", async data=>{

    const {from,to,text} = data


    // console.log('typing stop')

sockets[String(to)].emit("message.receive.cancel",from)

      

})


socket.on("message.new.text",async data=>{
        console.log('receive text message')


// if (sockets[String(username)]){

//const createHoldMessage = await HoldMessage.create({username:username})
//}


    const {from,to,text} = data

const getTo = await UserData.findOne({username:String(to)})

const getFrom = await UserData.findOne({username:String(from)})

if (getTo && getFrom){


const createMessage= await MessageModel.create({

    from:getFrom._id,to:getTo._id,text:text, type:'text',from_image:getFrom.image ? getFrom.image:""})


if (createMessage){

    // console.log('sending chat message')

sockets[String(to)].emit("message.receive.text",createMessage)

socket.emit("message.receive.text",createMessage)


}
}




// sockets[String(to)].emit("message.notification",createMessage)


// sockets[String(to)].emit("message.receive.text",createMessage)

    

})


socket.on('message.read', async data=>{


            const {from,_id} = data
            // console.log('message_id',_id)


const from_username = await UserData.findOne({_id:from})


            console.log("message.reply.done")


let getMessage = await MessageModel.findOne({_id:_id,status:'unread'})

if (getMessage){

let updateMessage = await MessageModel.findOneAndUpdate({_id:_id},{status:'read'})



if (from_username && sockets[from_username.username]){


sockets[String(from_username.username)].emit("message.reply.done",updateMessage._id)

socket.emit("message.reply.done",updateMessage._id)

// console.log('reply_id',_id)


}

}









})







   socket.on("user.hug",id=>{


sockets[id].emit("user.hugged",{username:sockets[socket.id].username,id:socket.id})

        })  












   socket.on("room.join",room=>{

socket.join(String(room))
socket.emit("room.joined",room)

const rooms = [...socket.rooms]
socket.emit("room.list",rooms)

console.log(rooms)


        })












 socket.on("room.leave",room=>{

socket.leave(String(room))

socket.emit("room.leave",room)
const rooms = [...socket.rooms]
socket.emit("room.list",rooms)

console.log(rooms)



        })






//   setInterval(()=>{

// socket.emit("seconds.update",
//     {time:new Date()})
//         },1000)


// var i=0

//    setInterval(()=>{
// group.to(String(3)).emit("notify",
//     "Welcome to group 3 - "+i);
// i++
//         },3000)




 


socket.on("message.group.send",sendData=>{

        group.emit("message.receive",sendData)    
         })








         socket.on("set_name",name=>{

            const returnSocket = {id:socket.id,
                name }

            sockets[name] = {...returnSocket,socket}
     

            socket.emit("name_set",returnSocket)
         })













    })

    res.socket.server.io = io

} else {
    console.log("socket already running")
}

res.end()

}


export const config= {
    api:{
        bodyParser:false
    }
}

export default ioHandler


*/
