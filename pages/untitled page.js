import React, {useState,useEffect} from 'react'

import Link from 'next/link';

import {useRouter} from 'next/router'

import {NextSeo} from 'next-seo'

import io from 'socket.io-client';

const socket = io('/group-home')


 const main = () => {

 	const router = useRouter()

const [sendData,setSendData] = useState({})
const [roomMsg,setRoomMsg] = useState()
const [hugged,setHugged] = useState([])
const [roomList,setRoomList] = useState([])
const [joinedRoom,setJoinedRoom] = useState(0)
const [messages,setMessages] = useState([])
const [date,setDate] = useState(new Date())
const [newUser,setNewUser] = useState([])
const [leftUser,setLeftUser] = useState()

useEffect(()=>{

	fetch("/api").finally(()=>{


socket.on('seconds.update', data=> {

const time = new Date(data.time)

setDate(time)

})

socket.on('notify', data=> {
	// console.log(data)
setRoomMsg(data)

})


socket.on('user.add', data=> {

const newData= [...newUser,data]

setNewUser(newData)

})


socket.on('user.hugged', data=> {

const newData= [...hugged,data]

setHugged(newData)

})


socket.on('room.joined', data=> {


setJoinedRoom(data)

})

socket.on('room.leave', data=> {
if (roomList.length <=1){
const newroom = roomList.filter(v=>data!==v)

setRoomList(newroom)

}

setJoinedRoom(0)


})


socket.on('room.list', data=> {

const newData = data.splice(1)

console.log(newData)

if (newData.length > 0){
setRoomList(newData)

}

})



socket.on('user.remove', data=> {
setLeftUser(data)

})




socket.on('message.receive', data=> {

	const newData= [...messages,data]

setMessages(newData)

})

socket.on("connect_error",()=>{
	console.log("Check your network connection")
})



	})



},[messages,newUser,roomList])



const addMe = e =>{
e.preventDefault();

socket.emit('user.create',sendData.username)


}


const joinRoom = room =>{

socket.emit('room.join',room)


}

const leaveRoom = room =>{

socket.emit('room.leave',room)


}


const hugMe = id =>{

socket.emit('user.hug',id)


}

const onClick = (e)=>{
e.preventDefault()
socket.emit('message.send',sendData)

}


const onChange = (e)=>{


const val = e.target.value


setSendData({...sendData,
	[e.target.name]:val
})


}


    return (  

<>


<NextSeo title={"Welcome to chitchat  - The best dating website in nigeria"} titleTemplate='%s | yadu'
description="Find dates, friends around you" />

<main id="main bg-secondary " className="main p-4 bg-white" >
<h2 className="text-center my-4">  {date.getDay()} : {date.getMonth()} : {date.getYear()} : {date.getHours()} . {date.getMinutes()} . {date.getSeconds()}  </h2>

<h2 className="text-primary"> Welcome to Yadu chat </h2>
Users <button className="btn btn-secondary" onClick={addMe}> Add me </button>
<hr/>

<ul>
{newUser.length > 0 && 
	
	newUser.map((k,key)=>(

	<li key={key} className="my-2" >
<span className="font-weight-bold mx-2">{k.username}</span> <span> {k.id} </span>
<span className="mx-2 btn btn-info" onClick={e=>hugMe(k.id)}> Hug </span>
<hr/>
	</li>))


	 }

	 </ul>


	 <ul>
	 Hugged messages
{hugged.length > 0 && 
	
	hugged.map((k,key)=>(

	<li key={key} className="my-2" >
<span className="font-weight-bold mx-2 text-info"> You have been hugged by {k.username} with id: {k.id} </span>

<hr/>
	</li>))


	 }

	 </ul>



{leftUser && <p className="text-danger">User:{leftUser} just Left </p> }






<input className="form-control title w-50 my-4" onChange={onChange} 
style={{height:'45px'}} type="text" name="username" placeholder="Enter username" />

	<textarea onChange={onChange} name="message" class="form-control my-4 p-4" rows={8} placeholder="Write message ..." ></textarea>

<input type="submit" className="btn btn-primary" value="Send Message" onClick={onClick} />
					

<ul>
{messages.map((k,key)=>(

	<li key={key} className="my-2" >
<span className="font-weight-bold">{k.username}</span> <br />
<span> {k.message} </span>
<hr/>
	</li>))}

</ul>


{roomMsg && <p className="text-success my-3"> {roomMsg}</p> }



<ul className="my-4">
{['1','2','3','4'].map((k,key)=>(

	<li key={key} className="my-2" >
<span className="font-weight-bold">Room {k}</span>
{roomList.filter(v=>String(k)===v).length <= 0&& <span className="btn btn-link" onClick={e=>joinRoom(k)}> Join </span> }
{roomList.filter(v=>String(k)===v).length > 0 && <span className="btn btn-link" onClick={e=>leaveRoom(k)}> | Leave </span> }
<hr/>
	</li>))}

</ul>


{joinedRoom > 0 && <p className="text-success"> You've joined room {joinedRoom}</p> }


<ul>
<p className="font-weight-bold"> Room you've joined </p>
{roomList.map((k,key)=>(

	<li key={key} className="my-2" >
Room {k}
<hr/>
	</li>))}

</ul>



    </main>

</>

);
}

export default main;

