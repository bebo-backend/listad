// import dbConnect from '../../utils/connectDb'
// import Car from "../../models/car"

const Server = require("socket.io")
const fs = require('fs')
const path = require('path')

const sockets = {}


var count = 0

const ioHandler = async (req,res)=>{

if(!res.socket.server.io){

    console.log("first time socket used, starting socket.io")

    const io = Server(res.socket.server)

    var group = io.of('/group-home') 

    
    group.on("connection", socket=>{

socket.join(String(6))




        Object.values(sockets).map(user=>{

           socket.broadcast.emit("user.add",{username:user.username,id:user.id})

        })

       

        socket.on("disconnect",()=>{

delete sockets[socket.id]

            group.emit("user.remove",socket.id)

        })


        socket.on("user.create",username=>{

socket.username =username

sockets[socket.id] = socket

socket.broadcast.emit("user.add",{username:socket.username,id:socket.id})

     


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






  setInterval(()=>{

socket.emit("seconds.update",
    {time:new Date()})
        },1000)


var i=0

   setInterval(()=>{
group.to(String(3)).emit("notify",
    "Welcome to group 3 - "+i);
i++
        },3000)




 


socket.on("message.send",sendData=>{

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


president little secret