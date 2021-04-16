


exports.initialize = function(server){



const io = require("socket.io")(server);





	io.sockets.on("disconnection",socket=>{
console.log("socket server stop on port: "+server)
	

	})


	io.sockets.on("connection",socket=>{

		const data = JSON.stringify({
			type:"myMessage",
			message:"Welcome to yadu chat"
		});
console.log("socket server started on port: "+server)

		socket.send(data)



socket.on("message",message=>{

var msgData = JSON.parse(message)

console.log(msgData)

if(msgData.type === "userMessage"){

socket.broadcast.send(JSON.stringify(msgData));
	msgData.type = "myMessage"
	socket.send(JSON.stringify(msgData))

}

	})


socket.on("connect",()=>{

console.log("socket connected to user")

	})







	})






}