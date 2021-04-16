
// const socket = io('/group-home')

import React, {useState,useEffect} from 'react'
import {CLOUDINARY_URL} from "./contrib/config"
import {useSelector,useDispatch} from 'react-redux'
import useSWR,{ mutate }  from 'swr'
import axios from 'axios'
import io from 'socket.io-client';

import useUser from '../lib/useUser'

// import {updateFriendStatus} from '../actions/friends'



let socket = {on:f=>f,emit:f=>f}

let newData = []

const More = ()=>{
  
	const dispatch = useDispatch()


  const screenData = useSelector(state=>state.screen)

  const {screen} = screenData
  
  socket = screenData.socket ? screenData.socket :socket

  const {user} = useUser()

const username = user?.username

const {data,mutate:mutateNotifications} = useSWR(()=>'/api/getnotifications/'+username,axios)




   socket.on('notification.new',()=>{
// console.log(data)

 		mutateNotifications()
 	
 	})
   
   socket.on('notification.read',()=>{

 		mutateNotifications()
 		
 	}) 
   

// socket.on("notify.friend.done",message=>{

// if (message){
// mutateNotifications()



// }

// })


if (!data){

	return (


        <div class="dropdown btn btn-link m-0 p-0">
           
           <a class="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown" >
         <i class="dw dw-notification-1 cursor-pointer text-dark font-weight-bold " 
           ></i> <span class="badge badge-pill badge-light  p-1 text-danger" style={{position:'absolute',top:'-12px'}}>0</span>
         <br />
          <a className="text-center mx-0 text-white font-14  "> Notification  </a>
          </a>

    	<div class="dropdown-menu dropdown-menu-right">
						<div class="notification-list mx-h-350 customscroll w-100">
							<ul className="p-2" style={{minWidth: '400px'}} >
								
								<p className="font-weight-bold mx-2 mt-2 mb-0">Unread Notifications </p>
								<hr/>
							
								<li>
									<p className="text-muted text-center"> No notifications</p>
								</li>
							
							</ul>
						</div>
					</div>
                      

        </div>

     


	)

}


newData = data && data.data ? data.data:[]

return (


        <div class="dropdown btn btn-link m-0 p-0">
           
           <a class="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown" >
         <i class="dw dw-notification-1 cursor-pointer text-white font-weight-bold " 
           ></i>
             <span class="badge badge-pill badge-light  p-1 text-danger"
            style={{position:'absolute',top:'-10px'}}>{data && data.data.length} {data && data.data.length >= 25 && "+"}</span>
         <br />
          <a className="text-center mx-0 text-white font-14 "> Notification  </a>
          </a>

    	<div class="dropdown-menu dropdown-menu-right">
						<div class="notification-list  w-100 pt-2"   >
							<p className="font-weight-bold m-2 mt-2 mb-0">Unread Notifications - {data && data.data.length} </p>
								<hr/>
							<ul className="p-2 mx-h-450 " style={{minWidth: '410px',overflowY:'scroll',overflowX:'hidden'}} >
								
							
							
							{newData.map((data,index)=> <Notify notify={data} /> )}	
							
							</ul>

							<a className="text-center btn btn-link w-100 text-primary py-2">
Sell all
							</a>
						</div>
					</div>
                      

        </div>

	)

}




export default More



const Notify = ({notify={}}) =>{

const {user} =  useUser()
const username = user?.username
const from= notify.from

const {data:userData,mutate:mutateUser} = useSWR(()=>'/api/getuserdata/'+from,axios) 




if (!userData){

   	return <li> {notify.from} </li>
   }

    const data = userData.data

   const getDate =(date)=>{

let dt = String(date).split("T")[0]
let tm = String(date).split("T")[1].replace("Z","")

return dt + " @ "+tm

   }

   const accept= (e)=>{
   	e.preventDefault()

socket.emit('user.add',{username:data.username,where:'friends',notification_id:notify._id,me:username})
   	
   }

const decline= (e)=>{
   	e.preventDefault()


socket.emit('friend.decline',{from,
	to:notify.to,
	notification_id:notify._id})


   }


  const read= (e)=>{
   	e.preventDefault()


socket.emit('notification.read',{notification_id:notify._id})


   }


   
 
 const  getText = ()=>{


switch(notify.type){

case "friends":{

return <div className="row p-0">  
<p className="text-info col-9"  > 
	
<span className="text-muted font-12 pb-0">On {getDate(notify.date)}</span><br />
You have a friend request from <span className="font-weight-bold" style={{color:'black'}} > {data.username}. </span>
</p>

<p className="text-center col-3 py-0 my-0">

<button className=" btn-primary btn mb-1 font-14" onClick={accept} >Accept </button>
<button className=" btn-secondary btn font-14" onClick={decline}>Decline </button>

</p>

  </div>
	break;
}


case "friend.accept":{

return <div className="row p-0">  
<p className="text-info col-10"  > 
	
<span className="text-muted font-12 pb-0">On {getDate(notify.date)}</span><br />
Friend request send to <span className="font-weight-bold font-14" style={{color:'black'}} > {data.username} </span>
was accepted.
</p>

<p className="btn btn-link col-2 font-14"  onClick={read}  > 
Read
</p>

  </div>
	break;
}

case "friend.decline":{

return <div className="row p-0">  
<p className="text-info col-10"  > 
	
<span className="text-muted font-12 pb-0">On {getDate(notify.date)}</span><br />
Friend request send to <span className="font-weight-bold  font-14" style={{color:'black'}} > {data.username} </span>
was decline.
</p>
<p className="btn btn-link col-2 font-14"  onClick={read}  > 
Read
</p>
  </div>
	break;
}

default:{

return "You have an unindentified notification"
	break;
}


}


 }


return (

	data    &&  <li className="m-2 p-0">
									<span >
									{getText()}


									</span>
								</li>

								)



}